import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, ExternalLink } from 'lucide-react';

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: 'normativa' | 'subvenciones' | 'fotovoltaica' | 'fabricantes' | 'energia';
  publishedAt: string;
};

const FALLBACK: NewsItem[] = [
  {
    id: 'fallback-rebt',
    title: 'REBT e ITC-BT: marco normativo para instalaciones de baja tensión',
    summary: 'Referencia orientativa sobre el reglamento aplicable a instalaciones eléctricas.',
    url: 'https://www.boe.es/',
    source: 'Voltimur',
    category: 'normativa',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-idae',
    title: 'Ayudas e incentivos al autoconsumo fotovoltaico',
    summary: 'Seguimiento de subvenciones y criterios técnicos del sector renovable.',
    url: 'https://www.idae.es/',
    source: 'IDAE',
    category: 'subvenciones',
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-fab',
    title: 'Novedades de fabricantes para instalaciones eléctricas y solar',
    summary: 'Actualidad de producto de marcas de referencia del sector.',
    url: 'https://voltimur.com/#brands',
    source: 'Voltimur',
    category: 'fabricantes',
    publishedAt: new Date().toISOString(),
  },
];

let cachedNews: NewsItem[] | null = null;
let cachedAt = 0;
const CLIENT_CACHE_MS = 5 * 60 * 1000;

export async function loadNews(): Promise<NewsItem[]> {
  if (cachedNews && Date.now() - cachedAt < CLIENT_CACHE_MS) return cachedNews;
  try {
    const res = await fetch(`/api/news?ts=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('news api failed');
    const data = await res.json();
    cachedNews = Array.isArray(data.items) && data.items.length ? data.items : FALLBACK;
    cachedAt = Date.now();
    return cachedNews!;
  } catch {
    cachedNews = FALLBACK;
    cachedAt = Date.now();
    return FALLBACK;
  }
}

export function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>(FALLBACK);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadNews().then(setItems);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index] || items[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#07100c] border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-10 flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
          <Newspaper size={13} />
          Noticias
        </span>
        <span className="hidden sm:inline text-white/15">|</span>
        <div className="relative flex-1 min-w-0 h-6">
          <AnimatePresence mode="wait">
            <motion.a
              key={current.id}
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors truncate"
            >
              <span className="text-emerald-500/90 font-medium shrink-0">{current.source}</span>
              <span className="truncate">{current.title}</span>
              <ExternalLink size={12} className="shrink-0 opacity-50" />
            </motion.a>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
          className="shrink-0 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors hidden md:inline"
        >
          Ver todas
        </button>
      </div>
    </div>
  );
}
