import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';

const COUNTRIES = [
  { code: 'ES', prefix: '+34', flag: '🇪🇸', name: 'España' },
  { code: 'FR', prefix: '+33', flag: '🇫🇷', name: 'Francia' },
  { code: 'DE', prefix: '+49', flag: '🇩🇪', name: 'Alemania' },
  { code: 'IT', prefix: '+39', flag: '🇮🇹', name: 'Italia' },
  { code: 'PT', prefix: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'GB', prefix: '+44', flag: '🇬🇧', name: 'Reino Unido' },
  { code: 'NL', prefix: '+31', flag: '🇳🇱', name: 'Países Bajos' },
  { code: 'BE', prefix: '+32', flag: '🇧🇪', name: 'Bélgica' },
  { code: 'CH', prefix: '+41', flag: '🇨🇭', name: 'Suiza' },
  { code: 'AT', prefix: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: 'PL', prefix: '+48', flag: '🇵🇱', name: 'Polonia' },
  { code: 'RO', prefix: '+40', flag: '🇷🇴', name: 'Rumanía' },
  { code: 'MX', prefix: '+52', flag: '🇲🇽', name: 'México' },
  { code: 'AR', prefix: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CO', prefix: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'VE', prefix: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: 'PE', prefix: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: 'CL', prefix: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'EC', prefix: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'BO', prefix: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: 'MA', prefix: '+212', flag: '🇲🇦', name: 'Marruecos' },
  { code: 'US', prefix: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
];

function detectCountry(): string {
  const lang = navigator.language || 'es';
  const region = lang.split('-')[1]?.toUpperCase() || lang.toUpperCase();
  const found = COUNTRIES.find(c => c.code === region);
  return found ? found.code : 'ES';
}

function PhoneField({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [countryCode, setCountryCode] = useState('ES');
  const [number, setNumber] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCountryCode(detectCountry());
  }, []);

  useEffect(() => {
    const country = COUNTRIES.find(c => c.code === countryCode)!;
    onChange(number ? `${country.prefix} ${number}` : '');
  }, [countryCode, number]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = COUNTRIES.find(c => c.code === countryCode)!;

  return (
    <div className="flex flex-row gap-2 w-full min-w-0" ref={ref}>
      {/* Country selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 bg-[#0d1117] border border-white/10 rounded-xl px-3 py-4 text-white focus:outline-none focus:border-emerald-500 hover:border-white/20 transition-all whitespace-nowrap"
        >
          <span className="text-lg">{selected.flag}</span>
          <span className="text-sm text-gray-300">{selected.prefix}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 w-52 bg-[#161b22] border border-white/10 rounded-xl overflow-auto z-50 shadow-xl max-h-60">
            {COUNTRIES.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => { setCountryCode(c.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-left ${c.code === countryCode ? 'text-emerald-400' : 'text-gray-300'}`}
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.name}</span>
                <span className="ml-auto text-gray-500">{c.prefix}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Number input */}
      <input
        type="tel"
        value={number}
        onChange={e => setNumber(e.target.value)}
        placeholder="600 000 000"
        className="w-full flex-1 min-w-0 bg-[#0d1117] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', servicio: 'Instalación Eléctrica', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      setStatus('success');
      setForm({ nombre: '', telefono: '', email: '', servicio: 'Instalación Eléctrica', mensaje: '' });
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-[#0d1117] text-white relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="text-emerald-500 font-semibold tracking-[0.2em] uppercase text-sm mb-6">Contacto</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              Hablemos de tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 animated-gradient">
                proyecto
              </span>
            </h2>
            <p className="text-gray-400 text-xl mb-16 max-w-md font-light leading-relaxed">
              Cuéntanos qué necesitas y te enviamos un presupuesto personalizado y gratuito. Sin compromiso, sin rodeos.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Phone, label: 'Teléfono', content: <a href="tel:+34660144754" className="font-medium text-lg text-gray-200 hover:text-emerald-400 transition-colors">660 144 754</a> },
                { icon: Mail, label: 'Email', content: <a href="mailto:voltimur@voltimur.com" className="font-medium text-base text-gray-200 hover:text-emerald-400 transition-colors break-all">voltimur@voltimur.com</a> },
                { icon: MapPin, label: 'Ubicación', content: <div className="font-medium text-lg text-gray-200">Murcia, España</div> },
                { icon: Clock, label: 'Horario', content: <div className="font-medium text-lg text-gray-200">Lun–Vie: 8:00–18:00</div> },
              ].map(({ icon: Icon, label, content }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  className="p-5 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-125 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-300">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-medium uppercase tracking-wider">{label}</div>
                  {content}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-[#161b22] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre"
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Teléfono</label>
                <PhoneField
                  value={form.telefono}
                  onChange={val => setForm(prev => ({ ...prev, telefono: val }))}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com"
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Servicio</label>
                <div className="relative">
                  <select name="servicio" value={form.servicio} onChange={handleChange}
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer">
                    <option>Instalación Eléctrica</option>
                    <option>Telecomunicaciones</option>
                    <option>Sistemas de Seguridad</option>
                    <option>Energía Solar</option>
                    <option>Mantenimiento</option>
                    <option>Domótica</option>
                    <option>Puntos de Recarga</option>
                    <option>Análisis de Redes Eléctricas</option>
                    <option>Otro</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Mensaje</label>
                <textarea name="mensaje" value={form.mensaje} onChange={handleChange} required rows={4} placeholder="Cuéntanos tu proyecto..."
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"></textarea>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                  Mensaje enviado correctamente. Te contactaremos pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center text-sm">
                  {errorMsg || 'Error al enviar el mensaje. Inténtalo de nuevo.'}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-medium text-lg transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
