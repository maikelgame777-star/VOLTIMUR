import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1117] border-t border-white/5 pt-16 pb-8 text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="font-display font-bold text-2xl text-white tracking-tight mb-4">
              Voltimur<span className="text-emerald-500">.</span>
            </div>
            <p className="text-gray-500 leading-relaxed font-light max-w-xs">
              Instalaciones eléctricas y telecomunicaciones de confianza en la Región de Murcia desde hace más de 15 años.
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
              {['Instalaciones Eléctricas', 'Telecomunicaciones', 'Energía Solar', 'Sistemas de Seguridad', 'Domótica', 'Puntos de Recarga'].map(s => (
                <li key={s}>
                  <button
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">Contacto</div>
            <ul className="space-y-3">
              <li><a href="tel:+34660144754" className="hover:text-white transition-colors">660 144 754</a></li>
              <li><a href="mailto:voltimur@outlook.es" className="hover:text-white transition-colors">voltimur@outlook.es</a></li>
              <li className="text-gray-500">Murcia, España</li>
              <li className="text-gray-500">Lun–Vie: 8:00–18:00</li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {year} Voltimur. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
