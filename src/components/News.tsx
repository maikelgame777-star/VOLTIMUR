import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Newspaper } from 'lucide-react';
import { loadNews, type NewsItem } from './NewsTicker';

const categoryLabel: Record<NewsItem['category'], string> = {
  normativa: 'Normativa',
  subvenciones: 'Subvenciones',
  fotovoltaica: 'Fotovoltaica',
  fabricantes: 'Fabricantes',
  energia: 'Energía',
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="news" className="py-32 bg-[#0d1117] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.08),_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:w-2/3"
        >
          <div className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
            <Newspaper size={16} />
            Actualidad técnica
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Normativa, ayudas y tecnología del sector
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Solo contenido útil para instalaciones: REBT y normativa eléctrica, subvenciones, fotovoltaica, ciencia/tecnología energética y novedades de fabricantes de referencia.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.slice(0, 6).map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400">
                    {categoryLabel[item.category]}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(item.publishedAt)}</span>
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug mb-3 text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-5">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{item.source}</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 group-hover:gap-2 transition-all">
                    Leer
                    <ExternalLink size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
