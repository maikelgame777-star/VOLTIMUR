import { useState } from 'react';
import { motion } from 'motion/react';

type Brand = {
  name: string;
  domain: string;
};

const brands: Brand[] = [
  { name: 'Schneider Electric', domain: 'se.com' },
  { name: 'Simon', domain: 'simon.es' },
  { name: 'General Cable', domain: 'generalcable.com' },
  { name: 'Prysmian', domain: 'prysmiangroup.com' },
  { name: 'Circutor', domain: 'circutor.com' },
  { name: 'V2C', domain: 'v2c.tech' },
  { name: 'Wallbox', domain: 'wallbox.com' },
  { name: 'Legrand', domain: 'legrand.com' },
  { name: 'Fronius', domain: 'fronius.com' },
  { name: 'Huawei', domain: 'huawei.com' },
  { name: 'Victron', domain: 'victronenergy.com' },
  { name: 'Salicru', domain: 'salicru.com' },
  { name: 'Pramac', domain: 'pramac.com' },
  { name: 'Himoinsa', domain: 'himoinsa.com' },
];

function BrandLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  const src = `https://logo.clearbit.com/${brand.domain}?size=128`;

  return (
    <div
      className="flex items-center justify-center h-20 px-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      title={brand.name}
    >
      {!failed ? (
        <img
          src={src}
          alt={`Logo ${brand.name}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="max-h-10 max-w-[140px] w-auto object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-display font-semibold text-sm md:text-base text-gray-500 tracking-tight text-center">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default function Brands() {
  return (
    <section id="brands" className="py-24 bg-white border-t border-gray-200 border-dashed">
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
            Material e infraestructura de fabricantes de referencia para instalaciones eléctricas, solar, recarga y energía de respaldo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-2 gap-x-2"
        >
          {brands.map((brand) => (
            <BrandLogo key={brand.name} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
