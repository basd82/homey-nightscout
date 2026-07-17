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



## [1.1.0] - 2026-07-17

### Added
- Homey Flow Condition: Glucose is above
- Homey Flow Condition: Glucose is below
- Homey Flow Condition: Glucose is between
- Homey Flow Condition: Trend is
- Homey Flow Condition: Reservoir is below
- Homey Flow Condition: Pump battery is below
- Homey Flow Condition: CGM battery is below
- Homey Flow Condition: Nightscout is available

### Improved
- Automatic mmol/L and mg/dL support in Flow Conditions.
- Better handling of temporary Nightscout connection failures.
- Improved application stability during startup.

### Removed
- Removed obsolete IOB capability definitions.
- Removed obsolete COB capability definitions.
