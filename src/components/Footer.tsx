import { Instagram, Facebook, Linkedin } from 'lucide-react';
import { GOOGLE_MAPS, GOOGLE_REVIEWS, GOOGLE_SEARCH, PHONE, PHONE_LABEL, EMAIL } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1117] border-t border-white/5 pt-16 pb-8 text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="font-display font-bold text-2xl text-white tracking-tight mb-4">
              Voltimur<span className="text-emerald-500">.</span>
            </div>
            <p className="text-gray-500 leading-relaxed font-light max-w-xs">
              Más de 25 años de experiencia en instalaciones eléctricas y puntos de recarga en la Región de Murcia.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                <Instagram size={17} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                <Facebook size={17} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Servicios</div>
            <ul className="space-y-3">
              {[
                { label: 'Instalaciones Eléctricas', href: '/#services' },
                { label: 'Telecomunicaciones', href: '/#services' },
                { label: 'Energía Solar', href: '/#services' },
                { label: 'Sistemas de Seguridad', href: '/#services' },
                { label: 'Domótica', href: '/#services' },
                { label: 'Cargadores Coche Eléctrico', href: '/cargador-coche-electrico-murcia/' },
                { label: 'Análisis de Redes Eléctricas', href: '/#services' },
                { label: 'Zona técnica', href: '/#docs' },
              ].map(s => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-white transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Guías recarga</div>
            <ul className="space-y-3">
              {[
                { label: 'Instalar cargador en Murcia', href: '/cargador-coche-electrico-murcia/' },
                { label: 'Precio de la instalación', href: '/precio-instalacion-cargador-murcia/' },
                { label: 'Garaje comunitario', href: '/cargador-garaje-comunitario-murcia/' },
                { label: 'IRPF y ayudas', href: '/ayudas-irpf-punto-recarga-murcia/' },
                { label: 'Legalización ITC-BT-52', href: '/legalizacion-punto-recarga-itc-bt-52/' },
              ].map(s => (
                <li key={s.href}>
                  <a href={s.href} className="hover:text-white transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Contacto</div>
            <ul className="space-y-3">
              <li><a href={`tel:${PHONE}`} className="hover:text-white transition-colors">{PHONE_LABEL}</a></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a></li>
              <li className="text-gray-500">C/ del Sol 24, Torreagüera<br />30579 Murcia</li>
              <li className="text-gray-500">Lun–Vie: 8:00–18:00</li>
              <li><a href={GOOGLE_MAPS} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ficha en Google Maps</a></li>
              <li><a href={GOOGLE_SEARCH} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ficha de Voltimur en Google</a></li>
              <li><a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Reseñas en Google</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {year} Voltimur. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="/aviso-legal/" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="/privacidad/" className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
