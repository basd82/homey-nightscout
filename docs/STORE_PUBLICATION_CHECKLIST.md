# Homey App Store publication checklist

Before publishing:

- [ ] `homey app validate --level=publish`
- [ ] App version set to 1.0.0
- [ ] README checked
- [ ] PRIVACY.md checked
- [ ] CHANGELOG.md checked
- [ ] GitHub repository pushed
- [ ] Screenshots prepared
- [ ] Store descriptions copied from `store/`
- [ ] No secrets, Nightscout URLs or tokens committed
- [ ] App tested on Homey Pro
- [ ] Pairing test works
- [ ] Existing device migration tested

Publish:

```bash
homey app publish
```

After upload, continue in the Homey Developer Dashboard.
