import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  FileText,
  Zap,
  Wifi,
  Shield,
  Sun,
  Wrench,
  Home,
  BatteryCharging,
  Activity,
  FolderOpen,
} from 'lucide-react';

type ServiceId =
  | 'all'
  | 'electrico'
  | 'telecom'
  | 'seguridad'
  | 'solar'
  | 'mantenimiento'
  | 'domotica'
  | 'recarga'
  | 'analisis';

const filters: { id: ServiceId; label: string; icon: typeof Zap }[] = [
  { id: 'all', label: 'Todos', icon: FolderOpen },
  { id: 'electrico', label: 'Eléctricas', icon: Zap },
  { id: 'telecom', label: 'Telecom', icon: Wifi },
  { id: 'seguridad', label: 'Seguridad', icon: Shield },
  { id: 'solar', label: 'Solar', icon: Sun },
  { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
  { id: 'domotica', label: 'Domótica', icon: Home },
  { id: 'recarga', label: 'Recarga VE', icon: BatteryCharging },
  { id: 'analisis', label: 'Análisis', icon: Activity },
];

const documents: {
  id: string;
  title: string;
  description: string;
  file: string;
  size: string;
  service: Exclude<ServiceId, 'all'>;
  tag: string;
}[] = [
  {
    id: 'rebt',
    title: 'Documentación para legalización (REBT)',
    description: 'Papeles habituales para legalizar instalaciones en la Región de Murcia.',
    file: '/docs/documentacion-legalizacion-rebt.pdf',
    size: 'PDF',
    service: 'electrico',
    tag: 'Normativa',
  },
  {
    id: 'checklist-elec',
    title: 'Checklist previa: instalación eléctrica',
    description: 'Qué preparar antes de una instalación o reforma eléctrica.',
    file: '/docs/checklist-instalacion-electrica.pdf',
    size: 'PDF',
    service: 'electrico',
    tag: 'Checklist',
  },
  {
    id: 'telecom',
    title: 'Guía básica de telecomunicaciones',
    description: 'ICT, fibra, datos y cableado estructurado para vivienda y empresa.',
    file: '/docs/guia-telecomunicaciones-vivienda.pdf',
    size: 'PDF',
    service: 'telecom',
    tag: 'Guía',
  },
  {
    id: 'cctv',
    title: 'Requisitos técnicos: CCTV y alarmas',
    description: 'Datos y buenas prácticas antes de instalar videovigilancia.',
    file: '/docs/requisitos-cctv-alarmas.pdf',
    size: 'PDF',
    service: 'seguridad',
    tag: 'Requisitos',
  },
  {
    id: 'solar',
    title: 'Guía de autoconsumo fotovoltaico',
    description: 'Información orientativa para proyectos solares en Murcia.',
    file: '/docs/guia-autoconsumo-fotovoltaico.pdf',
    size: 'PDF',
    service: 'solar',
    tag: 'Guía',
  },
  {
    id: 'mant',
    title: 'Plan de mantenimiento eléctrico',
    description: 'Revisiones preventivas y señales de alerta en la instalación.',
    file: '/docs/plan-mantenimiento-electrico.pdf',
    size: 'PDF',
    service: 'mantenimiento',
    tag: 'Plan',
  },
  {
    id: 'domotica',
    title: 'Introducción a domótica (KNX / Zigbee / Z-Wave)',
    description: 'Criterios para planificar la automatización de vivienda o edificio.',
    file: '/docs/introduccion-domotica-knx.pdf',
    size: 'PDF',
    service: 'domotica',
    tag: 'Guía',
  },
  {
    id: 'recarga',
    title: 'Requisitos: punto de recarga para VE',
    description: 'Documentación, legalización, SPL y tarifa de recarga.',
    file: '/docs/requisitos-punto-recarga-ve.pdf',
    size: 'PDF',
    service: 'recarga',
    tag: 'Requisitos',
  },
  {
    id: 'analisis',
    title: 'Qué incluye un análisis de redes',
    description: 'Parámetros medidos y entregables del diagnóstico energético.',
    file: '/docs/informe-analisis-redes.pdf',
    size: 'PDF',
    service: 'analisis',
    tag: 'Informe',
  },
];

export default function TechnicalDocs() {
  const [active, setActive] = useState<ServiceId>('all');

  const visible = useMemo(
    () => (active === 'all' ? documents : documents.filter((d) => d.service === active)),
    [active]
  );

  return (
    <section id="docs" className="py-32 bg-white text-gray-900 border-t border-gray-200 border-dashed relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 md:w-2/3"
        >
          <div className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
            Zona técnica
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900">
            Documentación para descargar
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            Guías y checklists orientativos según el servicio. Filtra por categoría y descarga el PDF que necesites antes de solicitar presupuesto.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-gray-200 border-dashed">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <Icon size={15} strokeWidth={1.75} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Document list */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200 border-dashed">
          <AnimatePresence mode="popLayout">
            {visible.map((doc, index) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 md:py-7 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <FileText size={22} strokeWidth={1.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600">
                      {doc.tag}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-[11px] uppercase tracking-wider font-medium text-gray-400">
                      {doc.size}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <a
                  href={doc.file}
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shrink-0 w-full sm:w-auto"
                >
                  <Download size={16} />
                  Descargar
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-sm text-gray-400 font-light">
          Documentos orientativos. No sustituyen la normativa oficial ni un estudio técnico personalizado.{' '}
          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
          >
            Consulta tu caso
          </button>
          .
        </p>
      </div>
    </section>
  );
}
