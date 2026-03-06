import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: '+', label: 'Años de experiencia' },
  { value: 500, suffix: '+', label: 'Instalaciones completadas' },
  { value: 300, suffix: '+', label: 'Clientes satisfechos' },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-gray-50 text-gray-900 border-t border-gray-200 border-dashed relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-50/50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">Sobre Nosotros</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gray-900">
              15 años encendiendo Murcia
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-light">
              <strong className="text-gray-900 font-medium">Voltimur</strong> nació en Murcia con una misión clara: acercar la tecnología eléctrica de calidad a hogares y empresas de la región. Hoy, más de 500 instalaciones después, seguimos apostando por la innovación, la seguridad y el trato cercano en cada proyecto.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Trabajamos bajo tres pilares que nunca negociamos:{' '}
              <span className="text-emerald-600 font-medium">profesionalidad, eficiencia y confianza</span>. Porque una buena instalación no solo tiene que funcionar: tiene que durar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-8 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                <div className="text-5xl md:text-6xl font-display font-bold text-emerald-600 tabular-nums">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-[0.15em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
