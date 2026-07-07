# Nightscout Monitor for Homey

Nightscout Monitor is a Homey app that displays glucose data from Nightscout on Homey and makes it available for Homey Flows.

The app uses **Nightscout as the only source**. Your loop app, such as Trio, AndroidAPS or Loop, does not need to be directly reachable from your Homey network.

## Features

- Current glucose value
- mmol/L by default, optional mg/dL
- Trend direction with arrows
- Delta since previous reading
- Reservoir value when available in Nightscout
- Pump battery when available in Nightscout
- CGM/uploader battery when available in Nightscout
- Loop status when available in Nightscout
- Flow support for lights, notifications and automations

## Requirements

- Homey Pro
- Working Nightscout site
- Nightscout API access, using API secret or token

## Development install

```bash
npm install
homey app validate
homey app install
```

For temporary testing with live logging:

```bash
homey app run
```

Docker Desktop must be running on your Mac for `homey app run`.

## Privacy

This app does not send your glucose data to external services operated by the developer. It only reads data from your own Nightscout instance and stores settings locally on Homey.

See [`PRIVACY.md`](PRIVACY.md).

## Support

Issues and feature requests:

https://github.com/basd82/homey-nightscout/issues

## Donation

☕ **[Buy me a hot chocolate](https://paypal.me/BvandenDikkenberg)**

If Nightscout Monitor is useful to you, consider treating the developer to a hot chocolate. 😄

## License

Copyright (C) 2026 B.F. van den Dikkenberg

This app is licensed under the GNU General Public License v3.0 or later.

See [`LICENSE`](LICENSE).
