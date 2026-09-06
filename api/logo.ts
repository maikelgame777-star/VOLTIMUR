import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED = new Set([
  'se.com',
  'simon.es',
  'generalcable.com',
  'prysmiangroup.com',
  'circutor.com',
  'v2c.tech',
  'wallbox.com',
  'legrand.com',
  'fronius.com',
  'huawei.com',
  'victronenergy.com',
  'salicru.com',
  'pramac.com',
  'himoinsa.com',
]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const domain = String(req.query.domain || '').toLowerCase().trim();
  if (!ALLOWED.has(domain)) {
    return res.status(400).json({ error: 'Domain not allowed' });
  }

  const sources = [
    `https://logo.clearbit.com/${domain}?size=256`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];

  for (const url of sources) {
    try {
      const upstream = await fetch(url, {
        headers: { 'User-Agent': 'VoltimurLogoProxy/1.0 (+https://voltimur.com)' },
      });
      if (!upstream.ok) continue;
      const contentType = upstream.headers.get('content-type') || '';
      if (!contentType.includes('image')) continue;
      const buf = Buffer.from(await upstream.arrayBuffer());
      if (buf.byteLength < 400) continue;

      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400');
      return res.status(200).send(buf);
    } catch (err) {
      console.error('logo proxy failed', domain, url, err);
    }
  }

  return res.status(404).json({ error: 'Logo not found' });
}
