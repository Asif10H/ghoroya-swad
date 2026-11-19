'use client';

import { useState, useEffect } from 'react';
import { PiArrowUpLight, PiPhoneLight } from 'react-icons/pi';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3.5 sm:right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex flex-col gap-2.5 items-end">
      <button
        id="toTop"
        type="button"
        onClick={scrollToTop}
        className={`${
          showTop ? 'grid' : 'hidden'
        } h-11 w-11 sm:h-10 sm:w-10 place-items-center rounded-[8px] bg-[var(--neutral-white)] text-[var(--tone-strong)] border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] active:scale-90 transition-all`}
        aria-label="উপরে যান"
      >
        <PiArrowUpLight className="text-xl sm:text-lg" aria-hidden="true" />
      </button>
      <a
        href="tel:01819759868"
        className="h-12 w-12 sm:h-12 sm:w-12 rounded-full bg-[var(--tone-strong)] text-[var(--bg-base)] grid place-items-center text-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] hover:text-[var(--tone-strong)] active:scale-90 transition-all"
        aria-label="কল করুন"
      >
        <PiPhoneLight className="text-2xl" aria-hidden="true" />
      </a>
    </div>
  );
}
