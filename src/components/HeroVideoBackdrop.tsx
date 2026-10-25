import { useEffect, useRef } from 'react';

export default function HeroVideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    if (window.matchMedia('(max-width: 767px)').matches) {
      video.src = '/videos/hero-recarga-mobile.mp4';
    }
    video.play().catch(() => undefined);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-[center_28%]"
        style={{ backgroundImage: 'url(/videos/hero-recarga.jpg)' }}
      />
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover object-[50%_28%]"
        poster="/videos/hero-recarga.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero-recarga.mp4" type="video/mp4" />
      </video>
      <div className="hero-sweep absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(13,17,23,0.05)_0%,rgba(13,17,23,0.18)_38%,rgba(13,17,23,0.58)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/50 via-[#0d1117]/10 to-[#0d1117]/85" />
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/25 via-transparent to-amber-900/15" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
    </div>
  );
}
