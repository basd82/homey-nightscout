Nightscout Monitor

Monitor your Nightscout glucose data directly on Homey.

Features:
- Current glucose value
- mmol/L and mg/dL support
- Glucose trend with direction arrows
- Glucose delta
- Insulin pump reservoir level, when available
- Pump battery level, when available
- CGM/uploader battery level, when available
- Loop status, when available
- Values available for use in Homey Flows

Nightscout Monitor uses your own Nightscout instance as its data source. This means your loop application does not need to be directly reachable by Homey.

Example use:
Change the color of a smart light based on your current glucose value, or create Homey Flows for high and low glucose values.

Privacy:
The app does not send glucose data or Nightscout credentials to servers controlled by the developer. The app communicates with the Nightscout URL configured by the user.

Medical disclaimer:
Nightscout Monitor is intended for home automation and informational display only. It is not a medical device and must not be used as the sole source for medical decisions, insulin dosing, treatment decisions or emergency alarms.

Support:
https://github.com/basd82/homey-nightscout/issues

Source code:
https://github.com/basd82/homey-nightscout

Buy me a hot chocolate:
https://paypal.me/BvandenDikkenberg

Copyright (C) 2026 B.F. van den Dikkenberg
Licensed under GPL-3.0-or-later.
