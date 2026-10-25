import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  AEAT_IRPF_ESTATAL,
  AEAT_IRPF_MURCIA,
  chargingGuides,
  type ChargingGuide,
} from '../src/data/chargingGuides.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceRoot(html: string, inner: string) {
  const start = html.indexOf('<div id="root">');
  const script = html.indexOf('<script type="module"', start);
  if (start === -1 || script === -1) {
    throw new Error('No se encontró #root + script en un HTML');
  }
  const close = html.lastIndexOf('</div>', script);
  if (close === -1 || close < start) {
    throw new Error('No se encontró el cierre de #root antes del script');
  }
  return `${html.slice(0, start)}<div id="root">\n${inner}\n    </div>\n    ${html.slice(script)}`;
}

const HIDE_STATIC = `    <style>
      html, body { background: #0d1117; margin: 0; }
      html:not([data-app]) #root { display: none; }
    </style>
    <noscript><style>html:not([data-app]) #root { display: block; }</style></noscript>
`;

function ensureHideCss(html: string) {
  if (html.includes('html:not([data-app]) #root')) {
    return html
      .replace('html:not([data-app]) #root { visibility: hidden; }', 'html:not([data-app]) #root { display: none; }')
      .replace('html:not([data-app]) #root { visibility: visible; }', 'html:not([data-app]) #root { display: block; }')
      .replace('html:not([data-app]) #root { visibility: visible !important; }', 'html:not([data-app]) #root { display: block; }');
  }
  return html.replace('</head>', `${HIDE_STATIC}  </head>`);
}

function writePage(rel: string, inner: string) {
  const file = resolve(root, rel);
  const html = readFileSync(file, 'utf8');
  writeFileSync(file, replaceRoot(ensureHideCss(html), inner));
}

function guideInner(g: ChargingGuide) {
  const sections = g.sections
    .map((s) => {
      const ps = s.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n');
      const list = s.list
        ? `<ul>${s.list.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`
        : '';
      return `<section><h2>${escapeHtml(s.h2)}</h2>${ps}${list}</section>`;
    })
    .join('\n');
  const faqs = g.faqs
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('\n');
  const links =
    g.slug === 'ayudas-irpf-punto-recarga-murcia'
      ? `<p><a href="${AEAT_IRPF_MURCIA}">Ficha autonómica Murcia (AEAT)</a></p>
         <p><a href="${AEAT_IRPF_ESTATAL}">Deducción estatal punto de recarga (AEAT)</a></p>`
      : '';
  const related = chargingGuides
    .filter((x) => x.slug !== g.slug)
    .map((x) => `<li><a href="${x.path}">${escapeHtml(x.h1)}</a></li>`)
    .join('');
  return `      <article>
        <header>
          <p><a href="/">Voltimur</a> · <a href="/cargador-coche-electrico-murcia/">Cargadores</a></p>
          <h1>${escapeHtml(g.h1)}</h1>
          <p>${escapeHtml(g.lead)}</p>
        </header>
        <main>
          ${sections}
          ${links}
          <h2>Preguntas frecuentes</h2>
          ${faqs}
          <h2>Otras guías</h2>
          <ul>${related}<li><a href="/cargador-coche-electrico-murcia/">Instalación de cargador en Murcia</a></li></ul>
          <p>Teléfono: <a href="tel:+34681330640">681 330 640</a> · <a href="/cargador-coche-electrico-murcia/#contact">Solicitar presupuesto</a></p>
          <p><a href="https://www.google.com/search?q=Voltimur+electricista+Murcia">Ficha de Voltimur en Google</a> · <a href="https://www.google.com/search?q=Voltimur+electricista+Murcia+rese%C3%B1as">Reseñas en Google</a></p>
        </main>
      </article>`;
}

