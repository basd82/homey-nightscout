'use strict';
const Homey = require('homey');
class NightscoutApp extends Homey.App {
  async onInit() {
    this.log('Nightscout Monitor initialized');
  }
}
module.exports = NightscoutApp;
