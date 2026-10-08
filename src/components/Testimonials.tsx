import { motion } from 'motion/react';
import { BatteryCharging, ClipboardCheck, ShieldCheck, Wrench } from 'lucide-react';

const reasons = [
  {
    icon: ClipboardCheck,
    title: 'Legalización y REBT',
    text: 'Boletín eléctrico, documentación e inspecciones técnicas periódicas según normativa vigente en la Región de Murcia.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento y averías',
    text: 'Intervención en cuadros, alumbrado, fallas eléctricas e instalaciones industriales con criterio de seguridad.',
  },
  {
    icon: BatteryCharging,
    title: 'Recarga VE · oficial V2C',
    text: 'Instalamos infraestructura de recarga: V2C como instalador oficial y otras marcas según potencia y uso.',
  },
  {
    icon: ShieldCheck,
    title: 'Trabajo documentado',
    text: 'Fotos reales de obra, protecciones correctas y puesta en marcha clara. Sin rodeos ni “soluciones genéricas”.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-white border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-16 md:w-2/3"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Por qué Voltimur
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">
            Experiencia y rigor en cada instalación
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            Más de 25 años en Murcia trabajando infraestructuras eléctricas, mantenimiento, inspecciones según REBT
            e infraestructura de recarga. Así es como abordamos cada proyecto.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="border border-gray-200 p-6 md:p-8"
            >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 pt-10"
        >
          <p className="text-gray-500 font-light">
            ¿Tienes un proyecto en Murcia? Te respondemos con presupuesto claro en 24 h.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shrink-0"
          >
            Solicitar presupuesto
          </button>
        </motion.div>
      </div>
    </section>
  );
}
