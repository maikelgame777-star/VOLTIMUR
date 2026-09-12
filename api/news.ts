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
  /** fabricantes: basta con mencionar marca; sector: filtro estricto */
  filterMode: 'strict' | 'brand' | 'soft';
};

const BRANDS = [
  'schneider',
  'fronius',
  'huawei',
  'wallbox',
  'victron',
  'circutor',
  'legrand',
  'prysmian',
  'general cable',
  'osram',
  'philips',
  'signify',
  'salicru',
  'pramac',
  'himoinsa',
  'v2c',
  'simon',
];

const HIGH_PRIORITY = [
  'rebt',
  'itc-bt',
  'itc bt',
  'baja tensión',
  'baja tension',
  'reglamento electrotécnico',
  'reglamento electrotecnico',
  'instalación eléctrica',
  'instalacion electrica',
  'instalaciones eléctricas',
  'cuadro eléctrico',
  'cuadro electrico',
  'punto de recarga',
  'puntos de recarga',
  'vehículo eléctrico',
  'vehiculo electrico',
  'infraestructura de recarga',
  'subvención',
  'subvencion',
  'ayuda idae',
  'fondos next',
  'perte',
  'eficiencia energética',
  'eficiencia energetica',
  'domótica',
  'domotica',
  'telecomunicaciones',
  'cableado',
];

const INCLUDE = [
  ...HIGH_PRIORITY,
  'autoconsumo',
  'fotovolta',
  'placa solar',
  'paneles solares',
  'energía solar',
  'energia solar',
  'electricidad',
  'electrotécnic',
  'electrotecnic',
  'red eléctrica',
  'red electrica',
  'inversor',
  'batería',
  'bateria',
  'almacenamiento',
  'cargador',
  'miteco',
  'idae',
  'cnmc',
  'ministerio de ciencia',
  'renovable',
  'comunidades energéticas',
  'comunidades energeticas',
  'iluminación',
  'iluminacion',
  'led',
  ...BRANDS,
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
];