const homeInner = `      <header>
        <p>Voltimur — Electricista en Murcia</p>
        <h1>Electricista en Murcia: instalaciones eléctricas y puntos de recarga</h1>
        <p>Sistemas eléctricos y automáticos. Más de 25 años de experiencia en infraestructuras y mantenimiento eléctricos, inspecciones técnicas periódicas según REBT. Instalaciones de infraestructura de recarga de coche eléctrico: oficial V2C y otros fabricantes. Presupuesto gratis en 24 horas. Teléfono 681 330 640. C/ del Sol 24, Torreagüera, Murcia.</p>
      </header>
      <main>
        <section>
          <h2>Servicios</h2>
          <h3>Instalaciones Eléctricas</h3>
          <p>Diseño e instalación de sistemas eléctricos residenciales, comerciales e industriales: cuadros de protección, SAI, canalizaciones y legalización conforme al REBT.</p>
          <h3>Telecomunicaciones</h3>
          <p>Redes de datos y antenas para tu hogar o negocio. Sistemas de captación audiovisual a través de redes terrestres y satélite, con instalación profesional y puesta en marcha certificada.</p>
          <h3>Sistemas de Seguridad</h3>
          <p>CCTV, alarmas inteligentes y control de accesos para proteger lo que más importa: tu hogar y tu negocio, las 24 horas.</p>
          <h3>Energía Solar</h3>
          <p>Instalación de paneles fotovoltaicos, sistemas de autoconsumo, funcionamiento en modo isla y baterías de respaldo. Reduce tu factura eléctrica y autogestiona tu energía desde la app móvil.</p>
          <h3>Mantenimiento</h3>
          <p>Mantenimiento preventivo y correctivo de instalaciones eléctricas. Minimiza el riesgo de averías, prolonga la vida útil de los equipos y garantiza el cumplimiento normativo.</p>
          <h3>Domótica</h3>
          <p>Automatización de viviendas y edificios mediante sistemas KNX, Zigbee y Z-Wave. Gestión centralizada de iluminación, climatización y seguridad desde dispositivo móvil.</p>
          <h3>Cargadores de Coche Eléctrico</h3>
          <p>Instalación y legalización de puntos de recarga en viviendas, garajes y empresas. Instaladores oficiales V2C y otras marcas (Wallbox, Schneider, Orbis, Policharger, Circutor). Gestión de carga dinámica y boletín eléctrico. Legalización ITC-BT-52 y CIE.</p>
          <p>En la Región de Murcia puedes aplicar una deducción autonómica del 100 % de la base, hasta 4.000 €. Existe también una deducción estatal del 15 % (hasta 600 €) si la instalación termina antes del 31 de diciembre de 2026. Requisitos de la Agencia Tributaria; no es un asesoramiento fiscal.</p>
          <p><a href="/cargador-coche-electrico-murcia/">Página de instalación de cargador en Murcia</a></p>
          <h3>Análisis de Redes Eléctricas</h3>
          <p>Diagnóstico industrial y comercial: armónicos (THD), desequilibrios, fallas eléctricas y corrección del factor de potencia. Baterías de condensadores, protecciones SAI y sistemas de medida.</p>
        </section>
        <section>
          <h2>Sobre Voltimur</h2>
          <p>Empresa instaladora de Murcia, con criterio técnico. Voltimur trabaja instalaciones eléctricas, mantenimiento, inspecciones técnicas periódicas según REBT e infraestructura de recarga. Más de 25 años de oficio en viviendas, comunidades, comercios e industria de la Región de Murcia. No vendemos plantillas: medimos, legalizamos y dejamos cada instalación documentada. Tres pilares: profesionalidad, eficiencia y confianza.</p>
          <p>Somos instaladores autorizados registrados en la Consejería de Empresa, Industria y Portavocía de la Región de Murcia. Las instalaciones incluyen boletín eléctrico oficial. También somos instaladores oficiales V2C: infraestructura de recarga de vehículo eléctrico y otras marcas según el proyecto.</p>
          <ul>
            <li>Más de 25 años de experiencia en infraestructuras eléctricas, mantenimiento e inspecciones según REBT.</li>
            <li>Instalador autorizado: boletín eléctrico, legalización e inspecciones técnicas periódicas conforme a normativa.</li>
            <li>Instalador oficial V2C y otras marcas de wallbox según potencia y uso.</li>
          </ul>
        </section>
        <section>
          <h2>Precio orientativo de un cargador en Murcia</h2>
          <p>En el mercado de 2026, una vivienda unifamiliar suele moverse entre 800 y 1.600 € y un garaje comunitario entre 1.200 y 2.200 €, según metros y potencia. El precio de Voltimur se cierra tras la visita, con legalización incluida.</p>
          <p><a href="/precio-instalacion-cargador-murcia/">Guía de precios</a> · <a href="/cargador-garaje-comunitario-murcia/">Garaje comunitario</a> · <a href="/ayudas-irpf-punto-recarga-murcia/">IRPF y ayudas</a> · <a href="/legalizacion-punto-recarga-itc-bt-52/">Legalización ITC-BT-52</a></p>
        </section>
        <section>
          <h2>Preguntas frecuentes</h2>
          <h3>¿Hacéis presupuestos sin compromiso?</h3>
          <p>Sí. Todos los presupuestos son gratuitos y sin obligación. Recibirás una propuesta personalizada en menos de 24 horas.</p>
          <h3>¿Trabajáis con particulares y también con empresas?</h3>
          <p>Trabajamos con particulares, comunidades de propietarios, pymes, locales comerciales e instalaciones industriales en toda la Región de Murcia.</p>
          <h3>¿Estáis certificados como instaladores autorizados?</h3>
          <p>Sí. Somos instaladores autorizados registrados en la Consejería de Empresa, Industria y Portavocía de la Región de Murcia. Todas nuestras instalaciones incluyen boletín eléctrico oficial y cumplen la normativa vigente.</p>
          <h3>¿Necesito permisos para instalar paneles solares?</h3>
          <p>Nos encargamos de la tramitación: licencias municipales, legalización ante la distribuidora y alta en el Registro de Autoconsumo.</p>
          <h3>¿Cuánto cuesta instalar un cargador de coche eléctrico en Murcia?</h3>
          <p>En el mercado de 2026, una vivienda suele moverse entre 800 y 1.600 € y un garaje comunitario entre 1.200 y 2.200 €. El precio de Voltimur se cierra tras la visita, con legalización incluida.</p>
          <h3>¿Sois instaladores de cargadores de coche eléctrico?</h3>
          <p>Sí. Somos instaladores oficiales V2C y también instalamos otras marcas. Legalizamos la instalación en viviendas, garajes y empresas de Murcia y la Región.</p>
        </section>
        <section>
          <h2>Trabajos reales</h2>
          <p>Fotos propias de obra en Murcia: electricidad, industrial, mantenimiento, recarga y fotovoltaica.</p>
          <ul>
            <li>Cargador V2C: instalación real de wallbox V2C con canalización profesional en garaje.</li>
            <li>Industrial SAI: cuadro de protecciones para sistemas de alimentación ininterrumpida.</li>
            <li>Banco de condensadores: gestión y control de batería de condensadores de potencia.</li>
            <li>Control de potencia: analizador PowerLogic en batería de condensadores.</li>
            <li>Fallas eléctricas: diagnóstico con pinzas amperimétricas en instalación industrial.</li>
            <li>Mantenimiento: revisión de cuadros eléctricos con EPI y medición en campo.</li>
            <li>Garaje comunitario: trabajo en cuadro y canalización para infraestructura de recarga.</li>
            <li>Fotovoltaica: instalación solar 5 kW pico con backup de autoconsumo real en Murcia.</li>
          </ul>
        </section>
        <section>
          <h2>Por qué Voltimur</h2>
          <p>Experiencia y rigor en cada instalación. Más de 25 años en Murcia trabajando infraestructuras eléctricas, mantenimiento, inspecciones según REBT e infraestructura de recarga. Así es como abordamos cada proyecto.</p>
          <p>Legalización y REBT: boletín eléctrico, documentación e inspecciones técnicas periódicas según normativa vigente en la Región de Murcia.</p>
          <p>Mantenimiento y averías: intervención en cuadros, alumbrado, fallas eléctricas e instalaciones industriales con criterio de seguridad.</p>
          <p>Recarga VE como instalador oficial V2C y otras marcas según potencia y uso.</p>
          <p>Trabajo documentado: fotos reales de obra, protecciones correctas y puesta en marcha clara. Sin soluciones genéricas.</p>
          <p>¿Tienes un proyecto en Murcia? Te respondemos con presupuesto claro en 24 horas.</p>
        </section>
        <section>
          <h2>Zona técnica</h2>
          <p>Documentación técnica orientativa. Checklists y guias prácticas para preparar tu proyecto en Murcia. No sustituyen un estudio técnico personalizado.</p>
          <ul>
            <li>Documentación para legalización (REBT): papeles habituales para legalizar instalaciones en la Región de Murcia.</li>
            <li>Checklist previa de instalación eléctrica: qué preparar antes de una instalación o reforma.</li>
            <li>Guía básica de telecomunicaciones: ICT, fibra, datos y cableado estructurado.</li>
            <li>Requisitos técnicos de CCTV y alarmas: datos y buenas prácticas antes de instalar videovigilancia.</li>
            <li>Guía de autoconsumo fotovoltaico: información orientativa para proyectos solares en Murcia.</li>
            <li>Plan de mantenimiento eléctrico: revisiones preventivas y señales de alerta.</li>
            <li>Introducción a domótica KNX, Zigbee y Z-Wave: criterios para planificar la automatización.</li>
            <li>Requisitos de punto de recarga para VE: documentación, legalización y SPL. También en la <a href="/legalizacion-punto-recarga-itc-bt-52/">guía HTML de legalización</a>.</li>
            <li>Qué incluye un análisis de redes: parámetros medidos y entregables del diagnóstico energético.</li>
          </ul>
        </section>
        <section>
          <h2>Zona de servicio</h2>
          <p>Instalaciones eléctricas, solar, seguridad y recarga en Murcia capital y municipios de la Región. Llegamos a toda la Región de Murcia.</p>
          <p>Murcia, Cartagena, Molina de Segura, Alcantarilla, Lorca, Cieza, Yecla, Totana, Mazarrón, San Javier, Torre-Pacheco, Águilas, Alhama de Murcia, Jumilla, Caravaca de la Cruz y Bullas.</p>
        </section>
        <section>
          <h2>Contacto</h2>
          <p>Teléfono: <a href="tel:+34681330640">681 330 640</a></p>
          <p>Email: <a href="mailto:voltimur@voltimur.com">voltimur@voltimur.com</a></p>
          <p>Dirección: Calle del Sol 24, Torreagüera, Murcia</p>
          <p>Horario: lunes a viernes, 8:00–18:00</p>
          <p><a href="https://www.google.com/maps/search/?api=1&amp;query=Calle+del+Sol+24+Torreag%C3%BCera+30579+Murcia">Ficha en Google Maps</a> · <a href="https://www.google.com/search?q=Voltimur+electricista+Murcia">Ficha de Voltimur en Google</a> · <a href="https://www.google.com/search?q=Voltimur+electricista+Murcia+rese%C3%B1as">Reseñas en Google</a></p>
          <p>Presupuesto gratis en 24 horas.</p>
        </section>
      </main>
      <footer>
        <p><a href="/aviso-legal/">Aviso Legal</a> · <a href="/privacidad/">Política de Privacidad</a></p>
      </footer>`;

