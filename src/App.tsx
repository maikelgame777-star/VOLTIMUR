/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SpeedInsights } from '@vercel/speed-insights/react';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-blue-500/30 font-sans">
      <Hero />
      
      {/* Transition from Dark to Light */}
      <div className="h-32 bg-gradient-to-b from-[#0d1117] to-white w-full"></div>
      
      <Services />
      <About />
      <Testimonials />
      
      {/* Transition from Light to Dark */}
      <div className="h-32 bg-gradient-to-b from-white to-[#0d1117] w-full"></div>
      
      <Contact />
      <Footer />
      
      {/* ElevenLabs AI Agent */}
      <elevenlabs-convai agent-id="agent_1601kk07y417fas98fmc894decym"></elevenlabs-convai>
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
