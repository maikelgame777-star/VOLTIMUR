import { motion } from 'motion/react';
import { Zap, Wifi, Shield, Sun, Wrench, Home, BatteryCharging } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: "Instalaciones Eléctricas",
    description: "Diseño e instalación de sistemas eléctricos para viviendas, locales e industrias. Trabajamos con certificación oficial y cumplimos toda la normativa vigente."
  },
  {
    icon: Wifi,
    title: "Telecomunicaciones",
    description: "Redes de datos, fibra óptica, sistemas telefónicos y conectividad empresarial. Tu negocio, siempre conectado y a máximo rendimiento."
  },
  {
    icon: Shield,
    title: "Sistemas de Seguridad",
    description: "CCTV, alarmas inteligentes y control de accesos para proteger lo que más importa: tu hogar y tu negocio, las 24 horas."
  },
  {
    icon: Sun,
    title: "Energía Solar",
    description: "Instalación de paneles fotovoltaicos y sistemas de autoconsumo. Reduce tu factura eléctrica y contribuye a un futuro más sostenible."
  },
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Mantenimiento preventivo y correctivo para instalaciones eléctricas. Evita averías, alarga la vida de tus equipos y garantiza la seguridad."
  },
  {
    icon: Home,
    title: "Domótica",
    description: "Hogares y edificios inteligentes que se adaptan a ti. Controla la iluminación, climatización y seguridad desde tu móvil con un solo toque."
  },
  {
    icon: BatteryCharging,
    title: "Puntos de Recarga",
    description: "Instalación y legalización de cargadores para vehículos eléctricos en domicilios, parkings y empresas. Todo incluido, sin complicaciones."
  }
];

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
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, backgroundColor: "#f0fdf4" }}
              className="p-10 border-r border-b border-gray-200 border-dashed group transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base mt-auto">
                {service.description}
              </p>
            </motion.div>
          ))}
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
          <div className="hidden lg:block p-10 border-r border-b border-gray-200 border-dashed bg-gray-50/30"></div>
        </div>
      </div>
    </section>
  );
}
