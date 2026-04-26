import { motion } from 'motion/react';
import { Zap, Wifi, Shield, Sun, Wrench, Home, BatteryCharging, Activity } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: "Instalaciones Eléctricas",
    description: "Diseño e instalación de sistemas eléctricos para uso residencial, comercial e industrial. Certificación oficial y cumplimiento íntegro del Reglamento Electrotécnico de Baja Tensión (REBT)."
  },
  {
    icon: Wifi,
    title: "Telecomunicaciones",
    description: "Redes de datos, sistemas telefónicos y conectividad empresarial. Tu negocio, siempre conectado y a máximo rendimiento."
  },
  {
    icon: Shield,
    title: "Sistemas de Seguridad",
    description: "CCTV, alarmas inteligentes y control de accesos para proteger lo que más importa: tu hogar y tu negocio, las 24 horas."
  },
  {
    icon: Sun,
    title: "Energía Solar",
    description: "Instalación de paneles fotovoltaicos, sistemas de autoconsumo, funcionamiento en modo isla y baterías de respaldo. Reduce tu factura eléctrica y autogestiona tu energía desde la app móvil."
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Mantenimiento preventivo y correctivo de instalaciones eléctricas. Minimiza el riesgo de averías, prolonga la vida útil de los equipos y garantiza el cumplimiento normativo."
  },
  {
    icon: Home,
    title: "Domótica",
    description: "Automatización de viviendas y edificios mediante sistemas KNX, Zigbee y Z-Wave. Gestión centralizada de iluminación, climatización y seguridad desde dispositivo móvil."
  },
  {
    icon: BatteryCharging,
    title: "Puntos de Recarga",
    description: "Instalación y legalización de puntos de recarga para vehículos eléctricos en viviendas, aparcamientos y empresas. Gestión completa del trámite administrativo y boletín eléctrico incluido."
  },
  {
    icon: Activity,
    title: "Análisis de Redes Eléctricas",
    description: "Diagnóstico avanzado de instalaciones mediante analizadores de redes multifunción: detección de armónicos (THD), desequilibrios de fases, perturbaciones transitorias y corrección del factor de potencia. Implantamos baterías de condensadores, filtros activos y sistemas de gestión y control para optimizar el consumo energético, reducir penalizaciones en la factura eléctrica y prolongar la vida útil de los equipos."
  }
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 md:p-10 border-r border-b border-gray-200 border-dashed group hover:bg-emerald-50/50 transition-colors duration-300 cursor-pointer relative overflow-hidden flex flex-col"
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
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-auto">
                {service.description}
              </p>
            </TiltCard>
          ))}
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
        </div>
      </div>
    </section>
  );
}
