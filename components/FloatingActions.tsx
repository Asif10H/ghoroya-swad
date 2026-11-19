'use client';

import { useState, useEffect } from 'react';
import { PiArrowUpLight, PiPhoneCallLight } from 'react-icons/pi';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3.5 sm:right-5 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex flex-col gap-2 items-end">
      {/* Scroll to Top Button */}
      <button
        id="toTop"
        type="button"
        onClick={scrollToTop}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--neutral-white)]/95 backdrop-blur-[16px] text-[var(--tone-strong)] border border-[var(--border-subtle)] hover:bg-[var(--tone-faint)] active:scale-95 transition-opacity transition-transform transition-colors cursor-pointer ${
          showTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        aria-label="উপরে যান"
        title="উপরে যান"
      >
        <PiArrowUpLight className="text-lg" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] font-mono text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border-subtle)]">
          উপরে যান
        </span>
      </button>

      {/* Floating Call Button */}
      <a
        href="tel:01819759868"
        className="group relative hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] border border-[var(--border-subtle)] hover:opacity-90 active:scale-95 transition-opacity transition-colors cursor-pointer"
        aria-label="সরাসরি কল করুন: 01819-759868"
        title="সরাসরি কল করুন: 01819-759868"
      >
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--tone-strong)] opacity-40" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--tone-strong)] border-2 border-[var(--bg-base)]" />
        </span>

        <PiPhoneCallLight className="text-lg text-[var(--bg-base)]" aria-hidden="true" />

        {/* Desktop hover label */}
        <span className="pointer-events-none absolute right-full mr-2.5 px-3 py-1.5 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border-subtle)] flex items-center gap-1.5">
          <PiPhoneCallLight className="text-xs shrink-0" aria-hidden="true" />
          <span>কল করুন: 01819-759868</span>
        </span>
      </a>
    </div>
  );
}
