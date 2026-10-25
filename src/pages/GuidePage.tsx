import { useEffect } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
import { MobileContactBar, DesktopWhatsApp } from '../components/MobileContactBar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import {
  AEAT_IRPF_ESTATAL,
  AEAT_IRPF_MURCIA,
  chargingGuides,
  otherGuides,
  type ChargingGuide,
} from '../data/chargingGuides';
import { GOOGLE_REVIEWS, GOOGLE_SEARCH } from '../data/site';

const PHONE = '+34681330640';
const PHONE_LABEL = '681 330 640';

type Props = { slug: string };

export default function GuidePage({ slug }: Props) {
  const guide = chargingGuides.find((g) => g.slug === slug) ?? chargingGuides[0];
  const related = otherGuides(guide.slug);

  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-emerald-500/30 font-sans pb-24 md:pb-0">
      <div className="grain-overlay" />

      <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="/" className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <Zap size={15} className="text-emerald-400" fill="currentColor" />
            </span>
            Voltimur<span className="text-emerald-500">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a href="/cargador-coche-electrico-murcia/" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft size={14} /> Cargadores
            </a>
            <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
          </nav>
          <a
            href={`tel:${PHONE}`}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {PHONE_LABEL}
          </a>
        </div>
      </header>

      <article className="bg-white text-gray-900">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-8">
          <p className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Guía · Recarga en Murcia
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight">
            {guide.h1}
          </h1>
          <p className="text-lg text-gray-500 font-light leading-relaxed">{guide.lead}</p>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-16 space-y-12">
          {guide.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">{section.h2}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-gray-600 font-light leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-2 text-gray-600 font-light">
                  {section.list.map((item) => (
                    <li key={item} className="pl-4 border-l-2 border-emerald-200">{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {guide.slug === 'ayudas-irpf-punto-recarga-murcia' && (
            <p className="flex flex-col gap-2">
              <a
                href={AEAT_IRPF_MURCIA}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-medium"
              >
                Ficha autonómica Murcia (Agencia Tributaria)
              </a>
              <a
                href={AEAT_IRPF_ESTATAL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-medium"
              >
                Deducción estatal por punto de recarga (Agencia Tributaria)
              </a>
            </p>
          )}

          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <Related guides={related} />

          <div className="rounded-3xl bg-[#0d1117] text-white p-8 text-center">
            <h2 className="text-2xl font-display font-bold mb-3">¿Quieres presupuesto en Murcia?</h2>
            <p className="text-gray-400 font-light mb-6">
              Instaladores oficiales V2C. Legalización incluida. Respuesta en 24 h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="#contact" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium">
                Formulario de presupuesto
              </a>
              <a href="/cargador-coche-electrico-murcia/" className="px-8 py-4 bg-white/10 hover:bg-white/15 rounded-lg font-medium">
                Ver instalación de cargadores
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              <a href={GOOGLE_SEARCH} className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Ficha en Google</a>
              {' · '}
              <a href={GOOGLE_REVIEWS} className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Reseñas</a>
            </p>
          </div>
        </div>
      </article>

      <Contact defaultServicio="Cargador coche eléctrico" />
      <Footer />
      <MobileContactBar />
      <DesktopWhatsApp />
    </div>
  );
}

function Related({ guides }: { guides: ChargingGuide[] }) {
  return (
    <section>
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Otras guías</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <a
              href={g.path}
              className="block rounded-2xl border border-gray-200 p-5 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
            >
              <span className="font-semibold text-gray-900">{g.h1}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="/cargador-coche-electrico-murcia/"
            className="block rounded-2xl border border-gray-200 p-5 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors"
          >
            <span className="font-semibold text-gray-900">Instalación de cargador en Murcia</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
