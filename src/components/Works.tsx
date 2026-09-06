import { motion } from 'motion/react';

const works = [
  {
    image: "/images/trabajo-1.jpg",
    title: "Instalaciones en obra",
    caption: "Electricistas certificados en instalaciones residenciales y comerciales",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    image: "/images/trabajo-2.jpg",
    title: "Energía solar",
    caption: "Autoconsumo fotovoltaico para hogares y empresas",
    className: "md:col-span-1",
  },
  {
    image: "/images/trabajo-3.jpg",
    title: "Movilidad eléctrica",
    caption: "Puntos de recarga legales y con gestión de potencia",
    className: "md:col-span-1",
  },
  {
    image: "/images/trabajo-4.jpg",
    title: "Cuadros y cableado",
    caption: "Infraestructura eléctrica ordenada y conforme al REBT",
    className: "md:col-span-1",
  },
  {
    image: "/images/trabajo-5.jpg",
    title: "Fotovoltaica en cubierta",
    caption: "Proyectos de generación limpia a medida",
    className: "md:col-span-1",
  },
  {
    image: "/images/trabajo-6.jpg",
    title: "Seguridad e infraestructura",
    caption: "Sistemas de vigilancia y cableado técnico profesional",
    className: "md:col-span-1",
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
            Imágenes orientativas del tipo de proyectos que ejecutamos: electricidad, solar, recarga y eficiencia energética en Murcia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[220px]">
          {works.map((work, index) => (
            <motion.figure
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              className={`relative group overflow-hidden min-h-[260px] ${work.className}`}
            >
              <img
                src={work.image}
                alt={work.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
