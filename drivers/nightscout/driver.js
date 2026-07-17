'use strict';
const Homey = require('homey');
const NightscoutClient = require('../../lib/nightscout');
// const url = this.getSetting('nightscout_url') || 'nightscout.dikkenberg.net';
// const credential = this.getSetting('credential') || 'zuster-b7d78a98f3141c55';
class NightscoutDriver extends Homey.Driver {
  async onPair(session) {
    let credentials = null;

    session.setHandler('credentials', async data => {
      const client = new NightscoutClient(data.url, data.credential);
      await client.test();
      credentials = data;
      return true;
    });

    session.setHandler('list_devices', async () => {
      if (!credentials) throw new Error(this.homey.__('errors.enter_settings_first'));

      return [{
        name: 'Nightscout',
        data: { id: 'nightscout-monitor' },
        settings: {
          unit: credentials.unit || 'mmol',
          refresh_interval: 60,
          max_reservoir: 300
        },
        store: {
          nightscout_url: credentials.url,
          credential: credentials.credential || ''
        }
      }];
    });
  }
}

module.exports = NightscoutDriver;