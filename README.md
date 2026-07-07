# Nightscout Monitor for Homey

Nightscout Monitor is een Homey-app waarmee je glucosegegevens uit Nightscout kunt tonen op Homey en gebruiken in Homey Flows.

De app gebruikt **Nightscout als enige bron**. Daardoor hoeft je loop-app, zoals Trio, AndroidAPS of Loop, niet rechtstreeks bereikbaar te zijn vanaf je Homey-netwerk.

## Functies

- Actuele glucosewaarde
- Standaard mmol/L, optioneel mg/dL
- Trendrichting met pijlen
- Delta sinds vorige meting
- Reservoirwaarde wanneer aanwezig in Nightscout
- Pompbatterij wanneer aanwezig in Nightscout
- CGM/uploader-batterij wanneer aanwezig in Nightscout
- Loopstatus wanneer aanwezig in Nightscout
- Te gebruiken in Homey Flows, bijvoorbeeld voor lampkleuren of meldingen

## Vereisten

- Homey Pro
- Werkende Nightscout-site
- Nightscout API-toegang, via API secret of token

## Installatie voor ontwikkeling

```bash
npm install
homey app validate
homey app install
```

Voor tijdelijk testen met live logging:

```bash
homey app run
```

Daarvoor moet Docker Desktop draaien op je Mac.

## Nightscout instellingen

Bij het toevoegen van het apparaat vul je in:

- Nightscout URL, bijvoorbeeld `https://jouw-nightscout.example`
- API secret of token
- Glucose-eenheid: mmol/L of mg/dL

## Homey Flows

Voorbeelden:

- Als glucose lager is dan 4.0 mmol/L → lamp rood
- Als glucose tussen 4.0 en 10.0 mmol/L is → lamp groen
- Als glucose hoger is dan 14.0 mmol/L → lamp paars/rood
- Als trend dalend is → waarschuwing
- Als Nightscout niet bereikbaar is → melding

## Privacy

Deze app stuurt je glucosegegevens niet naar externe diensten van de ontwikkelaar. De app leest alleen gegevens uit jouw eigen Nightscout-omgeving en slaat de instellingen lokaal op Homey op.

Zie ook [`PRIVACY.md`](PRIVACY.md).

## Ondersteuning

Issues en verbeterverzoeken kunnen via GitHub:

https://github.com/basd82/homey-nightscout/issues

## Donatie

☕ **[Buy me a hot chocolate](https://paypal.me/BvandenDikkenberg)**

Vind je Nightscout Monitor handig? Trakteer de ontwikkelaar dan op een warme chocolademelk. 😄

## Licentie

Copyright (C) 2026 B.F. van den Dikkenberg

Deze app is uitgebracht onder de GNU General Public License v3.0 or later.

Zie [`LICENSE`](LICENSE).
