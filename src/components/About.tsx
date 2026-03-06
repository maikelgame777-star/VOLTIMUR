import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-32 bg-gray-50 text-gray-900 border-t border-gray-200 border-dashed relative overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-4">Sobre Nosotros</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-gray-900">
              Nuestra Historia
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed font-light">
              <strong className="text-gray-900 font-medium">Voltimur</strong> fue fundada en Murcia con el objetivo de ofrecer servicios eléctricos y tecnológicos de alta calidad. Nuestro equipo de técnicos certificados garantiza seguridad, innovación y compromiso en cada proyecto.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Operamos bajo tres pilares: <span className="text-blue-600 font-medium">profesionalidad, eficiencia y confianza</span>. Nuestro objetivo es que la energía y la tecnología trabajen para tu bienestar y ahorro.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-white border border-gray-100 shadow-2xl relative">
              {/* Abstract shapes for visual interest */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-96 h-96 border-[60px] border-blue-600/5 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 -left-24 w-72 h-72 border-[40px] border-blue-400/5 rounded-full"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 transform hover:scale-105 transition-transform duration-500">
                  <div className="text-7xl font-display font-bold text-blue-600 mb-2">+15</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Años de Experiencia</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
