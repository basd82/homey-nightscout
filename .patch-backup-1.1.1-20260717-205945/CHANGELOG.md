# Changelog

## 1.0.0

Initial public release.

- Nightscout as single data source
- Glucose value in mmol/L or mg/dL
- Trend direction
- Delta
- Reservoir when available
- Pump battery when available
- CGM/uploader battery when available
- Loop status when available
- Pairing screen with Nightscout connection test
- Homey Flow-compatible capabilities
- GPL-3.0-or-later license

## 1.0.2

- Update for Certification standards


## 1.1.0

- Added Homey Flow condition cards for:
  - Glucose higher than a configured value
  - Glucose lower than a configured value
  - Glucose between two configured values
  - Glucose trend matches a selected direction
  - Reservoir lower than a configured amount
  - Pump battery lower than a configured percentage
  - CGM battery lower than a configured percentage
  - Nightscout is available
- Glucose conditions automatically use the unit configured on the selected device: mmol/L or mg/dL.
- No IOB or COB Flow cards were added.
