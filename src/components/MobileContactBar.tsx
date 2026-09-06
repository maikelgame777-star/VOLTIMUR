import { Phone } from 'lucide-react';

const PHONE = '+34660144754';
const PHONE_LABEL = '660 144 754';
const WHATSAPP = 'https://wa.me/34660144754';

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.057 23.486a.5.5 0 0 0 .608.61l5.788-1.515A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.006-1.368l-.36-.214-3.722.975.993-3.62-.235-.373A9.77 9.77 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

/** Barra fija móvil: Llamar + WhatsApp */
export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom">
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 p-2 rounded-2xl bg-[#0d1117]/95 backdrop-blur-md border border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
        <a
          href={`tel:${PHONE}`}
          aria-label={`Llamar a ${PHONE_LABEL}`}
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-sm font-semibold transition-colors"
        >
          <Phone size={18} strokeWidth={2.25} />
          Llamar
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20b858] active:bg-[#1da851] text-white text-sm font-semibold transition-colors"
        >
          <WhatsAppIcon size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

/** Botón flotante WhatsApp solo en desktop */
export function DesktopWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="hidden md:flex fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full items-center justify-center transition-all duration-300 hover:scale-110"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
      <span className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20b858] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-colors duration-300 text-white">
        <WhatsAppIcon size={28} />
      </span>
    </a>
  );
}
