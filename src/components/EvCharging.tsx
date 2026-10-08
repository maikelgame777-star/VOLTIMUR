import { motion } from 'motion/react';
import { BatteryCharging, FileCheck, MapPin, Wrench } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'Visita técnica en Murcia',
    text: 'Revisamos tu plaza de garaje, potencia contratada y cuadro eléctrico para dimensionar el punto de recarga sin sorpresas.',
  },
  {
    icon: BatteryCharging,
    title: 'Elección del cargador',
    text: 'Te asesoramos entre V2C (instalador oficial) y otras marcas como Wallbox, Schneider, Orbis Viaris, Policharger o Circutor.',
  },
  {
    icon: Wrench,
    title: 'Instalación profesional',
    text: 'Montaje, cableado, protecciones y, si aplica, gestión de carga dinámica (SPL) para no superar la potencia de tu vivienda o comunidad.',
  },
  {
    icon: FileCheck,
    title: 'Legalización y boletín',
    text: 'Tramitamos la documentación y el boletín eléctrico para que tu cargador quede legalizado en la Región de Murcia.',
  },
];

const towns = [
  'Murcia',
  'Cartagena',
  'Molina de Segura',
  'Alcantarilla',
  'Lorca',
  'Cieza',
  'Yecla',
  'Totana',
  'Mazarrón',
  'San Javier',
  'Torre-Pacheco',
  'Águilas',
];

export default function EvCharging() {
  return (
    <section id="cargadores" className="py-24 md:py-32 bg-white text-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Infraestructura de recarga
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">
            Instalar cargador de coche eléctrico en Murcia
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            En Voltimur instalamos y legalizamos puntos de recarga para vehículo eléctrico en viviendas, garajes comunitarios y empresas de Murcia y toda la Región.
            Presupuesto claro, instalación certificada e instaladores oficiales V2C.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-16 md:mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <step.icon size={24} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                Paso {i + 1}
              </p>
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gray-50 border border-gray-100 p-6 md:p-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3 tracking-tight">
                Cobertura local en la Región de Murcia
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-6">
                Instalamos wallbox y puntos de recarga en Murcia capital y municipios cercanos.
                Ideal si buscas un instalador de cargador de coche eléctrico cerca de ti, con legalización incluida.
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                {towns.map((town) => (
                  <li key={town} className="before:content-['·'] before:mr-2 before:text-emerald-500 first:before:content-none first:before:mr-0">
                    {town}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Presupuesto de cargador
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('v2c')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors"
              >
                Ver certificación V2C
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
