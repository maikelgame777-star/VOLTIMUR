import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Zap, Wifi, Shield, Sun, Wrench, Home, BatteryCharging, Activity } from 'lucide-react';

type Service = {
  icon: typeof Zap;
  title: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
  badgeAlt?: string;
};

const services: Service[] = [
  {
    icon: Zap,
    title: 'Instalaciones Eléctricas',
    description:
      'Diseño e instalación de sistemas eléctricos residenciales, comerciales e industriales: cuadros de protección, SAI, canalizaciones y legalización conforme al REBT.',
    image: '/images/electrico.jpg',
    alt: 'Instalación eléctrica real de Voltimur en Murcia',
  },
  {
    icon: Wifi,
    title: 'Telecomunicaciones',
    description:
      'Redes de datos, sistemas telefónicos y conectividad empresarial. Tu negocio, siempre conectado y a máximo rendimiento.',
    image: '/images/telecom.jpg',
    alt: 'Infraestructura de telecomunicaciones y redes de datos',
  },
  {
    icon: Shield,
    title: 'Sistemas de Seguridad',
    description:
      'CCTV, alarmas inteligentes y control de accesos para proteger lo que más importa: tu hogar y tu negocio, las 24 horas.',
    image: '/images/seguridad.jpg',
    alt: 'Cámaras de seguridad CCTV instaladas',
  },
  {
    icon: Sun,
    title: 'Energía Solar',
    description:
      'Instalación de paneles fotovoltaicos, sistemas de autoconsumo, funcionamiento en modo isla y baterías de respaldo. Reduce tu factura eléctrica y autogestiona tu energía desde la app móvil.',
    image: '/images/solar.jpg',
    alt: 'Instalación de paneles solares fotovoltaicos',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento',
    description:
      'Mantenimiento preventivo y correctivo de instalaciones eléctricas. Minimiza el riesgo de averías, prolonga la vida útil de los equipos y garantiza el cumplimiento normativo.',
    image: '/images/mantenimiento.jpg',
    alt: 'Mantenimiento real de cuadro eléctrico con EPI por Voltimur en Murcia',
  },
  {
    icon: Home,
    title: 'Domótica',
    description:
      'Automatización de viviendas y edificios mediante sistemas KNX, Zigbee y Z-Wave. Gestión centralizada de iluminación, climatización y seguridad desde dispositivo móvil.',
    image: '/images/domotica.jpg',
    alt: 'Sistema de domótica y control inteligente del hogar',
  },
  {
    icon: BatteryCharging,
    title: 'Cargadores de Coche Eléctrico',
    description:
      'Instalación y legalización de puntos de recarga en viviendas, garajes y empresas. Instaladores oficiales V2C y otras marcas (Wallbox, Schneider, Orbis, Policharger, Circutor). Gestión de carga dinámica y boletín eléctrico.',
    image: '/images/recarga.jpg',
    alt: 'Instalación real de cargador V2C en Murcia por Voltimur',
    badge: '/brands/v2c-oficial.svg',
    badgeAlt: 'Certificación instalador oficial V2C',
  },
  {
    icon: Activity,
    title: 'Análisis de Redes Eléctricas',
    description:
      'Diagnóstico industrial y comercial: armónicos (THD), desequilibrios, fallas eléctricas y corrección del factor de potencia. Baterías de condensadores, protecciones SAI y sistemas de medida.',
    image: '/images/analisis.jpg',
    alt: 'Gestión y control de banco de condensadores de potencia instalado por Voltimur',
  },
];

function TiltCard({ children, index }: { children: ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-r border-b border-gray-200 border-dashed group hover:bg-emerald-50/50 transition-colors duration-300 cursor-pointer relative overflow-hidden flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:w-2/3"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">Servicios</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
            Todo lo que necesitas, en un solo equipo
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            Desde una instalación eléctrica hasta solar, seguridad o un cargador de coche eléctrico. Soluciones a medida en la Región de Murcia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200 border-dashed">
          {services.map((service, index) => (
            <TiltCard key={index} index={index}>
              <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {service.badge && (
                  <div className="absolute bottom-3 right-3 left-3 sm:left-auto sm:max-w-[200px]">
                    <img
                      src={service.badge}
                      alt={service.badgeAlt || ''}
                      loading="lazy"
                      className="w-full h-auto rounded-lg shadow-lg border border-white/40 bg-white/95"
                    />
                  </div>
                )}
              </div>
              <div className="p-6 md:p-10 flex flex-col flex-1">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-900">{service.title}</h3>
                {service.badge && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-3">
                    Instalador oficial V2C
                  </p>
                )}
                <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-auto">{service.description}</p>
              </div>
            </TiltCard>
          ))}
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
        </div>

        {/* Certificación V2C + otras marcas (bloque compacto) */}
        <motion.div
          id="cargadores"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <div
              id="v2c"
              className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a0a0a] via-[#2a1010] to-[#3d1510] border border-orange-500/20"
            >
              <div className="flex-1">
                <div className="text-orange-400 font-semibold tracking-wider uppercase text-xs mb-2">
                  Certificación de marca
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 tracking-tight">
                  Instaladores oficiales V2C
                </h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed mb-4">
                  Instalamos y legalizamos cargadores V2C con garantía de fabricante en Murcia.
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Presupuesto V2C
                </button>
              </div>
              <div className="w-full sm:w-40 shrink-0 rounded-xl bg-white p-2">
                <img
                  src="/brands/v2c-oficial.svg"
                  alt="Sello Official installer V2C"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-3xl border border-gray-200 bg-gray-50/80">
              <div className="text-emerald-600 font-semibold tracking-wider uppercase text-xs mb-2">
                Otras marcas
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-2 tracking-tight">
                También instalamos
              </h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-5">
                Wallbox, Schneider, Orbis Viaris, Policharger y Circutor eHome/eNext según el proyecto.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Wallbox', file: 'wallbox.svg' },
                  { name: 'Schneider', file: 'schneider.svg' },
                  { name: 'Orbis Viaris', file: 'orbis.svg' },
                  { name: 'Policharger', file: 'policharger.svg' },
                  { name: 'Circutor eHome/eNext', file: 'circutor-enext.svg' },
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-4 min-h-[88px]"
                  >
                    <img
                      src={`/brands/${brand.file}`}
                      alt={`Logo ${brand.name}`}
                      loading="lazy"
                      className="h-12 w-full max-w-[140px] object-contain"
                    />
                    <span className="text-[11px] text-gray-500 font-medium text-center leading-tight">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
