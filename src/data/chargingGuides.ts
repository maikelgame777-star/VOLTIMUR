export type GuideFaq = { q: string; a: string };

export type GuideSection = {
  h2: string;
  paragraphs: string[];
  list?: string[];
};

export type ChargingGuide = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const chargingGuides: ChargingGuide[] = [
  {
    slug: 'precio-instalacion-cargador-murcia',
    path: '/precio-instalacion-cargador-murcia/',
    title: 'Precio de instalar un cargador de coche eléctrico en Murcia',
    description:
      'Horquillas de mercado 2026 para instalar un wallbox en Murcia: vivienda, garaje comunitario y empresa. Qué incluye el presupuesto y qué hace subir el precio.',
    h1: 'Precio de instalar un cargador de coche eléctrico en Murcia',
    lead: 'El precio lo marcan los metros de línea, el tipo de garaje y la potencia. Publicamos horquillas de mercado 2026 para que sepas por dónde se mueve; el importe de Voltimur se cierra por escrito tras la visita técnica, gratis y sin compromiso.',
    sections: [
      {
        h2: 'Horquillas de mercado 2026',
        paragraphs: [
          'Estas cifras agrupan equipo, obra y legalización que publican fabricantes e instaladores en 2026. No son una tarifa fija de Voltimur.',
        ],
        list: [
          'Vivienda unifamiliar monofásica (3,7–7,4 kW, línea corta): 800–1.600 €',
          'Garaje comunitario, punto individual: 1.200–2.200 €, según metros',
          'Empresa, nave o trifásica: desde 1.500 € por punto',
          'Solo el equipo, sin obra: 400–1.200 € según modelo',
        ],
      },
      {
        h2: 'Qué hace subir o bajar el presupuesto',
        paragraphs: [
          'La partida que más pesa es la distancia entre el origen eléctrico y la plaza. Cinco metros por una pared limpia no cuestan lo mismo que veinticinco metros cruzando un sótano.',
        ],
        list: [
          'Metros de cable y tipo de canalización (vista, empotrada, forjados)',
          'Monofásico o trifásico, y si hace falta refuerzo de cuadro',
          'Acceso al contador en comunidad y horario de obra',
          'Carga dinámica (SPL), solar o varios puntos',
        ],
      },
      {
        h2: 'Qué debe incluir un presupuesto serio',
        paragraphs: [
          'Un precio llamativo suele dejar fuera el boletín, las protecciones o la legalización. En Voltimur el presupuesto escrito incluye visita, cargador homologado, cuadro de protecciones, canalización real, SPL si el cuadro lo necesita, CIE, legalización ITC-BT-52 y puesta en marcha.',
        ],
      },
      {
        h2: 'Cómo te damos el precio en Murcia',
        paragraphs: [
          'Nos escribes con el municipio, si es casa, plaza de comunidad o empresa, y una foto del cuadro si puedes. Te devolvemos una horquilla y, si encaja, vamos a medir. El número que firmamos es ese, no el de un anuncio.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Por qué no publicáis un precio cerrado?',
        a: 'Porque sin medir los metros y ver el cuadro estaríamos adivinando. La horquilla sirve para orientarte; el cierre es tras la visita.',
      },
      {
        q: '¿La legalización va aparte?',
        a: 'No. El CIE y la tramitación según ITC-BT-52 van en el presupuesto, no como extra de última hora.',
      },
    ],
  },
  {
    slug: 'cargador-garaje-comunitario-murcia',
    path: '/cargador-garaje-comunitario-murcia/',
    title: 'Cargador en garaje comunitario en Murcia: cómo se instala',
    description:
      'Instalar un punto de recarga en tu plaza de garaje en Murcia. Se comunica por escrito: no hace falta votación. Legalización ITC-BT-52 e instaladores oficiales V2C.',
    h1: 'Cargador de coche eléctrico en garaje comunitario en Murcia',
    lead: 'Para un punto de uso privativo en tu plaza no pedimos permiso a la junta: se comunica por escrito al presidente o administrador. Canalizamos hasta tu plaza, legalizamos y, si el cuadro va justo, montamos carga dinámica para no saturar tu suministro.',
    sections: [
      {
        h2: 'Se avisa, no se vota',
        paragraphs: [
          'La Ley de Propiedad Horizontal permite instalar un punto de recarga de uso privativo en tu plaza comunicándolo por escrito. No entra en el orden del día ni depende de una mayoría. Redactamos el escrito con el recorrido de la línea para que el administrador tenga el papel claro.',
        ],
      },
      {
        h2: 'Cómo se hace la obra',
        paragraphs: [
          'La línea parte de tu contador o de una derivación con medición propia: el consumo del coche no pasa por el contador comunitario. El cable puede ir por zonas comunes (patinillos, techos, cuarto de contadores) si no causa un perjuicio grave. Medimos el recorrido en la visita y lo dejamos por escrito.',
        ],
        list: [
          'Visita: metros, potencia y acceso al sótano',
          'Escrito para la comunidad con el trazado',
          'Canalización, protecciones y wallbox en tu plaza',
          'CIE y legalización a tu nombre',
        ],
      },
      {
        h2: 'Potencia: la tuya, no la de los vecinos',
        paragraphs: [
          'Si tu cuadro va justo, instalamos gestión de carga dinámica (SPL) para que el cargador baje cuando la vivienda tira fuerte y no salte el ICP. No es un sistema para “repartir la potencia del edificio entre vecinos”: es para que tu instalación no se sature.',
        ],
      },
      {
        h2: 'Precio orientativo',
        paragraphs: [
          'En el mercado de 2026, un punto individual en garaje comunitario suele moverse entre 1.200 y 2.200 € según metros. El precio de Voltimur se cierra tras medir el sótano.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puede la comunidad prohibirme el cargador?',
        a: 'No por sistema. Para un punto privativo en tu plaza basta la comunicación previa. Si alguien quisiera frenarla tendría que acreditar un perjuicio grave.',
      },
      {
        q: '¿El consumo lo paga la comunidad?',
        a: 'No. La línea se toma de tu suministro o con medición individual. Queda reflejado en el boletín.',
      },
    ],
  },
  {
    slug: 'ayudas-irpf-punto-recarga-murcia',
    path: '/ayudas-irpf-punto-recarga-murcia/',
    title: 'Deducción IRPF por punto de recarga en Murcia',
    description:
      'Deducción autonómica de Murcia (100 % hasta 4.000 €) y deducción estatal del 15 % (hasta 600 €) por instalar un punto de recarga. Requisitos de Hacienda y papeles que te dejamos.',
    h1: 'Ayudas e IRPF para instalar un punto de recarga en Murcia',
    lead: 'El MOVES no es una ayuda en la que puedas apoyarte hoy. Sí puedes mirar dos vías de IRPF: la autonómica de Murcia y la estatal. Te dejamos factura y CIE; Hacienda y tu gestoría deciden en cada declaración.',
    sections: [
      {
        h2: 'Deducción autonómica de la Región de Murcia',
        paragraphs: [
          'La Agencia Tributaria recoge la deducción por gastos en la instalación de infraestructuras de recarga. La cuantía es el 100 % de la base, con un límite de 4.000 € por infraestructura y contribuyente.',
        ],
        list: [
          'Instalación en finca de tu propiedad o en tu garaje comunitario',
          'No aplica si eres usufructuario o inquilino',
          'Vehículo de uso particular',
          'Justificar con factura',
          'Mantener titularidad y funcionamiento al menos dos años',
        ],
      },
      {
        h2: 'Deducción estatal (toda España)',
        paragraphs: [
          'Además de la autonómica, existe una deducción en la cuota estatal: el 15 % de las cantidades pagadas por instalar un punto de recarga en un inmueble de tu propiedad, con base máxima de 4.000 €. El ahorro máximo es 600 €. La instalación tiene que terminar antes del 31 de diciembre de 2026 (Real Decreto-ley 7/2026).',
        ],
        list: [
          '15 % de la base, tope 4.000 € → hasta 600 €',
          'Inmueble de tu propiedad y uso particular, no afecto a actividad económica',
          'Cantidades pagadas desde el 30 de junio de 2023 hasta el 31 de diciembre de 2026',
          'Se aplica en el ejercicio en que finaliza la instalación',
          'Conviene pago bancario trazable, factura y CIE',
        ],
      },
      {
        h2: 'Qué papeles te dejamos',
        paragraphs: [
          'Factura a tu nombre, boletín CIE y documentación de la legalización. Con eso tu gestoría puede preparar las casillas autonómica y estatal. La Agencia Tributaria indica que la deducción estatal se practica en el ejercicio en que finaliza la instalación. No afirmamos que se pueda arrastrar el resto a otros años: ese plazo lo confirma tu gestoría con Hacienda.',
        ],
      },
      {
        h2: 'Lo que no prometemos',
        paragraphs: [
          'No somos asesores fiscales. Cada declaración depende de tu cuota, de si hay otras ayudas y de que cumplas los requisitos. Los enlaces oficiales de la Agencia Tributaria están más abajo.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Sigue el MOVES III?',
        a: 'El MOVES cerró. No lo incluimos en el presupuesto como si estuviera vigente. La vía útil ahora es el IRPF: autonómico de Murcia y, si te aplica, el estatal.',
      },
      {
        q: '¿Puedo aplicar la autonómica y la estatal a la vez?',
        a: 'Pueden convivir en la misma renta porque gravan cuotas distintas, pero hay requisitos y bases que no se duplican igual en todos los casos. Lo revisa tu gestoría con las fichas de Hacienda.',
      },
      {
        q: '¿Vale para un garaje de alquiler?',
        a: 'La norma autonómica pide finca en propiedad o plaza en garaje comunitario del contribuyente. La estatal también exige inmueble propio. El inquilino no entra. Confírmalo en Hacienda.',
      },
    ],
  },
  {
    slug: 'legalizacion-punto-recarga-itc-bt-52',
    path: '/legalizacion-punto-recarga-itc-bt-52/',
    title: 'Legalizar un punto de recarga: ITC-BT-52 y CIE',
    description:
      'Cómo se legaliza un wallbox en Murcia: ITC-BT-52, boletín CIE y alta en Industria. Qué papeles hacen falta y qué tramita Voltimur.',
    h1: 'Legalización de punto de recarga: ITC-BT-52 y boletín CIE',
    lead: 'Colgar el aparato no es una instalación. En España el punto de recarga se ejecuta según la ITC-BT-52 del REBT, se certifica con el CIE y se da de alta en Industria. Sin eso no hay instalación legal ni papeles para el IRPF.',
    sections: [
      {
        h2: 'Qué es la ITC-BT-52',
        paragraphs: [
          'Es la instrucción técnica del Reglamento Electrotécnico de Baja Tensión que regula las infraestructuras de recarga. Define esquemas de conexión, protecciones y que la obra la haga un instalador autorizado. Antes de ejecutar, corresponde una memoria técnica o un proyecto, según la potencia y el tipo de instalación (ITC-BT-04).',
        ],
      },
      {
        h2: 'Qué es el CIE (boletín)',
        paragraphs: [
          'El Certificado de Instalación Eléctrica lo emite la empresa instaladora autorizada. Es el documento que acredita que el punto se ha ejecutado a norma. Con él se tramita el alta en Industria de la Región de Murcia y, si el caso lo pide, la comunicación a la distribuidora (i-DE).',
        ],
      },
      {
        h2: 'Qué tramita Voltimur',
        paragraphs: [
          'Somos electricistas e instaladores oficiales V2C. En el presupuesto entra la ejecución a norma, el cuadro de protecciones, el CIE y la legalización. Te entregamos la carpeta: no te dejamos persiguiendo sellos.',
        ],
        list: [
          'Diseño del circuito y protecciones',
          'Ejecución y puesta en marcha con tu coche si está',
          'CIE y registro en Industria',
          'Factura para la deducción del IRPF',
        ],
      },
      {
        h2: 'Schuko frente a wallbox',
        paragraphs: [
          'Un enchufe doméstico no es un punto de recarga a norma para uso habitual: es lento y no lleva las protecciones de la ITC-BT-52. El wallbox en modo 3, con su cuadro, es la instalación que se legaliza.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Puedo instalar el cargador yo y que me hagáis solo el boletín?',
        a: 'El CIE lo firma quien ha ejecutado la instalación como empresa autorizada. No certificamos obra ajena.',
      },
      {
        q: '¿Cuánto tarda la legalización?',
        a: 'La obra en vivienda suele ser un día. El registro del CIE en Industria va después; te indicamos plazos reales en el presupuesto.',
      },
    ],
  },
];

export const AEAT_IRPF_MURCIA =
  'https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2025-deducciones-autonomicas/comunidad-autonoma-region-murcia/gastos-instalacion-infraestructuras-recarga-vehiculos-electricos.html';

export const AEAT_IRPF_ESTATAL =
  'https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/irpf-2025/c16-deducciones-generales-cuota/deducciones-adquisicion-vehiculos-electricos-puntos-recarga.html';

export function getGuide(slug: string) {
  return chargingGuides.find((g) => g.slug === slug);
}

export function otherGuides(slug: string) {
  return chargingGuides.filter((g) => g.slug !== slug);
}
