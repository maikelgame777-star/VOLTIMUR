import { motion } from 'motion/react';

const facts = [
  {
    value: '25+',
    label: 'Años de experiencia',
    detail: 'Infraestructuras eléctricas, mantenimiento e inspecciones según REBT en la Región de Murcia.',
  },
  {
    value: 'REBT',
    label: 'Instalador autorizado',
    detail: 'Boletín eléctrico, legalización e inspecciones técnicas periódicas conforme a normativa.',
  },
  {
    value: 'V2C',
    label: 'Instalador oficial',
    detail: 'Infraestructura de recarga de vehículo eléctrico y otras marcas según el proyecto.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-gray-50 text-gray-900 border-t border-gray-200 border-dashed relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">Sobre Nosotros</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gray-900">
              Empresa instaladora de Murcia, con criterio técnico
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-light">
              <strong className="text-gray-900 font-medium">Voltimur</strong> trabaja instalaciones eléctricas,
              mantenimiento, inspecciones técnicas periódicas según REBT e infraestructura de recarga.
              Más de 25 años de oficio en viviendas, comunidades, comercios e industria de la Región de Murcia.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              No vendemos plantillas: medimos, legalizamos y dejamos cada instalación documentada.
              Tres pilares que no negociamos:{' '}
              <span className="text-emerald-600 font-medium">profesionalidad, eficiencia y confianza</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-5"
          >
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-5 md:gap-6 p-6 md:p-7 border border-gray-200 bg-white relative"
              >
                <div className="absolute left-0 top-5 bottom-5 w-1 bg-gradient-to-b from-emerald-500 to-amber-400" />
                <div className="text-3xl md:text-4xl font-display font-bold text-emerald-600 tabular-nums shrink-0 min-w-[4.5rem]">
                  {fact.value}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
                    {fact.label}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{fact.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
