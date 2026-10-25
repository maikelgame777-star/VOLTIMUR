import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BatteryCharging,
  FileCheck,
  MapPin,
  Wrench,
  Phone,
  Plus,
  Minus,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { MobileContactBar, DesktopWhatsApp } from '../components/MobileContactBar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const PHONE = '+34681330640';
const PHONE_LABEL = '681 330 640';
const WHATSAPP = 'https://wa.me/34681330640?text=Hola%2C%20quiero%20presupuesto%20para%20un%20cargador%20de%20coche%20el%C3%A9ctrico%20en%20Murcia';

const steps = [
  {
    icon: MapPin,
    title: 'Visita técnica en Murcia',
    text: 'Revisamos tu plaza de garaje, la potencia contratada y el cuadro eléctrico para dimensionar el punto de recarga sin sorpresas.',
  },
  {
    icon: BatteryCharging,
    title: 'Elección del cargador',
    text: 'Te asesoramos entre V2C (instalador oficial) y otras marcas como Wallbox, Schneider, Orbis Viaris, Policharger o Circutor.',
  },
  {
    icon: Wrench,
    title: 'Instalación profesional',
    text: 'Montaje, cableado, protecciones y, si aplica, gestión de carga dinámica (SPL) para no saturar la potencia de la vivienda o comunidad.',
  },
  {
    icon: FileCheck,
    title: 'Legalización y boletín',
    text: 'Tramitamos la documentación y el boletín eléctrico para que tu cargador quede legalizado en la Región de Murcia.',
  },
];

const brands = [
  { name: 'V2C (oficial)', file: 'v2c-oficial.svg' },
  { name: 'Wallbox', file: 'wallbox.svg' },
  { name: 'Schneider', file: 'schneider.svg' },
  { name: 'Orbis Viaris', file: 'orbis.svg' },
  { name: 'Policharger', file: 'policharger.svg' },
  { name: 'Circutor', file: 'circutor-enext.svg' },
];

const faqs = [
  {
    q: '¿Cuánto cuesta instalar un cargador de coche eléctrico en Murcia?',
    a: 'Depende del tipo de cargador, la distancia al cuadro y si hace falta refuerzo de potencia. Como instaladores oficiales V2C te enviamos un presupuesto exacto sin compromiso, con legalización incluida.',
  },
  {
    q: '¿Podéis instalarlo en un garaje comunitario?',
    a: 'Sí. Te guiamos con la normativa de comunidades, revisamos la potencia disponible en tu plaza o derivación y, si hace falta, instalamos gestión de carga dinámica (SPL) para que el cargador no sature el cuadro ni dispare el ICP.',
  },
  {
    q: '¿Cuánto tarda la instalación?',
    a: 'En la mayoría de viviendas y plazas de garaje se completa en un día. Si hay refuerzo de instalación o aumento de potencia, te indicamos el plazo en el presupuesto.',
  },
  {
    q: '¿Solo instaláis V2C?',
    a: 'Somos instaladores oficiales V2C y también instalamos Wallbox, Schneider, Orbis Viaris, Policharger y Circutor eHome/eNext según el proyecto.',
  },
];

const towns = [
  'Murcia', 'Cartagena', 'Molina de Segura', 'Alcantarilla', 'Lorca',
  'Cieza', 'Yecla', 'Totana', 'Mazarrón', 'San Javier', 'Torre-Pacheco', 'Águilas',
];

