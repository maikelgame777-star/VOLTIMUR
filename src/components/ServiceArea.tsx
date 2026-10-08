import { motion } from 'motion/react';

const areas = [
  'Murcia',
  'Cartagena',
  'Molina de Segura',
  'Alcantarilla',
  'Lorca',
  'Cieza',
  'Yecla',
  'Totana',
  'Mazarrón',
  'San Javier',
  'Torre-Pacheco',
  'Águilas',
  'Alhama de Murcia',
  'Jumilla',
  'Caravaca de la Cruz',
  'Bullas',
];

export default function ServiceArea() {
  return (
    <section className="py-32 bg-[#0d1117] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            Llegamos a toda la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
              Región de Murcia
            </span>
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Instalaciones eléctricas, solar, seguridad, recarga y más en Murcia capital y municipios de la Región.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-300 mb-12 max-w-3xl mx-auto">
            {areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            Consultar disponibilidad
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