const chargingInner = `      <header>
        <p><a href="/">Voltimur</a> — Electricista en Murcia</p>
        <h1>Instalación de cargador de coche eléctrico en Murcia</h1>
        <p>Instalamos y legalizamos tu wallbox conforme a la ITC-BT-52: vivienda, garaje comunitario o empresa. Instaladores oficiales V2C. Boletín CIE y presupuesto gratis en 24 horas. Teléfono 681 330 640.</p>
      </header>
      <main>
        <h2>Cómo instalamos tu wallbox o punto de recarga</h2>
        <ol>
          <li>Visita técnica en Murcia: potencia, cuadro y plaza de garaje.</li>
          <li>Elección del cargador: V2C u otras marcas según el proyecto.</li>
          <li>Instalación profesional con protecciones y, si aplica, carga dinámica (SPL) para no saturar el cuadro.</li>
          <li>Legalización ITC-BT-52 y boletín CIE.</li>
        </ol>
        <h2>Vivienda, comunidad o empresa</h2>
        <p>En vivienda o cochera propia la línea suele ser corta y la obra de una jornada. En garaje comunitario se comunica por escrito: no hace falta votación para un punto de uso privativo en tu plaza. En empresa o flota estudiamos uno o varios puntos, el cuadro y si conviene solar.</p>
        <h2>Precio de instalar un cargador en Murcia</h2>
        <p>Horquillas de mercado 2026 (equipo + obra + legalización). El importe que firmamos es el de la visita técnica, gratis y por escrito.</p>
        <ul>
          <li>Vivienda unifamiliar monofásica: 800–1.600 €</li>
          <li>Garaje comunitario: 1.200–2.200 €</li>
          <li>Empresa o trifásica: desde 1.500 € por punto</li>
        </ul>
        <p>Rangos publicados por fabricantes e instaladores en 2026. No son una oferta de Voltimur. <a href="/precio-instalacion-cargador-murcia/">Guía de precios</a>.</p>
        <h2>Qué incluye el presupuesto</h2>
        <ul>
          <li>Visita técnica y presupuesto cerrado por escrito</li>
          <li>Cargador homologado (V2C u otra marca según el caso)</li>
          <li>Cuadro de protecciones del punto de recarga</li>
          <li>Cableado y canalización según recorrido real</li>
          <li>Carga dinámica (SPL) si el cuadro lo necesita</li>
          <li>Boletín CIE, legalización ITC-BT-52 y puesta en marcha</li>
        </ul>
        <h2>Legalización ITC-BT-52 y deducción IRPF</h2>
        <p>Ejecutamos según la ITC-BT-52, emitimos el CIE y tramitamos el alta en Industria. En la Región de Murcia puedes aplicar una deducción autonómica del 100 % de la base, hasta 4.000 €. Existe también una deducción estatal del 15 % (hasta 600 €) si la instalación termina antes del 31 de diciembre de 2026. Requisitos de la Agencia Tributaria; no es un asesoramiento fiscal.</p>
        <p><a href="/ayudas-irpf-punto-recarga-murcia/">Guía de IRPF y ayudas</a> · <a href="/legalizacion-punto-recarga-itc-bt-52/">Guía de legalización</a> · <a href="/cargador-garaje-comunitario-murcia/">Guía de garaje comunitario</a>.</p>
        <h2>Instaladores oficiales V2C</h2>
        <p>Certificados por V2C para instalar y legalizar sus cargadores con garantía de fabricante en Murcia. También instalamos Wallbox, Schneider, Orbis Viaris, Policharger y Circutor.</p>
        <h2>Cobertura</h2>
        <p>Murcia, Cartagena, Molina de Segura, Alcantarilla, Lorca, Cieza, Yecla, Totana, Mazarrón, San Javier, Torre-Pacheco y Águilas.</p>
        <h2>Preguntas frecuentes sobre cargadores</h2>
        <h3>¿Cuánto cuesta instalar un cargador de coche eléctrico en Murcia?</h3>
        <p>En el mercado de 2026, una vivienda unifamiliar suele moverse entre 800 y 1.600 € y un garaje comunitario entre 1.200 y 2.200 €, según metros y potencia. No son tarifas fijas de Voltimur: el precio cerrado sale de la visita. Legalización incluida en el presupuesto.</p>
        <h3>¿Hace falta permiso de la comunidad de vecinos?</h3>
        <p>Para un punto de uso privativo en tu plaza, la Ley de Propiedad Horizontal pide comunicarlo por escrito al presidente o administrador. No se vota. Redactamos el escrito con el recorrido de la línea.</p>
        <h3>¿Hay que legalizar el cargador? ¿Qué es el CIE?</h3>
        <p>Sí. La instalación se ejecuta conforme a la ITC-BT-52 del REBT. Emitimos el boletín y tramitamos la legalización en Industria de la Región de Murcia.</p>
        <h3>¿Puedo desgravar el punto de recarga en el IRPF de Murcia?</h3>
        <p>La deducción autonómica cubre el 100 % de la base, con un máximo de 4.000 €, si hay factura y se cumplen los requisitos. La estatal es el 15 % (hasta 600 €) para instalaciones terminadas antes del 31 de diciembre de 2026. Cada caso lo confirma Hacienda.</p>
        <h3>¿Cuánto tarda la instalación?</h3>
        <p>En la mayoría de viviendas y plazas se completa en un día. El CIE y el alta en Industria van después.</p>
        <h3>¿Hace falta subir la potencia contratada?</h3>
        <p>No siempre. Si el cuadro va justo, instalamos gestión de carga dinámica (SPL) para que el cargador no sature el cuadro ni dispare el ICP.</p>
        <h3>¿Puedo cargar con mis placas solares?</h3>
        <p>Sí. Si ya tienes autoconsumo, enlazamos un wallbox compatible con el inversor. Si las placas van después, dejamos el punto preparado.</p>
        <h3>¿Solo instaláis V2C?</h3>
        <p>Somos instaladores oficiales V2C y también instalamos Wallbox, Schneider, Orbis Viaris, Policharger y Circutor eHome/eNext.</p>
        <h2>Contacto</h2>
        <p><a href="tel:+34681330640">681 330 640</a> · <a href="mailto:voltimur@voltimur.com">voltimur@voltimur.com</a></p>
        <p>C/ del Sol 24, Torreagüera, Murcia</p>
        <p><a href="#contact">Solicitar presupuesto</a> · <a href="https://www.google.com/search?q=Voltimur+electricista+Murcia">Ficha de Voltimur en Google</a> · <a href="https://www.google.com/search?q=Voltimur+electricista+Murcia+rese%C3%B1as">Reseñas en Google</a></p>
      </main>`;

writePage('index.html', homeInner);
writePage('cargador-coche-electrico-murcia/index.html', chargingInner);
for (const g of chargingGuides) {
  writePage(`${g.slug}/index.html`, guideInner(g));
}

function countWords(rel: string) {
  const html = readFileSync(resolve(root, rel), 'utf8');
  const start = html.indexOf('<div id="root">');
  const script = html.indexOf('<script type="module"', start);
  const text = html
    .slice(start, script)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(' ').filter(Boolean).length;
}

const pages = [
  'index.html',
  'cargador-coche-electrico-murcia/index.html',
  ...chargingGuides.map((g) => `${g.slug}/index.html`),
];
for (const rel of pages) {
  console.log(`${rel}: ${countWords(rel)} palabras en #root`);
}
console.log('HTML estático inyectado en portada, landing y 4 guías.');
