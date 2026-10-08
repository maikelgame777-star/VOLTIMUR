import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "¿Cuánto cuesta instalar un cargador de coche eléctrico en Murcia?",
    a: "El precio depende del tipo de cargador, la distancia al cuadro y si hace falta refuerzo de potencia. Como instaladores oficiales V2C en Murcia, te enviamos un presupuesto exacto sin compromiso, con legalización y boletín eléctrico incluidos. También instalamos Wallbox, Schneider, Orbis Viaris, Policharger y Circutor."
  },
  {
    q: "¿Sois instaladores de cargadores de coche eléctrico en Murcia?",
    a: "Sí. Somos instaladores oficiales V2C y también instalamos otras marcas (Wallbox, Schneider, Orbis Viaris, Policharger, Circutor eHome/eNext). Legalizamos la instalación en viviendas, garajes comunitarios y empresas de Murcia, Cartagena, Molina de Segura y el resto de la Región."
  },
  {
    q: "¿Cuánto tarda la instalación de un wallbox o punto de recarga?",
    a: "En la mayoría de viviendas y plazas de garaje, la instalación de un cargador de coche eléctrico se completa en un día. Si hay que reforzar la instalación o tramitar aumentos de potencia, te indicamos el plazo en el presupuesto."
  },
  {
    q: "¿Podéis instalar el cargador en un garaje comunitario?",
    a: "Sí. Asesoramos sobre la normativa de comunidades, la potencia disponible y, si conviene, la gestión de carga dinámica (SPL) para compartir potencia entre vecinos sin disparar la factura ni saturar el cuadro."
  },
  {
    q: "¿Hacéis presupuestos sin compromiso?",
    a: "Sí. Todos los presupuestos son gratuitos y sin obligación. Contáctanos y recibirás una propuesta personalizada en menos de 24 horas para tu cargador o instalación eléctrica en Murcia."
  },
  {
    q: "¿Trabajáis con particulares y también con empresas?",
    a: "Trabajamos con particulares, comunidades de propietarios, pymes, locales comerciales e instalaciones industriales en toda la Región de Murcia."
  },
  {
    q: "¿Estáis certificados como instaladores autorizados?",
    a: "Sí. Somos instaladores autorizados registrados en la Consejería de Empresa, Industria y Portavocía de la Región de Murcia. Todas nuestras instalaciones incluyen boletín eléctrico oficial y cumplen la normativa vigente."
  },
  {
    q: "¿Necesito permisos para instalar paneles solares?",
    a: "Nos encargamos de la tramitación: licencias municipales, legalización ante la distribuidora y alta en el Registro de Autoconsumo. Tú solo disfrutas del ahorro."
  },
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
            Dudas sobre cargadores e instalaciones en Murcia
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-xl mx-auto">
            Respuestas claras sobre wallbox, legalización y servicios eléctricos en la Región de Murcia.
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
