import type { VercelRequest, VercelResponse } from '@vercel/node';

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: 'normativa' | 'subvenciones' | 'fotovoltaica' | 'fabricantes' | 'energia';
  publishedAt: string;
};

type Source = {
  name: string;
  url: string;
  category: NewsItem['category'];
  /** Si true, solo pasan ítems con puntuación de relevancia suficiente */
  strictFilter: boolean;
};

/**
 * Enfoque Voltimur:
 * - normativa eléctrica / REBT / ITC
 * - subvenciones y ayudas (IDAE, fondos, autoconsumo)
 * - fotovoltaica y almacenamiento
 * - actualidad de fabricantes de producto para instalaciones
 * - ministerio / ciencia-tecnología solo si toca energía o innovación aplicada
 */
const HIGH_PRIORITY = [
  'rebt',
  'itc-bt',
  'itc bt',
  'baja tensión',
  'baja tension',
  'reglamento electrotécnico',
  'reglamento electrotecnico',
  'autoconsumo',
  'fotovolta',
  'placa solar',
  'paneles solares',
  'punto de recarga',
  'puntos de recarga',
  'vehículo eléctrico',
  'vehiculo electrico',
  'infraestructura de recarga',
  'subvencención',
  'subvencion',
  'ayudas al autoconsumo',
  'ayuda idae',
  'fondos next',
  'perte',
  'eficiencia energética',
  'eficiencia energetica',
];

const INCLUDE = [
  ...HIGH_PRIORITY,
  'instalación eléctrica',
  'instalacion electrica',
  'instalaciones eléctricas',
  'cuadro eléctrico',
  'cuadro electrico',
  'electricidad',
  'electrotécnic',
  'electrotecnic',
  'red eléctrica',
  'red electrica',
  'autoconsumo fotovolta',
  'inversor',
  'batería de litio',
  'bateria de litio',
  'almacenamiento energético',
  'almacenamiento energetico',
  'cargador',
  'wallbox',
  'schneider',
  'fronius',
  'huawei',
  'victron',
  'circutor',
  'legrand',
  'prysmian',
  'general cable',
  'osram',
  'philips lighting',
  'signify',
  'miteco',
  'idae',
  'cnmc',
  'ciencia e innovación',
  'ciencia e innovacion',
  'ministerio de ciencia',
  'tecnología energética',
  'tecnologia energetica',
  'renovable',
  'energía solar',
  'energia solar',
  'comunidades energéticas',
  'comunidades energeticas',
];

const EXCLUDE = [
  'tabaco',
  'expendeduría',
  'expendeduria',
  'fronterizos',
  'fronteras interiores',
  'jubilación',
  'jubilacion',
  'magistrad',
  'oposicion',
  'oposición',
  'concurso de personal',
  'nombramiento',
  'cese de',
  'farmacéutic',
  'farmaceutic',
  'sanitario',
  'hospital',
  'deportiv',
  'futbol',
  'fútbol',
  'cine',
  'cultura',
  'turismo',
  'vivienda de protección',
  'alquiler social',
];

