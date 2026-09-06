#!/usr/bin/env python3
"""Generate Voltimur technical PDF guides (ASCII-safe for Helvetica)."""

from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "public" / "docs"


class Doc(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(16, 185, 129)
        self.cell(0, 8, "Voltimur | Zona tecnica")
        self.ln(10)
        self.set_draw_color(16, 185, 129)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"voltimur.com - 660 144 754 - Pagina {self.page_no()}", align="C")

    def title_block(self, title, subtitle):
        self.set_x(10)
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(20, 20, 20)
        self.multi_cell(190, 9, title)
        self.ln(2)
        self.set_x(10)
        self.set_font("Helvetica", "", 11)
        self.set_text_color(80, 80, 80)
        self.multi_cell(190, 6, subtitle)
        self.ln(6)

    def section(self, heading, items):
        self.set_x(10)
        self.set_font("Helvetica", "B", 13)
        self.set_text_color(16, 140, 100)
        self.multi_cell(190, 8, heading)
        self.ln(1)
        self.set_font("Helvetica", "", 11)
        self.set_text_color(40, 40, 40)
        for item in items:
            self.set_x(10)
            self.multi_cell(190, 6, f"-  {item}")
        self.ln(3)


DOCS = [
    (
        "checklist-instalacion-electrica.pdf",
        "Checklist previa: instalacion electrica",
        "Documentacion y condiciones necesarias antes de iniciar una instalacion o reforma electrica (REBT).",
        [
            (
                "Documentacion a preparar",
                [
                    "DNI/NIF del titular de la instalacion",
                    "Direccion exacta y referencia catastral si se dispone",
                    "Potencia contratada actual y ultima factura de la luz",
                    "Planos o croquis de la vivienda/local (si existen)",
                    "Uso previsto: vivienda, local, industrial o comunidad",
                ],
            ),
            (
                "Condiciones en obra",
                [
                    "Acceso libre al cuadro general y a la acometida",
                    "Espacio previsto para canalizaciones y mecanismos",
                    "Coordinacion con albañileria/pintura si hay obra civil",
                    "Puntos de luz y tomas previstos por estancia",
                ],
            ),
            (
                "Que incluye Voltimur",
                [
                    "Diseno conforme al REBT e ITC aplicables",
                    "Instalacion, pruebas y boletin electrico oficial",
                    "Asesoramiento sobre potencia y protecciones",
                ],
            ),
        ],
    ),
    (
        "guia-telecomunicaciones-vivienda.pdf",
        "Guia basica: telecomunicaciones en vivienda y empresa",
        "Orientacion sobre ICT, fibra, datos y cableado estructurado.",
        [
            (
                "Que contempla una instalacion ICT",
                [
                    "Punto de acceso de usuario (PAU) y registro de enlace",
                    "Distribucion de TV, telefonia y datos",
                    "Canalizaciones y registros reglamentarios",
                    "Prevision de toma de fibra hasta puntos de uso",
                ],
            ),
            (
                "Recomendaciones practicas",
                [
                    "Reservar espacio para router/ONT y switch",
                    "Cableado Cat.6 o superior en nuevas instalaciones",
                    "Evitar cruce de potencia y datos sin separacion",
                    "Documentar puntos RJ45 por estancia",
                ],
            ),
        ],
    ),
    (
        "requisitos-cctv-alarmas.pdf",
        "Requisitos tecnicos: CCTV y alarmas",
        "Aspectos a tener en cuenta antes de instalar videovigilancia o alarma.",
        [
            (
                "Datos necesarios",
                [
                    "Zonas a cubrir (interior/exterior) y horarios de uso",
                    "Disponibilidad de red WiFi o preferencia por cable",
                    "Alimentacion electrica estable en puntos de camara",
                    "Necesidad de grabacion local, nube o ambas",
                ],
            ),
            (
                "Buenas practicas",
                [
                    "Camaras IP PoE cuando sea posible para mayor fiabilidad",
                    "Respetar angulos sin invadir via publica de forma indebida",
                    "Informar con carteleria si hay videovigilancia",
                    "Definir usuarios y accesos a la app de visualizacion",
                ],
            ),
        ],
    ),
    (
        "guia-autoconsumo-fotovoltaico.pdf",
        "Guia de autoconsumo fotovoltaico",
        "Informacion orientativa para instalaciones solares en Murcia.",
        [
            (
                "Informacion que necesitamos",
                [
                    "Ultimas facturas electricas (idealmente 12 meses)",
                    "Orientacion y tipo de cubierta / terreno",
                    "Potencia contratada y tipo de suministro",
                    "Interes en baterias y modo isla",
                ],
            ),
            (
                "Tramitacion tipica",
                [
                    "Estudio de produccion y dimensionado",
                    "Licencia / comunicacion municipal segun ayuntamiento",
                    "Legalizacion e inscripcion en autoconsumo",
                    "Puesta en marcha, app de monitorizacion y formacion",
                ],
            ),
            (
                "Notas",
                [
                    "El ahorro real depende del perfil de consumo y tarifa",
                    "Voltimur gestiona la parte tecnica y administrativa del proyecto",
                ],
            ),
        ],
    ),
    (
        "plan-mantenimiento-electrico.pdf",
        "Plan de mantenimiento electrico",
        "Revision preventiva recomendada para viviendas, locales e industria.",
        [
            (
                "Revisiones periodicas",
                [
                    "Inspeccion visual de cuadro, protecciones y bornes",
                    "Comprobacion de diferenciales y magnetotermicos",
                    "Medicion de aislamiento y continuidad cuando proceda",
                    "Revision de tomas de tierra y puesta a tierra",
                ],
            ),
            (
                "Senales de alerta",
                [
                    "Disparos frecuentes sin causa clara",
                    "Calentamiento en conexiones u olores a quemado",
                    "Parpadeos o caidas de tension",
                    "Equipos que fallan al arrancar simultaneamente",
                ],
            ),
        ],
    ),
    (
        "introduccion-domotica-knx.pdf",
        "Introduccion a domotica (KNX / Zigbee / Z-Wave)",
        "Criterios para elegir y planificar una automatizacion de vivienda o edificio.",
        [
            (
                "Que decidir antes de instalar",
                [
                    "Funciones prioritarias: luces, clima, persianas, seguridad",
                    "Preferencia por sistema cableado (KNX) o inalambrico",
                    "Integracion con voz / app / escena",
                    "Prevision de puntos en obra nueva vs. reforma",
                ],
            ),
            (
                "Ventajas de planificarlo con electricista",
                [
                    "Canalizaciones y alimentaciones correctas desde el origen",
                    "Evitar incompatibilidades entre protocolos",
                    "Centralizacion y mantenimiento a largo plazo",
                ],
            ),
        ],
    ),
    (
        "requisitos-punto-recarga-ve.pdf",
        "Requisitos: punto de recarga para VE",
        "Documentacion y condiciones para instalar y legalizar un cargador.",
        [
            (
                "Documentacion habitual",
                [
                    "Titular del punto de suministro y permiso de comunidad si aplica",
                    "Ubicacion del aparcamiento y distancia al cuadro",
                    "Potencia disponible y protecciones existentes",
                    "Modelo de vehiculo o potencia de carga deseada",
                ],
            ),
            (
                "Aspectos tecnicos",
                [
                    "Legalizacion y boletin segun ITC-BT aplicable",
                    "Gestion de carga dinamica (SPL) si hay limitacion de potencia",
                    "Discriminacion horaria y tarifa optima de recarga",
                    "Protecciones diferenciales adecuadas al cargador",
                ],
            ),
        ],
    ),
    (
        "informe-analisis-redes.pdf",
        "Que incluye un analisis de redes electricas",
        "Alcance tipico de un diagnostico con analizador de redes.",
        [
            (
                "Parametros que medimos",
                [
                    "Tension, corriente, potencia activa/reactiva y factor de potencia",
                    "Armonicos (THD) y desequilibrios de fases",
                    "Perturbaciones transitorias y eventos de calidad",
                    "Perfil de consumo en el periodo de medicion",
                ],
            ),
            (
                "Entregables",
                [
                    "Informe con graficas y conclusiones",
                    "Propuesta de correccion (condensadores, filtros, gestion)",
                    "Estimacion de impacto en factura y vida util de equipos",
                ],
            ),
        ],
    ),
    (
        "documentacion-legalizacion-rebt.pdf",
        "Documentacion para legalizacion (REBT)",
        "Resumen orientativo de papeles habituales en legalizaciones en la Region de Murcia.",
        [
            (
                "Documentos frecuentes",
                [
                    "Memoria tecnica o proyecto segun potencia/tipo",
                    "Certificado de instalacion / boletin electrico",
                    "Esquema unifilar y caracteristicas de protecciones",
                    "Certificado de direccion de obra cuando proceda",
                ],
            ),
            (
                "Importante",
                [
                    "Cada instalacion puede requerir documentacion adicional",
                    "Voltimur te indica exactamente lo necesario en el presupuesto",
                    "Este documento es informativo y no sustituye normativa oficial",
                ],
            ),
        ],
    ),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, title, subtitle, sections in DOCS:
        # Strip non-latin1 for core Helvetica
        def clean(s: str) -> str:
            return (
                s.replace("ñ", "n")
                .replace("Ñ", "N")
                .replace("á", "a")
                .replace("é", "e")
                .replace("í", "i")
                .replace("ó", "o")
                .replace("ú", "u")
                .replace("ü", "u")
            )

        pdf = Doc()
        pdf.set_auto_page_break(auto=True, margin=18)
        pdf.add_page()
        pdf.title_block(clean(title), clean(subtitle))
        for heading, items in sections:
            pdf.section(clean(heading), [clean(i) for i in items])
        pdf.set_x(10)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(90, 90, 90)
        pdf.multi_cell(
            190,
            5,
            "Documento orientativo elaborado por Voltimur. Para un estudio personalizado: 660 144 754 / voltimur.com",
        )
        path = OUT / filename
        pdf.output(str(path))
        print(f"OK {filename} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
