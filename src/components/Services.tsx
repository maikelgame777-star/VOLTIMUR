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
    title: "Instalaciones Eléctricas",
    description: "Diseño e instalación de sistemas eléctricos para uso residencial, comercial e industrial. Certificación oficial y cumplimiento íntegro del Reglamento Electrotécnico de Baja Tensión (REBT).",
    image: "/images/electrico.jpg",
    alt: "Instalación eléctrica profesional con cableado y conexiones"
  },
  {
    icon: Wifi,
    title: "Telecomunicaciones",
    description: "Redes de datos, sistemas telefónicos y conectividad empresarial. Tu negocio, siempre conectado y a máximo rendimiento.",
    image: "/images/telecom.jpg",
    alt: "Infraestructura de telecomunicaciones y redes de datos"
  },
  {
    icon: Shield,
    title: "Sistemas de Seguridad",
    description: "CCTV, alarmas inteligentes y control de accesos para proteger lo que más importa: tu hogar y tu negocio, las 24 horas.",
    image: "/images/seguridad.jpg",
    alt: "Cámaras de seguridad CCTV instaladas"
  },
  {
    icon: Sun,
    title: "Energía Solar",
    description: "Instalación de paneles fotovoltaicos, sistemas de autoconsumo, funcionamiento en modo isla y baterías de respaldo. Reduce tu factura eléctrica y autogestiona tu energía desde la app móvil.",
    image: "/images/solar.jpg",
    alt: "Instalación de paneles solares fotovoltaicos"
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Mantenimiento preventivo y correctivo de instalaciones eléctricas. Minimiza el riesgo de averías, prolonga la vida útil de los equipos y garantiza el cumplimiento normativo.",
    image: "/images/mantenimiento.jpg",
    alt: "Técnico realizando mantenimiento de instalaciones"
  },
  {
    icon: Home,
    title: "Domótica",
    description: "Automatización de viviendas y edificios mediante sistemas KNX, Zigbee y Z-Wave. Gestión centralizada de iluminación, climatización y seguridad desde dispositivo móvil.",
    image: "/images/domotica.jpg",
    alt: "Sistema de domótica y control inteligente del hogar"
  },
  {
    icon: BatteryCharging,
    title: "Puntos de Recarga en Murcia",
    description: "Instaladores oficiales V2C en Murcia. Instalación y legalización de puntos de recarga para coche eléctrico en viviendas, aparcamientos y empresas de la Región de Murcia. Implantamos sistemas de gestión de carga dinámica (SPL) para el control y distribución inteligente de la potencia disponible, evitando disparos de protecciones. Asesoramiento en discriminación horaria y contratación de tarifa óptima para minimizar el coste por kWh en recarga.",
    image: "/images/recarga.jpg",
    alt: "Instalación de punto de recarga para coche eléctrico en Murcia — instaladores oficiales V2C",
    badge: "/brands/v2c-oficial.jpg",
    badgeAlt: "Instalador oficial V2C de cargadores de coche eléctrico"
  },
  {
    icon: Activity,
    title: "Análisis de Redes Eléctricas",
    description: "Diagnóstico avanzado de instalaciones mediante analizadores de redes multifunción: detección de armónicos (THD), desequilibrios de fases, perturbaciones transitorias y corrección del factor de potencia. Implantamos baterías de condensadores, filtros activos y sistemas de gestión y control para optimizar el consumo energético, reducir penalizaciones en la factura eléctrica y prolongar la vida útil de los equipos.",
    image: "/images/analisis.jpg",
    alt: "Análisis e infraestructura de redes eléctricas"
  }
];

function TiltCard({ children, index }: { children: ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
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
            Desde una instalación eléctrica hasta un sistema solar completo. Somos tu aliado tecnológico en Murcia, con soluciones a medida para cada proyecto.
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
                <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-auto">
                  {service.description}
                </p>
              </div>
            </TiltCard>
          ))}
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
        </div>

        {/* Destacado instalador oficial V2C */}
        <motion.div
          id="v2c"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[#1a0a0a] via-[#2a1010] to-[#3d1510] border border-orange-500/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(255,100,50,0.18),_transparent_55%)] pointer-events-none" />
            <div className="relative z-10 flex-1">
              <div className="text-orange-400 font-semibold tracking-wider uppercase text-sm mb-3">
                Movilidad eléctrica
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 tracking-tight">
                Puntos de recarga en Murcia · Instaladores oficiales V2C
              </h3>
              <p className="text-gray-300 font-light leading-relaxed max-w-xl mb-6">
                Instalación y legalización de cargadores para coche eléctrico en Murcia y toda la Región. Certificados por V2C, con gestión de potencia, boletín oficial y puesta en marcha profesional.
              </p>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Solicitar presupuesto de recarga
              </button>
            </div>
            <div className="relative z-10 w-full lg:w-[420px] shrink-0 space-y-4">
              <img
                src="/brands/v2c-oficial-banner.jpg"
                alt="Instalador oficial de cargadores de coche eléctrico V2C"
                loading="lazy"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <img
                src="/brands/v2c-oficial.jpg"
                alt="Sello Official installer V2C"
                loading="lazy"
                className="w-full max-w-xs mx-auto lg:ml-auto h-auto rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
