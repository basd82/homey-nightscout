'use strict';
const crypto = require('crypto');

class NightscoutClient {
  constructor(baseUrl, credential) {
    this.baseUrl = String(baseUrl || '').replace(/\/$/, '');
    this.credential = String(credential || '').trim();
  }

  headers() {
    if (!this.credential) return {};
    if (this.credential.includes(':')) {
      return { Authorization: `Bearer ${this.credential}` };
    }
    const hash = crypto.createHash('sha1').update(this.credential).digest('hex');
    return { 'api-secret': hash };
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`, { headers: this.headers() });
    if (!response.ok) throw new Error(`Nightscout HTTP ${response.status}`);
    return response.json();
  }

  async test() {
    const rows = await this.get('/api/v1/entries.json?count=1');
    if (!Array.isArray(rows) || !rows.length) throw new Error('Geen glucosewaarde ontvangen');
    return true;
  }

  async read() {
    const [entries, statuses] = await Promise.all([
      this.get('/api/v1/entries.json?count=2'),
      this.get('/api/v1/devicestatus.json?count=1').catch(() => [])
    ]);

    const current = entries?.[0] || {};
    const previous = entries?.[1] || {};
    const ds = statuses?.[0] || {};
    const loop = ds.openaps || ds.loop || {};
    const suggested = loop.suggested || {};
    const enacted = loop.enacted || {};
    const pump = ds.pump || {};
    const uploader = ds.uploader || {};

    const sgv = Number(current.sgv);
    const prev = Number(previous.sgv);
    return {
      sgv,
      direction: current.direction || 'Unknown',
      delta: Number.isFinite(sgv) && Number.isFinite(prev) ? sgv - prev : null,
      iob: suggested.iob ?? enacted.iob ?? ds.iob ?? null,
      cob: suggested.cob ?? enacted.cob ?? ds.cob ?? null,
      reservoir: pump.reservoir ?? null,
      pumpBattery: pump.battery?.percent ?? pump.battery ?? null,
      cgmBattery: uploader.battery ?? ds.xdripjs?.battery ?? null,
      loopStatus: loop ? 'OK' : 'Unknown',
      date: current.date || Date.parse(current.dateString || '') || null
    };
  }
}
module.exports = NightscoutClient;
