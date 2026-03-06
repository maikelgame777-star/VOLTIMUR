import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "¿Hacéis presupuestos sin compromiso?",
    a: "Sí, absolutamente. Todos nuestros presupuestos son gratuitos y sin ninguna obligación. Contáctanos y recibirás una propuesta detallada y personalizada en menos de 24 horas."
  },
  {
    q: "¿Trabajáis con particulares y también con empresas?",
    a: "Trabajamos con todo tipo de clientes: particulares, comunidades de propietarios, pequeñas y medianas empresas, locales comerciales e instalaciones industriales. Adaptamos cada solución a tus necesidades."
  },
  {
    q: "¿Cuánto tarda una instalación eléctrica doméstica?",
    a: "Depende de la complejidad del proyecto. Una instalación estándar en vivienda se completa habitualmente en 1 o 2 días. Para proyectos mayores, te indicamos el plazo exacto en el presupuesto."
  },
  {
    q: "¿Necesito permisos para instalar paneles solares?",
    a: "Nos encargamos de toda la tramitación administrativa: licencias municipales, legalización ante la distribuidora y alta en el Registro de Autoconsumo. Tú solo tienes que disfrutar del ahorro."
  },
  {
    q: "¿Cuánto cuesta instalar un punto de recarga para coche eléctrico?",
    a: "El precio depende del tipo de cargador y de la instalación existente. Una instalación monofásica doméstica comienza desde 400€, incluyendo el boletín de legalización. Te enviamos un presupuesto exacto sin compromiso."
  },
  {
    q: "¿Estáis certificados como instaladores autorizados?",
    a: "Sí. Somos instaladores autorizados registrados en la Consejería de Empresa, Industria y Portavocía de la Región de Murcia. Todas nuestras instalaciones incluyen boletín eléctrico oficial y cumplen la normativa vigente."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">Preguntas frecuentes</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 mb-6">
            Resolvemos tus dudas
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-xl mx-auto">
            Antes de llamar, aquí tienes respuesta a las preguntas más habituales.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-base md:text-lg pr-4">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open === i
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                }`}>
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-gray-500 leading-relaxed font-light border-t border-gray-100 pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