const SOURCES: Source[] = [
  {
    name: 'BOE',
    url: 'https://www.boe.es/rss/boe.php?seccion=1',
    category: 'normativa',
    strictFilter: true,
  },
  {
    name: 'IDAE',
    url: 'https://www.idae.es/rss.xml',
    category: 'subvenciones',
    strictFilter: true,
  },
  {
    name: 'CNMC',
    url: 'https://www.cnmc.es/rss.xml',
    category: 'energia',
    strictFilter: true,
  },
  {
    name: 'Prysmian',
    url: 'https://www.prysmiangroup.com/en/rss.xml',
    category: 'fabricantes',
    strictFilter: true,
  },
  {
    name: 'Sector (Google News)',
    url:
      'https://news.google.com/rss/search?q=REBT%20OR%20autoconsumo%20OR%20fotovoltaica%20OR%20%22punto%20de%20recarga%22%20OR%20%22baja%20tensi%C3%B3n%22%20OR%20%22subvenci%C3%B3n%20energ%C3%ADa%22%20OR%20IDAE&hl=es&gl=ES&ceid=ES:es',
    category: 'fotovoltaica',
    strictFilter: true,
  },
  {
    name: 'Fabricantes (Google News)',
    url:
      'https://news.google.com/rss/search?q=(Schneider%20Electric%20OR%20Fronius%20OR%20%22Huawei%20FusionSolar%22%20OR%20Wallbox%20OR%20Victron%20OR%20Circutor%20OR%20Legrand%20OR%20Osram)%20(solar%20OR%20fotovolta%20OR%20cargador%20OR%20el%C3%A9ctrico%20OR%20instalaci%C3%B3n)&hl=es&gl=ES&ceid=ES:es',
    category: 'fabricantes',
    strictFilter: true,
  },
  {
    name: 'Ciencia / Tecnología',
    url:
      'https://news.google.com/rss/search?q=(site:ciencia.gob.es%20OR%20%22Ministerio%20de%20Ciencia%22)%20(energ%C3%ADa%20OR%20renovable%20OR%20tecnolog%C3%ADa%20OR%20innovaci%C3%B3n%20OR%20fotovolta)&hl=es&gl=ES&ceid=ES:es',
    category: 'energia',
    strictFilter: true,
  },
];

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number(num)))
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&uuml;/gi, 'ü')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ntilde;/g, 'Ñ')
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

