/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import { NewsTicker } from './components/NewsTicker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Works from './components/Works';
import Brands from './components/Brands';
import About from './components/About';
import TechnicalDocs from './components/TechnicalDocs';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import News from './components/News';
import ServiceArea from './components/ServiceArea';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { DarkToLight, LightToDark } from './components/WaveDivider';
import { MobileContactBar, DesktopWhatsApp } from './components/MobileContactBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white selection:bg-emerald-500/30 font-sans pb-24 md:pb-0">
      <Loader />
      <ScrollProgress />
      <div className="grain-overlay" />

      <NewsTicker />
      <Navbar />
      <Hero />

      <DarkToLight />

      <Services />
      <Works />
      <Brands />
      <About />
      <TechnicalDocs />
      <FAQ />
      <Testimonials />

      <LightToDark />

      <News />
      <ServiceArea />
      <Contact />
      <Footer />

      <MobileContactBar />
      <DesktopWhatsApp />
    </div>
  );
}