export default function ChargingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-emerald-500/30 font-sans pb-24 md:pb-0">
      <div className="grain-overlay" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Zap size={15} className="text-emerald-400" fill="currentColor" />
            </span>
            Voltimur<span className="text-emerald-500">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a href="/" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={14} /> Inicio
            </a>
            <a href="/#services" className="hover:text-white transition-colors">Servicios</a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              Contacto
            </a>
          </nav>
          <a
            href={`tel:${PHONE}`}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {PHONE_LABEL}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_55%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4">
            Movilidad eléctrica · Región de Murcia
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl">
            Instalación de cargador de coche eléctrico en Murcia
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mb-8">
            Instalamos y legalizamos tu wallbox o punto de recarga en vivienda, garaje comunitario o empresa.
            Instaladores oficiales V2C y otras marcas. Presupuesto gratis en 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
            >
              Pedir presupuesto gratis
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center px-8 py-4 bg-[#25D366] hover:bg-[#20b858] text-white rounded-lg font-medium transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
            >
              <Phone size={18} /> Llamar
            </a>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="bg-white text-gray-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            <figure className="relative overflow-hidden rounded-2xl min-h-[300px] md:min-h-[420px] bg-[#1a1f26]">
              <img
                src="/images/recarga-v2c-obra.jpg"
                alt="Instalación real de cargador V2C en garaje por Voltimur en Murcia"
                className="absolute inset-0 w-full h-full object-contain object-center"
                loading="eager"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0d1117]/90 to-transparent">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Obra real</p>
                <p className="text-white font-medium">Cargador V2C instalado en Murcia</p>
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-2xl min-h-[300px] md:min-h-[420px] bg-[#1a1f26]">
              <img
                src="/images/recarga-proteccion-voltimur.jpg"
                alt="Cuadro de protección de punto de recarga instalado por Voltimur"
                className="absolute inset-0 w-full h-full object-contain object-center"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0d1117]/90 to-transparent">
                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Protecciones</p>
                <p className="text-white font-medium">Cuadro del punto de recarga</p>
              </figcaption>
            </figure>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-10 text-gray-900">
            Cómo instalamos tu punto de recarga
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <step.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Paso {i + 1}</p>
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{step.text}</p>
              </div>
            ))}
          </div>

          {/* V2C + brands */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a0a0a] via-[#2a1010] to-[#3d1510] border border-orange-500/20 text-white">
              <p className="text-orange-400 font-semibold tracking-wider uppercase text-xs mb-2">Certificación de marca</p>
              <h3 className="text-2xl font-display font-bold mb-3">Instaladores oficiales V2C</h3>
              <p className="text-gray-300 font-light text-sm leading-relaxed mb-5">
                Certificados por V2C para instalar y legalizar sus cargadores con garantía de fabricante en Murcia.
              </p>
              <div className="rounded-xl bg-white p-3 max-w-[220px]">
                <img src="/brands/v2c-oficial.svg" alt="Sello instalador oficial V2C" className="w-full h-auto" />
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-3xl border border-gray-200 bg-gray-50">
              <p className="text-emerald-600 font-semibold tracking-wider uppercase text-xs mb-2">Otras marcas</p>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">También instalamos</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-5">
                Wallbox, Schneider, Orbis Viaris, Policharger y Circutor según potencia y uso.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {brands.map((b) => (
                  <div key={b.name} className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-4 min-h-[88px]">
                    <img src={`/brands/${b.file}`} alt={`Logo ${b.name}`} className="h-10 w-full max-w-[120px] object-contain" />
                    <span className="text-[11px] text-gray-500 text-center font-medium">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coverage */}
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10 mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
              Cobertura en la Región de Murcia
            </h2>
            <p className="text-gray-500 font-light mb-6 max-w-2xl">
              Instalamos cargadores en Murcia capital y municipios cercanos. Si buscas un instalador de punto de recarga cerca de ti, estamos a un mensaje.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              {towns.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-gray-900">
            Preguntas frecuentes sobre cargadores
          </h2>
          <div className="space-y-3 mb-16">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${openFaq === i ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 text-gray-500 font-light leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-[#0d1117] text-white p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              ¿Quieres instalar tu cargador en Murcia?
            </h2>
            <p className="text-gray-400 font-light mb-8 max-w-xl mx-auto">
              Cuéntanos tu caso y te enviamos presupuesto claro en 24 h: vivienda, comunidad o empresa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors"
              >
                Formulario de presupuesto
              </a>
              <a href={`tel:${PHONE}`} className="px-8 py-4 bg-white/10 hover:bg-white/15 rounded-lg font-medium transition-colors">
                Llamar al {PHONE_LABEL}
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              <a href="/" className="text-emerald-400 hover:text-emerald-300">Volver a Voltimur</a>
              {' · '}
              Electricista en Murcia · C/ del Sol 24, Torreagüera
            </p>
          </div>
        </div>
      </section>

      <Contact defaultServicio="Cargador coche eléctrico" />
      <Footer />

      <MobileContactBar />
      <DesktopWhatsApp />
    </div>
  );
}