async function readXmlText(res: Response): Promise<string> {
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') || '';
  const headerCharset = contentType.match(/charset\s*=\s*([^;]+)/i)?.[1]?.trim().replace(/['"]/g, '');
  const xmlHead = buf.subarray(0, 240).toString('ascii');
  const xmlCharset = xmlHead.match(/encoding\s*=\s*["']([^"']+)["']/i)?.[1];
  const charset = (headerCharset || xmlCharset || 'utf-8').toLowerCase();

  if (
    charset.includes('8859-1') ||
    charset.includes('latin-1') ||
    charset.includes('latin1') ||
    charset.includes('windows-1252') ||
    charset.includes('cp1252')
  ) {
    return buf.toString('latin1');
  }
  return buf.toString('utf8');
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
    let link = extractTag(block, 'link') || extractTag(block, 'guid');
    // Google News sometimes puts URL in description; prefer <link>
    const description = extractTag(block, 'description') || extractTag(block, 'content:encoded');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function relevanceScore(title: string, description: string): number {
  const hay = `${title} ${description}`.toLowerCase();
  if (EXCLUDE.some((k) => hay.includes(k.toLowerCase()))) return -100;

  let score = 0;
  for (const k of HIGH_PRIORITY) {
    if (hay.includes(k.toLowerCase())) score += 3;
  }
  for (const k of INCLUDE) {
    if (hay.includes(k.toLowerCase())) score += 1;
  }
  return score;
}

function isRelevant(title: string, description: string): boolean {
  // Umbral: al menos una coincidencia de alta prioridad, o varias del sector
  return relevanceScore(title, description) >= 3;
}

function inferCategory(
  title: string,
  description: string,
  fallback: NewsItem['category']
): NewsItem['category'] {
  const hay = `${title} ${description}`.toLowerCase();
  if (
    hay.includes('subvenc') ||
    hay.includes('ayuda') ||
    hay.includes('idae') ||
    hay.includes('fondos') ||
    hay.includes('perte')
  ) {
    return 'subvenciones';
  }
  if (
    hay.includes('fotovolta') ||
    hay.includes('autoconsumo') ||
    hay.includes('placa solar') ||
    hay.includes('paneles solares') ||
    hay.includes('energía solar') ||
    hay.includes('energia solar')
  ) {
    return 'fotovoltaica';
  }
  if (
    hay.includes('schneider') ||
    hay.includes('fronius') ||
    hay.includes('huawei') ||
    hay.includes('wallbox') ||
    hay.includes('victron') ||
    hay.includes('circutor') ||
    hay.includes('legrand') ||
    hay.includes('prysmian') ||
    hay.includes('osram') ||
    hay.includes('philips')
  ) {
    return 'fabricantes';
  }
  if (
    hay.includes('rebt') ||
    hay.includes('itc') ||
    hay.includes('reglamento') ||
    hay.includes('normativa') ||
    hay.includes('boe')
  ) {
    return 'normativa';
  }
  return fallback;
}

function toIso(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function slugId(source: string, title: string, url: string): string {
  const raw = `${source}-${title}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);
  return raw || `${source}-${Date.now()}`;
}

async function fetchSource(source: Source): Promise<NewsItem[]> {
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': 'VoltimurNewsAgent/1.1 (+https://voltimur.com; sector electrico Murcia)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`${source.name} HTTP ${res.status}`);
  const xml = await readXmlText(res);
  const parsed = parseRssItems(xml);

  const filtered = source.strictFilter
    ? parsed.filter((item) => isRelevant(item.title, item.description))
    : parsed;

  return filtered.slice(0, 6).map((item) => {
    const category = inferCategory(item.title, item.description, source.category);
    return {
      id: slugId(source.name, item.title, item.link),
      title: item.title.replace(/\s+-\s+[^-]+$/, '').trim() || item.title, // limpia " - Medio" de Google News
      summary: item.description.slice(0, 220) || `Novedad del sector publicada por ${source.name}.`,
      url: item.link,
      source: source.name,
      category,
      publishedAt: toIso(item.pubDate),
    };
  });
}

const FALLBACK: NewsItem[] = [
  {
    id: 'fallback-rebt',
    title: 'REBT e ITC-BT: marco normativo para instalaciones de baja tensión',
    summary:
      'Referencia orientativa sobre el reglamento electrotécnico aplicable a instalaciones residenciales y empresariales.',
    url: 'https://www.boe.es/',
    source: 'Voltimur',
    category: 'normativa',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-subvenciones',
    title: 'Ayudas e incentivos al autoconsumo fotovoltaico',
    summary:
      'Seguimiento de líneas de ayuda e información del IDAE relacionadas con eficiencia energética y renovables.',
    url: 'https://www.idae.es/',
    source: 'IDAE',
    category: 'subvenciones',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-fv',
    title: 'Autoconsumo fotovoltaico: criterios técnicos y legalización',
    summary:
      'Aspectos clave de tramitación, legalización e inscripción de instalaciones de autoconsumo en España.',
    url: 'https://www.idae.es/',
    source: 'Voltimur',
    category: 'fotovoltaica',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-fab',
    title: 'Fabricantes de referencia en instalaciones eléctricas y solar',
    summary:
      'Seguimiento de novedades de producto de marcas como Schneider, Fronius, Huawei, Wallbox, Victron o Circutor.',
    url: 'https://voltimur.com/#brands',
    source: 'Voltimur',
    category: 'fabricantes',
    publishedAt: new Date().toISOString(),
  },
];

async function collectNews(): Promise<{ items: NewsItem[]; updatedAt: string; sourcesOk: string[] }> {
  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  const items: NewsItem[] = [];
  const sourcesOk: string[] = [];

  results.forEach((result, i) => {
    if (result.status === 'fulfilled' && result.value.length) {
      items.push(...result.value);
      sourcesOk.push(SOURCES[i].name);
    } else if (result.status === 'rejected') {
      console.error(`News source failed: ${SOURCES[i].name}`, result.reason);
    }
  });

  items.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  const unique = new Map<string, NewsItem>();
  for (const item of items) {
    const key = item.title.toLowerCase().slice(0, 120);
    if (!unique.has(key)) unique.set(key, item);
  }

  const finalItems = [...unique.values()].slice(0, 12);
  return {
    items: finalItems.length ? finalItems : FALLBACK,
    updatedAt: new Date().toISOString(),
    sourcesOk: finalItems.length ? sourcesOk : ['Voltimur'],
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = await collectNews();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      ok: true,
      agent: 'voltimur-news-agent',
      focus: ['normativa-electrica', 'subvenciones', 'fotovoltaica', 'fabricantes', 'ciencia-tecnologia'],
      ...payload,
    });
  } catch (error: any) {
    console.error(error);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
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
