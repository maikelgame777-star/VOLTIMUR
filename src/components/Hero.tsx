import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import HeroVideoBackdrop from './HeroVideoBackdrop';

const line1 = ['Electricista', 'en', 'Murcia'];
const line2 = ['Instalaciones', 'y', 'puntos', 'de', 'recarga'];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#0d1117] pt-32 pb-32">
      <HeroVideoBackdrop />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/35 backdrop-blur-md border border-emerald-400/25 text-emerald-300 text-sm font-medium tracking-wide mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Instaladores certificados · Región de Murcia
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1] [text-shadow:0_8px_40px_rgba(0,0,0,0.55)]">
          <span className="block">
            {line1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 animated-gradient">
            {line2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.72 + i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="text-base md:text-lg text-emerald-300/90 font-medium tracking-wide mb-4"
        >
          Sistemas eléctricos y automáticos
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="text-lg md:text-xl text-gray-200/90 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Más de 25 años de experiencia en infraestructuras y mantenimiento eléctricos, inspecciones técnicas periódicas según REBT.
          Instalaciones de infraestructura de recarga de coche eléctrico: oficial V2C y otros fabricantes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_24px_rgba(16,185,129,0.45)] hover:shadow-[0_0_36px_rgba(16,185,129,0.65)]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar presupuesto gratis
          </button>
          <a
            href="/cargador-coche-electrico-murcia/"
            className="w-full sm:w-auto px-8 py-4 bg-black/30 hover:bg-black/45 border border-white/15 backdrop-blur-md text-white rounded-lg font-medium transition-colors text-center"
          >
            Cargadores eléctricos
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-400 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Descubrir</span>
        <ChevronDown size={18} className="opacity-70" />
      </motion.div>
    </section>
  );
}
