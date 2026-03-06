import { motion } from 'motion/react';
import { MapPin, CheckCircle2 } from 'lucide-react';

const areas = [
  "Murcia Capital", "Cartagena", "Molina de Segura", "Alcantarilla",
  "Lorca", "Cieza", "Yecla", "Caravaca de la Cruz",
  "Totana", "Mazarrón", "San Javier", "Torre-Pacheco",
  "Alhama de Murcia", "Jumilla", "Águilas", "Bullas"
];

export default function ServiceArea() {
  return (
    <section className="py-32 bg-[#0d1117] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-6">
              <MapPin size={16} />
              Zona de cobertura
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Llegamos a toda la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">
                Región de Murcia
              </span>
            </h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
              Nos desplazamos a cualquier punto de la región. Si tu municipio no aparece en la lista, consúltanos: seguro que podemos ayudarte.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              Consultar disponibilidad
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {areas.map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-300 group cursor-default"
              >
                <CheckCircle2 size={17} className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-300 text-sm font-medium">{area}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
