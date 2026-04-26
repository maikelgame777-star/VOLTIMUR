import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';


const line1 = ['Soluciones', 'en', 'electricidad'];
const line2 = ['y', 'telecomunicaciones'];

const PARTICLES = [
  { x: 10, y: 22, size: 5, dur: 7,  delay: 0,   color: 'emerald' },
  { x: 88, y: 16, size: 4, dur: 9,  delay: 1.5, color: 'amber'   },
  { x: 24, y: 70, size: 4, dur: 11, delay: 0.8, color: 'emerald' },
  { x: 76, y: 58, size: 6, dur: 8,  delay: 2,   color: 'emerald' },
  { x: 45, y: 83, size: 3, dur: 10, delay: 0.3, color: 'amber'   },
  { x: 63, y: 32, size: 5, dur: 12, delay: 1.2, color: 'emerald' },
  { x: 18, y: 48, size: 4, dur: 9,  delay: 2.5, color: 'emerald' },
  { x: 91, y: 73, size: 5, dur: 8,  delay: 0.7, color: 'amber'   },
  { x: 55, y: 12, size: 3, dur: 13, delay: 1.8, color: 'emerald' },
  { x: 35, y: 40, size: 4, dur: 10, delay: 3,   color: 'emerald' },
  { x: 72, y: 90, size: 5, dur: 7,  delay: 0.5, color: 'amber'   },
  { x:  6, y: 78, size: 3, dur: 11, delay: 1,   color: 'emerald' },
  { x: 50, y: 55, size: 4, dur: 14, delay: 2.2, color: 'amber'   },
  { x: 30, y: 10, size: 3, dur: 9,  delay: 0.9, color: 'emerald' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0d1117] pt-20 pb-32"
    >

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${p.color === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              willChange: 'transform, opacity',
            }}
            animate={{
              y: [0, -18, 4, -10, 0],
              x: [0, 7, -5, 3, 0],
              opacity: [0.25, 0.7, 0.45, 0.65, 0.25],
              scale: [1, 1.3, 0.85, 1.15, 1],
            }}
            transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

        <motion.div
          animate={{ opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-emerald-600/25 rounded-full blur-[80px]"
          style={{ willChange: 'opacity' }}
        />
        <motion.div
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-64 w-[800px] h-[800px] bg-amber-500/15 rounded-full blur-[80px]"
          style={{ willChange: 'opacity' }}
        />

        {/* Grid shimmer */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        {/* Glowing line */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-40" preserveAspectRatio="none">
          <motion.path
            d="M -100,200 C 300,200 400,600 1000,600 C 1400,600 1600,200 2000,200"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="50%" stopColor="rgba(16, 185, 129, 1)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Circuit — bottom right */}
        <svg className="absolute bottom-0 right-0 w-80 h-80 opacity-[0.12] pointer-events-none" viewBox="0 0 320 320">
          <motion.path d="M 320,320 L 320,220 L 260,220 L 260,160 L 200,160 L 200,110 L 150,110" fill="none" stroke="#10b981" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut", delay: 1 }} />
          <motion.path d="M 320,260 L 290,260 L 290,190 L 230,190 L 230,130 L 175,130" fill="none" stroke="#f59e0b" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 1.4 }} />
          <motion.path d="M 320,200 L 270,200 L 270,150 L 220,150 L 220,100" fill="none" stroke="#10b981" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1.8 }} />
          <motion.circle cx="260" cy="220" r="3.5" fill="#10b981" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }} />
          <motion.circle cx="200" cy="160" r="3.5" fill="#10b981" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4 }} />
          <motion.circle cx="230" cy="190" r="2.5" fill="#f59e0b" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2 }} />
          <motion.circle cx="270" cy="150" r="2.5" fill="#10b981" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.7 }} />
        </svg>

        {/* Circuit — top left */}
        <svg className="absolute top-20 left-0 w-64 h-64 opacity-[0.08] pointer-events-none" viewBox="0 0 260 260">
          <motion.path d="M 0,130 L 70,130 L 70,80 L 130,80 L 130,40 L 180,40" fill="none" stroke="#10b981" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.6 }} />
          <motion.path d="M 0,170 L 50,170 L 50,110 L 100,110 L 100,65" fill="none" stroke="#10b981" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }} />
          <motion.circle cx="70" cy="130" r="3" fill="#10b981" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
          <motion.circle cx="130" cy="80" r="3" fill="#10b981" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} />
          <motion.circle cx="50" cy="170" r="2.5" fill="#10b981" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-12">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide mb-8"
        >
          Instaladores Certificados · Región de Murcia
        </motion.span>

        {/* Headline — word by word */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-8 leading-[1.1]">
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Más de 25 años de experiencia en soluciones integrales de instalaciones eléctricas y telecomunicaciones, al servicio de hogares y empresas de Murcia con garantía, eficiencia y certificación oficial.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar Presupuesto Gratis
          </button>
          <button
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Servicios
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Descubrir</span>
        <ChevronDown size={18} className="opacity-70" />
      </motion.div>
    </section>
  );
}
