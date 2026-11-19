'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
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
    <nav
      className={`flex items-center justify-between pb-10 border-b border-[var(--light-16)] ${className}`.trim()}
      aria-label="প্রধান নেভিগেশন"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">
          🍽️
        </span>
        <span className="font-heading font-medium tracking-tight text-lg text-white">
          ঘরোয়া স্বাদ
        </span>
      </div>
      <div className="flex items-center gap-3">
        <a
          href="tel:01819759868"
          className="btn btn--glass btn--sm hidden sm:inline-flex"
          aria-label="ফোন করুন"
        >
          ০১৮১৯-৭৫৯৮৬৮
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          className="btn btn--glass btn--sm h-8 w-8 !p-0"
          aria-label="থিম বদলান"
        >
          <span aria-hidden="true">{mounted && isDark ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </nav>
  );
}
