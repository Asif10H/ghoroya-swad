'use client';

import { useState, useEffect } from 'react';
import { PiBowlFoodLight, PiPhoneLight, PiSunLight, PiMoonLight } from 'react-icons/pi';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('gs-dark');
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = saved !== null ? saved === 'true' : Boolean(prefersDark);
      setIsDark(dark);
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      localStorage.setItem('gs-dark', String(next));
    } catch {
      // ignore storage access errors
    }
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-[#151515] text-[var(--light-100)] border-b border-[var(--light-16)]">
      <nav
        className={`max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ${className}`.trim()}
        aria-label="প্রধান নেভিগেশন"
      >
        <div className="flex items-center gap-2">
          <PiBowlFoodLight className="text-2xl sm:text-xl text-[var(--light-88)]" aria-hidden="true" />
          <span className="font-heading font-medium tracking-tight text-lg text-white">
            ঘরোয়া স্বাদ
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:01819759868"
            className="btn btn--glass btn--sm h-9 px-2.5 sm:px-3 sm:py-1.5 inline-flex items-center justify-center gap-1.5"
            aria-label="ফোন করুন"
          >
            <PiPhoneLight className="text-base sm:text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">০১৮১৯-৭৫৯৮৬৮</span>
            <span className="inline sm:hidden text-xs">কল</span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn--glass btn--sm h-9 w-9 !p-0 inline-flex items-center justify-center"
            aria-label="থিম বদলান"
          >
            {mounted && isDark ? (
              <PiSunLight className="text-base" aria-hidden="true" />
            ) : (
              <PiMoonLight className="text-base" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
