import { motion } from 'motion/react';

const works = [
  {
    image: '/images/recarga-v2c-obra.jpg',
    title: 'Cargador V2C',
    caption: 'Instalación real de wallbox V2C con canalización profesional en garaje',
    className: 'md:col-span-2 md:row-span-2',
    objectPosition: 'object-[center_20%]',
  },
  {
    image: '/images/industrial-sai-proteccion.jpg',
    title: 'Industrial · SAI',
    caption: 'Cuadro de protecciones para sistemas SAI (alimentación ininterrumpida)',
    className: 'md:col-span-1',
    objectPosition: 'object-center',
  },
  {
    image: '/images/industrial-condensadores.jpg',
    title: 'Banco de condensadores',
    caption: 'Gestión y control de batería de condensadores de potencia',
    className: 'md:col-span-1',
    objectPosition: 'object-[center_35%]',
  },
  {
    image: '/images/industrial-condensadores-medida.jpg',
    title: 'Control de potencia',
    caption: 'Analizador PowerLogic en batería de condensadores (trafo y medida)',
    className: 'md:col-span-1',
    objectPosition: 'object-center',
  },
  {
    image: '/images/industrial-fallas.jpg',
    title: 'Fallas eléctricas',
    caption: 'Diagnóstico de fallas con pinzas amperimétricas en instalación industrial',
    className: 'md:col-span-1',
    objectPosition: 'object-[center_40%]',
  },
  {
    image: '/images/obra-mantenimiento-cuadro.jpg',
    title: 'Mantenimiento',
    caption: 'Revisión de cuadros eléctricos con EPI y medición en campo',
    className: 'md:col-span-1',
    objectPosition: 'object-center',
  },
  {
    image: '/images/obra-garaje-cuadro.jpg',
    title: 'Garaje comunitario',
    caption: 'Trabajo en cuadro y canalización para infraestructura de recarga',
    className: 'md:col-span-1',
    objectPosition: 'object-[center_25%]',
  },
  {
    image: '/images/obra-alumbrado-exterior.jpg',
    title: 'Alumbrado exterior',
    caption: 'Mantenimiento e instalación de luminarias en zonas comunes',
    className: 'md:col-span-1',
    objectPosition: 'object-[center_35%]',
  },
];

export default function Works() {
  return (
    <section id="works" className="py-32 bg-gray-50 text-gray-900 border-t border-gray-200 border-dashed relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.06),_transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:w-2/3"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">Trabajos</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
            El día a día de nuestras instalaciones
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            Fotos reales de nuestros trabajos en Murcia: electricidad, industrial, mantenimiento, recarga y alumbrado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[220px]">
          {works.map((work, index) => (
            <motion.figure
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className={`relative group overflow-hidden min-h-[260px] ${work.className}`}
            >
              <img
                src={work.image}
                alt={work.caption}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${work.objectPosition}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/85 via-[#0d1117]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1.5">
                  {work.title}
                </p>
                <p className="text-white text-sm md:text-base font-display font-medium leading-snug">
                  {work.caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