const GN = (q: string) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es&gl=ES&ceid=ES:es`;

const SOURCES: Source[] = [
  {
    name: 'BOE',
    url: 'https://www.boe.es/rss/boe.php?seccion=1',
    category: 'normativa',
    filterMode: 'strict',
  },
  {
    name: 'IDAE',
    url: 'https://www.idae.es/rss.xml',
    category: 'subvenciones',
    filterMode: 'soft',
  },
  {
    name: 'CNMC',
    url: 'https://www.cnmc.es/rss.xml',
    category: 'energia',
    filterMode: 'soft',
  },
  {
    name: 'Prysmian',
    url: 'https://www.prysmiangroup.com/en/rss.xml',
    category: 'fabricantes',
    filterMode: 'brand',
  },
  // Fuentes separadas para no dejar que la fotovoltaica acapare el listado
  {
    name: 'Normativa eléctrica',
    url: GN('REBT OR "ITC-BT" OR "baja tensión" OR "reglamento electrotécnico" OR "instalaciones eléctricas" normativa'),
    category: 'normativa',
    filterMode: 'soft',
  },
  {
    name: 'Recarga / instalaciones',
    url: GN('"punto de recarga" OR "vehículo eléctrico" OR "cuadro eléctrico" OR domótica OR "instalación eléctrica" Murcia OR España'),
    category: 'energia',
    filterMode: 'soft',
  },
  {
    name: 'Subvenciones',
    url: GN('IDAE OR subvención OR "ayudas" (autoconsumo OR eficiencia OR "vehículo eléctrico" OR renovable) España'),
    category: 'subvenciones',
    filterMode: 'soft',
  },
  {
    name: 'Fotovoltaica',
    url: GN('fotovoltaica OR autoconsumo OR "paneles solares" (España OR Murcia) -opinión'),
    category: 'fotovoltaica',
    filterMode: 'soft',
  },
  {
    name: 'Fabricantes',
    url: GN(
      '("Schneider Electric" OR Fronius OR "Huawei" OR Wallbox OR Victron OR Circutor OR Legrand OR Osram OR Philips OR Prysmian OR Salicru) (eléctrico OR eléctrica OR solar OR cargador OR iluminación OR cable OR inversor OR cuadro)'
    ),
    category: 'fabricantes',
    filterMode: 'brand',
  },
  {
    name: 'Ciencia / Tecnología',
    url: GN('(site:ciencia.gob.es OR "Ministerio de Ciencia") (energía OR renovable OR tecnología OR innovación OR eléctrico)'),
    category: 'energia',
    filterMode: 'soft',
  },
];

/** Cupo por categoría: fabricantes y normativa primero; FV limitado */
const CATEGORY_QUOTA: Record<NewsItem['category'], number> = {
  fabricantes: 3,
  normativa: 3,
  subvenciones: 2,
  energia: 2,
  fotovoltaica: 2,
};

const CATEGORY_ORDER: NewsItem['category'][] = [
  'fabricantes',
  'normativa',
  'subvenciones',
  'energia',
  'fotovoltaica',
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
    const link = extractTag(block, 'link') || extractTag(block, 'guid');
    const description = extractTag(block, 'description') || extractTag(block, 'content:encoded');
    const pubDate = extractTag(block, 'pubDate') || extractTag(block, 'dc:date');
    if (title && link) items.push({ title, link, description, pubDate });
  }
  return items;
}

function mentionsBrand(hay: string): boolean {
  return BRANDS.some((b) => hay.includes(b));
}

function isExcluded(hay: string): boolean {
  return EXCLUDE.some((k) => hay.includes(k.toLowerCase()));
}

function isRelevant(title: string, description: string, mode: Source['filterMode']): boolean {
  const hay = `${title} ${description}`.toLowerCase();
  if (isExcluded(hay)) return false;

  if (mode === 'brand') {
    // Actualidad de fabricantes: basta con marca + contexto mínimo de producto/sector
    if (!mentionsBrand(hay)) return false;
    return (
      INCLUDE.some((k) => hay.includes(k.toLowerCase())) ||
      hay.includes('product') ||
      hay.includes('launch') ||
      hay.includes('nuevo') ||
      hay.includes('nueva') ||
      hay.includes('cable') ||
      hay.includes('charger') ||
      hay.includes('inverter')
    );
  }

  const high = HIGH_PRIORITY.some((k) => hay.includes(k.toLowerCase()));
  const incCount = INCLUDE.filter((k) => hay.includes(k.toLowerCase())).length;

  if (mode === 'soft') return high || incCount >= 1 || mentionsBrand(hay);
  return high || incCount >= 2;
}

function inferCategory(
  title: string,
  description: string,
  fallback: NewsItem['category']
): NewsItem['category'] {
  const hay = `${title} ${description}`.toLowerCase();

  // Fabricantes antes que FV (una noticia de Huawei solar es "fabricantes")
  if (mentionsBrand(hay) && fallback === 'fabricantes') return 'fabricantes';
  if (mentionsBrand(hay) && !hay.includes('subvenc') && !hay.includes('ayuda idae')) {
    return 'fabricantes';
  }

  if (
    hay.includes('rebt') ||
    hay.includes('itc-bt') ||
    hay.includes('itc bt') ||
    hay.includes('reglamento electrot') ||
    hay.includes('baja tensión') ||
    hay.includes('baja tension') ||
    (hay.includes('normativa') && hay.includes('eléct'))
  ) {
    return 'normativa';
  }

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
    hay.includes('punto de recarga') ||
    hay.includes('vehículo eléctrico') ||
    hay.includes('vehiculo electrico') ||
    hay.includes('domótica') ||
    hay.includes('domotica') ||
    hay.includes('cuadro eléctrico') ||
    hay.includes('instalación eléctrica')
  ) {
    return 'energia';
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

function cleanTitle(title: string): string {
  return title.replace(/\s+-\s+[^-]+$/, '').trim() || title;
}

async function fetchSource(source: Source): Promise<NewsItem[]> {
  const res = await fetch(source.url, {
    headers: {
      'User-Agent': 'VoltimurNewsAgent/1.2 (+https://voltimur.com; sector electrico Murcia)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`${source.name} HTTP ${res.status}`);
  const xml = await readXmlText(res);
  const parsed = parseRssItems(xml);

  return parsed
    .filter((item) => isRelevant(item.title, item.description, source.filterMode))
    .slice(0, 10)
    .map((item) => ({
      id: slugId(source.name, item.title, item.link),
      title: cleanTitle(item.title),
      summary: item.description.slice(0, 220) || `Novedad del sector publicada por ${source.name}.`,
      url: item.link,
      source: source.name,
      category: inferCategory(item.title, item.description, source.category),
      publishedAt: toIso(item.pubDate),
    }));
}

/** Equilibra el listado para que FV no domine */
function balanceByCategory(items: NewsItem[], limit = 12): NewsItem[] {
  const byCat = new Map<NewsItem['category'], NewsItem[]>();
  for (const cat of CATEGORY_ORDER) byCat.set(cat, []);

  const sorted = [...items].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  for (const item of sorted) {
    const list = byCat.get(item.category) || [];
    list.push(item);
    byCat.set(item.category, list);
  }

  const picked: NewsItem[] = [];
  const seen = new Set<string>();

  const take = (item: NewsItem) => {
    const key = item.title.toLowerCase().slice(0, 120);
    if (seen.has(key)) return false;
    seen.add(key);
    picked.push(item);
    return true;
  };

  // 1ª pasada: respetar cupos por categoría (orden de prioridad)
  for (const cat of CATEGORY_ORDER) {
    const quota = CATEGORY_QUOTA[cat];
    const list = byCat.get(cat) || [];
    let n = 0;
    for (const item of list) {
      if (n >= quota || picked.length >= limit) break;
      if (take(item)) n += 1;
    }
  }

  // 2ª pasada: rellenar huecos con lo más reciente de cualquier categoría (FV como máximo +1 extra)
  if (picked.length < limit) {
    let extraPv = 0;
    for (const item of sorted) {
      if (picked.length >= limit) break;
      if (item.category === 'fotovoltaica') {
        if (extraPv >= 1) continue;
        if (take(item)) extraPv += 1;
      } else {
        take(item);
      }
    }
  }

  return picked.slice(0, limit);
}

const FALLBACK: NewsItem[] = [
  {
    id: 'fallback-fab',
    title: 'Novedades de fabricantes para instalaciones eléctricas',
    summary:
      'Seguimiento de producto de Schneider, Fronius, Huawei, Wallbox, Victron, Circutor, Legrand u Osram.',
    url: 'https://voltimur.com/#brands',
    source: 'Voltimur',
    category: 'fabricantes',
    publishedAt: new Date().toISOString(),
  },
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
    title: 'Ayudas e incentivos energéticos (IDAE y fondos)',
    summary: 'Información orientativa sobre líneas de ayuda de eficiencia, renovable y movilidad eléctrica.',
    url: 'https://www.idae.es/',
    source: 'IDAE',
    category: 'subvenciones',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-energia',
    title: 'Puntos de recarga e instalaciones eléctricas: criterios técnicos',
    summary: 'Aspectos clave de potencia, protecciones y legalización en vivienda y empresa.',
    url: 'https://voltimur.com/#services',
    source: 'Voltimur',
    category: 'energia',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-fv',
    title: 'Autoconsumo fotovoltaico: legalización y puesta en marcha',
    summary: 'Tramitación y criterios técnicos habituales en proyectos de autoconsumo.',
    url: 'https://www.idae.es/',
    source: 'Voltimur',
    category: 'fotovoltaica',
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

  const finalItems = balanceByCategory(items, 12);
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
    // Cache más corto para ver el cambio antes
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      ok: true,
      agent: 'voltimur-news-agent',
      balance: CATEGORY_QUOTA,
      focus: ['fabricantes', 'normativa', 'subvenciones', 'energia', 'fotovoltaica'],
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
