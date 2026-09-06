import type { VercelRequest, VercelResponse } from '@vercel/node';

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: 'normativa' | 'tecnologia' | 'energia';
  publishedAt: string;
};

const KEYWORDS = [
  'electric',
  'eléctric',
  'electricid',
  'energ',
  'autoconsumo',
  'fotovolta',
  'solar',
  'recarga',
  'vehículo eléctrico',
  'vehiculo electrico',
  'punto de recarga',
  'red eléctrica',
  'red electrica',
  'tarifa',
  'potencia',
  'REBT',
  'ITC-BT',
  'baja tensión',
  'baja tension',
  'instalacion elect',
  'instalación elect',
  'renovable',
  'bater',
  'inverso',
  'CNMC',
  'IDAE',
  'eficiencia energética',
  'eficiencia energetica',
];

const SOURCES: { name: string; url: string; category: NewsItem['category'] }[] = [
  {
    name: 'BOE',
    url: 'https://www.boe.es/rss/boe.php?seccion=1',
    category: 'normativa',
  },
  {
    name: 'IDAE',
    url: 'https://www.idae.es/rss.xml',
    category: 'tecnologia',
  },
  {
    name: 'CNMC',
    url: 'https://www.cnmc.es/rss.xml',
    category: 'energia',
  },
];

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = block.match(re);
  return m ? decodeXml(m[1]) : '';
}

function parseRssItems(xml: string): { title: string; link: string; description: string; pubDate: string }[] {
  const items: { title: string; link: string; description: string; pubDate: string }[] = [];
  const parts = xml.split(/<item[\s>]/i).slice(1);
  for (const part of parts) {
    const block = part.split(/<\/item>/i)[0] || '';
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link') || extractTag(block, 'guid');
    const description = extractTag(block, 'description') || extractTag(block, 'content:encoded');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function isRelevant(title: string, description: string): boolean {
  const hay = `${title} ${description}`.toLowerCase();
  return KEYWORDS.some((k) => hay.includes(k.toLowerCase()));
}

function toIso(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function slugId(source: string, title: string, url: string): string {
  const raw = `${source}-${title}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);
  return raw || `${source}-${Date.now()}`;
}

async function fetchSource(source: (typeof SOURCES)[number]): Promise<NewsItem[]> {
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': 'VoltimurNewsAgent/1.0 (+https://voltimur.com)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`${source.name} HTTP ${res.status}`);
  const xml = await res.text();
  const parsed = parseRssItems(xml);

  return parsed
    .filter((item) => (source.name === 'BOE' ? isRelevant(item.title, item.description) : true))
    .slice(0, 8)
    .map((item) => ({
      id: slugId(source.name, item.title, item.link),
      title: item.title,
      summary: item.description.slice(0, 220) || `Novedad publicada por ${source.name}.`,
      url: item.link,
      source: source.name,
      category: source.category,
      publishedAt: toIso(item.pubDate),
    }));
}

const FALLBACK: NewsItem[] = [
  {
    id: 'fallback-rebt',
    title: 'REBT e ITC-BT: marco normativo vigente para instalaciones de baja tensión',
    summary:
      'Recordatorio orientativo sobre el Reglamento Electrotécnico de Baja Tensión y sus instrucciones técnicas complementarias aplicables a instalaciones residenciales y empresariales.',
    url: 'https://www.boe.es/',
    source: 'Voltimur',
    category: 'normativa',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-autoconsumo',
    title: 'Autoconsumo fotovoltaico: tramitación y legalización en España',
    summary:
      'Guía de referencia sobre requisitos habituales de legalización e inscripción de instalaciones de autoconsumo.',
    url: 'https://www.idae.es/',
    source: 'Voltimur',
    category: 'tecnologia',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-ve',
    title: 'Infraestructura de recarga para vehículo eléctrico: criterios técnicos',
    summary:
      'Aspectos clave de potencia disponible, protecciones y gestión de carga dinámica en puntos de recarga.',
    url: 'https://www.cnmc.es/',
    source: 'Voltimur',
    category: 'energia',
    publishedAt: new Date().toISOString(),
  },
];

async function collectNews(): Promise<{ items: NewsItem[]; updatedAt: string; sourcesOk: string[] }> {
  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  const items: NewsItem[] = [];
  const sourcesOk: string[] = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
      sourcesOk.push(SOURCES[i].name);
    } else {
      console.error(`News source failed: ${SOURCES[i].name}`, result.reason);
    }
  });

  items.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const unique = new Map<string, NewsItem>();
  for (const item of items) {
    if (!unique.has(item.title)) unique.set(item.title, item);
  }

  const finalItems = [...unique.values()].slice(0, 12);
  return {
    items: finalItems.length ? finalItems : FALLBACK,
    updatedAt: new Date().toISOString(),
    sourcesOk: finalItems.length ? sourcesOk : ['Voltimur'],
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Cron (Vercel) or manual refresh
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await collectNews();
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      ok: true,
      agent: 'voltimur-news-agent',
      ...payload,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(200).json({
      ok: true,
      agent: 'voltimur-news-agent',
      items: FALLBACK,
      updatedAt: new Date().toISOString(),
      sourcesOk: ['Voltimur'],
      warning: error?.message || 'Fallback activo',
    });
  }
}
