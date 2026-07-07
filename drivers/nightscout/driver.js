'use strict';
const Homey = require('homey');
const NightscoutClient = require('../../lib/nightscout');

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
      if (!credentials) throw new Error('Voer eerst de Nightscout-instellingen in.');

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