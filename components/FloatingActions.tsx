'use client';

import { useState, useEffect } from 'react';

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
    <div className="fixed right-4 bottom-5 z-40 flex flex-col gap-3 items-end">
      <button
        id="toTop"
        type="button"
        onClick={scrollToTop}
        className={`${
          showTop ? 'grid' : 'hidden'
        } h-10 w-10 place-items-center rounded-[8px] bg-[var(--neutral-white)] text-[var(--tone-strong)] border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] transition-colors`}
        aria-label="উপরে যান"
      >
        ↑
      </button>
      <a
        href="tel:01819759868"
        className="h-12 w-12 rounded-full bg-[var(--tone-strong)] text-[var(--bg-base)] grid place-items-center text-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] hover:text-[var(--tone-strong)] transition-colors"
        aria-label="কল করুন"
      >
        📞
      </a>
    </div>
  );
}
