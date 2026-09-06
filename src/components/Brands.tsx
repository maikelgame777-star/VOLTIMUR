import { motion } from 'motion/react';

type Brand = {
  name: string;
  file: string;
};

const brands: Brand[] = [
  { name: 'Schneider Electric', file: 'schneider.svg' },
  { name: 'Simon', file: 'simon.svg' },
  { name: 'General Cable', file: 'general-cable.svg' },
  { name: 'Prysmian', file: 'prysmian.svg' },
  { name: 'Circutor', file: 'circutor.svg' },
  { name: 'V2C', file: 'v2c.svg' },
  { name: 'Wallbox', file: 'wallbox.svg' },
  { name: 'Legrand', file: 'legrand.svg' },
  { name: 'Fronius', file: 'fronius.svg' },
  { name: 'Huawei', file: 'huawei.svg' },
  { name: 'Victron', file: 'victron.svg' },
  { name: 'Salicru', file: 'salicru.svg' },
  { name: 'Pramac', file: 'pramac.svg' },
  { name: 'Himoinsa', file: 'himoinsa.svg' },
  { name: 'Philips', file: 'philips.svg' },
  { name: 'Osram', file: 'osram.svg' },
];

export default function Brands() {
  return (
    <section id="brands" className="py-24 bg-gray-50 border-t border-gray-200 border-dashed">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Proveedores
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-gray-900 mb-4">
            Trabajamos con primeras marcas
          </h2>
          <p className="text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Material e infraestructura de fabricantes de referencia para electricidad, iluminación, solar, recarga y energía de respaldo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="group rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-[0_12px_32px_rgba(16,185,129,0.12)] hover:border-emerald-200 transition-all duration-300"
            >
              <img
                src={`/brands/${brand.file}`}
                alt={`Logo ${brand.name}`}
                loading="lazy"
                className="w-full h-[76px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
