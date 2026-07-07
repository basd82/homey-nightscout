'use strict';
const Homey = require('homey');
const NightscoutClient = require('../../lib/nightscout');

class NightscoutDevice extends Homey.Device {
  async onInit() {
    const wantedCapabilities = [
      'measure_glucose',
      'glucose_trend',
      'glucose_delta',
      'reservoir',
      'pump_battery',
      'cgm_battery',
      'loop_status'
    ];

    for (const capability of wantedCapabilities) {
      if (!this.hasCapability(capability)) {
        await this.addCapability(capability);
      }
    }

    const removeCapabilities = [
      'insulin_on_board',
      'carbs_on_board',
      'reservoir_percent',
      'alarm_generic'
    ];

    for (const capability of removeCapabilities) {
      if (this.hasCapability(capability)) {
        await this.removeCapability(capability);
      }
    }

    await this.refresh();

    const seconds = Math.max(
      30,
      Number(this.getSetting('refresh_interval') || 60)
    );

    this.timer = this.homey.setInterval(
      () => this.refresh().catch(err => this.error(err)),
      seconds * 1000
    );
  }

  async onDeleted() {
    if (this.timer) this.homey.clearInterval(this.timer);
  }

  async onSettings() {
    if (this.timer) this.homey.clearInterval(this.timer);

    const seconds = Math.max(
      30,
      Number(this.getSetting('refresh_interval') || 60)
    );

    this.timer = this.homey.setInterval(
      () => this.refresh().catch(err => this.error(err)),
      seconds * 1000
    );

    await this.refresh();
  }

  formatTrend(direction) {
    const map = {
      DoubleUp: '↑↑ Dubbel omhoog',
      SingleUp: '↑ Omhoog',
      FortyFiveUp: '↗ Stijgend',
      Flat: '→ Stabiel',
      FortyFiveDown: '↘ Dalend',
      SingleDown: '↓ Omlaag',
      DoubleDown: '↓↓ Dubbel omlaag',
      'NOT COMPUTABLE': '? Onbekend',
      'RATE OUT OF RANGE': '! Buiten bereik'
    };

    return map[direction] || String(direction || 'Onbekend');
  }

  async refresh() {
    const client = new NightscoutClient(
      this.getStoreValue('nightscout_url'),
      this.getStoreValue('credential')
    );

    try {
      const d = await client.read();

      const mmol = this.getSetting('unit') !== 'mgdl';
      const glucose = mmol
        ? Math.round((d.sgv / 18.0182) * 10) / 10
        : d.sgv;

      const delta = d.delta == null
        ? null
        : (mmol ? Math.round((d.delta / 18.0182) * 10) / 10 : d.delta);

      if (Number.isFinite(glucose)) {
        await this.setCapabilityValue('measure_glucose', glucose);
      }

      if (d.direction) {
        await this.setCapabilityValue('glucose_trend', this.formatTrend(d.direction));
      }

      if (delta != null && Number.isFinite(delta)) {
        await this.setCapabilityValue('glucose_delta', delta);
      }

      if (d.reservoir != null) {
        await this.setCapabilityValue('reservoir', Number(d.reservoir));
      }

      if (d.pumpBattery != null) {
        await this.setCapabilityValue('pump_battery', Number(d.pumpBattery));
      }

      if (d.cgmBattery != null) {
        await this.setCapabilityValue('cgm_battery', Number(d.cgmBattery));
      }

      await this.setCapabilityValue('loop_status', String(d.loopStatus || 'Unknown'));
      await this.setAvailable();
    } catch (err) {
      await this.setUnavailable(`Nightscout fout: ${err.message}`);
      throw err;
    }
  }
}

module.exports = NightscoutDevice;
