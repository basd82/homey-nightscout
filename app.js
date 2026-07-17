'use strict';

const Homey = require('homey');

class NightscoutApp extends Homey.App {
  async onInit() {
    this.registerConditionCards();
    this.log('Nightscout Monitor initialized');
  }

  registerConditionCards() {
    this.registerNumericCondition('glucose_above', 'measure_glucose', (current, value) => current > value);
    this.registerNumericCondition('glucose_below', 'measure_glucose', (current, value) => current < value);
    this.registerNumericCondition('reservoir_below', 'reservoir', (current, value) => current < value);
    this.registerNumericCondition('pump_battery_below', 'pump_battery', (current, value) => current < value);
    this.registerNumericCondition('cgm_battery_below', 'cgm_battery', (current, value) => current < value);

    this.homey.flow
      .getConditionCard('glucose_between')
      .registerRunListener(async ({ device, minimum, maximum }) => {
        const current = this.getNumericCapability(device, 'measure_glucose');
        const min = Number(minimum);
        const max = Number(maximum);

        if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
          return false;
        }

        return current !== null && current >= min && current <= max;
      });

    this.homey.flow
      .getConditionCard('trend_is')
      .registerRunListener(async ({ device, trend }) => {
        if (!device || typeof device.isTrend !== 'function') return false;
        return device.isTrend(trend);
      });

    this.homey.flow
      .getConditionCard('nightscout_available')
      .registerRunListener(async ({ device }) => Boolean(device && device.getAvailable()));
  }

  registerNumericCondition(cardId, capabilityId, comparator) {
    this.homey.flow
      .getConditionCard(cardId)
      .registerRunListener(async ({ device, value }) => {
        const current = this.getNumericCapability(device, capabilityId);
        const threshold = Number(value);

        if (current === null || !Number.isFinite(threshold)) return false;
        return comparator(current, threshold);
      });
  }

  getNumericCapability(device, capabilityId) {
    if (!device || !device.hasCapability(capabilityId)) return null;

    const value = Number(device.getCapabilityValue(capabilityId));
    return Number.isFinite(value) ? value : null;
  }
}

module.exports = NightscoutApp;
