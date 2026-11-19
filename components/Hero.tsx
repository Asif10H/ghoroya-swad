'use client';

import Header from './Header';
import { useOpeningHours } from '@/hooks/useOpeningHours';
import { CATEGORIES, toBn } from '@/data/menuData';
import {
  PiArrowDownLight,
  PiPhoneLight,
  PiBowlFoodLight,
  PiHamburgerLight,
  PiCoffeeLight,
} from 'react-icons/pi';

export interface HeroProps {
  hideHeader?: boolean;
  totalCount?: number;
  snacksCount?: number;
  drinksCount?: number;
}

const heroGradientStyle = {
  background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.92) 100%)',
};
const vignetteBottomStyle = { background: 'var(--vignette-bottom)' };

export function Hero({
  hideHeader = true,
  totalCount,
  snacksCount,
  drinksCount,
}: HeroProps) {
  const { statusBadgeText, isOpen, isReady } = useOpeningHours();

  const defaultTotal = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);
  const defaultSnacks = CATEGORIES.find((c) => c.id === 'snacks')?.items.length || 0;
  const defaultDrinks = CATEGORIES.find((c) => c.id === 'drinks')?.items.length || 0;

  const total = totalCount ?? defaultTotal;
  const snacks = snacksCount ?? defaultSnacks;
  const drinks = drinksCount ?? defaultDrinks;

  const handleSelectCategory = (cat: 'all' | 'snacks' | 'drinks') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gs-select-cat', { detail: cat }));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#151515] text-[var(--light-100)] pt-8 sm:pt-14 pb-10 sm:pb-14">
      {/* Background culinary photography layer */}
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
        alt="ঘরোয়া স্বাদ রেস্টুরেন্ট ব্যানার"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
      />

      {/* Photo vignettes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={heroGradientStyle}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={vignetteBottomStyle}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {!hideHeader && <Header />}

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <p className="font-mono uppercase tracking-[0.12em] text-[var(--neutral-400)] text-[11px] sm:text-xs">
            ঘরের স্বাদ · মনের মতো
          </p>

          {/* Main Title & Subtitle */}
          <h1 className="h2 font-heading font-medium text-3xl sm:text-5xl mt-2 text-white tracking-tight leading-tight">
            ঘরোয়া স্বাদ
          </h1>
          <p className="font-heading font-normal text-lg sm:text-2xl text-[var(--light-88)] mt-0.5 sm:mt-1">
            রেস্টুরেন্ট
          </p>
          <p className="mt-2 text-[var(--neutral-400)] text-xs sm:text-sm max-w-lg mx-auto">
            স্ন্যাকস · জুস · পাস্তা · ডিনার
          </p>

          {/* Real-time status badge */}
          <div className="mt-3.5 sm:mt-4 flex justify-center min-h-[28px]">
            {isReady && statusBadgeText ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--light-16)] border border-[var(--light-16)] px-3.5 py-1 text-[11px] sm:text-xs font-mono text-[var(--light-100)] backdrop-blur-[16px]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOpen ? 'bg-[var(--light-100)]' : 'border border-[var(--light-48)]'
                  }`}
                  aria-hidden="true"
                />
                <span>{statusBadgeText}</span>
              </div>
            ) : null}
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-5 sm:mt-6 flex flex-row justify-center items-center gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto">
            <a
              href="#menuTop"
              onClick={() => handleSelectCategory('all')}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-lg bg-white text-[#151515] font-mono text-xs font-medium hover:bg-neutral-200 active:scale-95 transition-colors cursor-pointer"
            >
              <span>মেনু দেখুন</span>
              <PiArrowDownLight className="text-sm" aria-hidden="true" />
            </a>
            <a
              href="tel:01793871658"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-[16px] hover:bg-white/20 active:scale-95 transition-colors text-xs font-mono cursor-pointer"
            >
              <PiPhoneLight className="text-base" aria-hidden="true" />
              <span>কল করুন</span>
            </a>
          </div>

          {/* Integrated Interactive Menu Highlights (Merged Section) */}
          <div className="mt-8 sm:mt-10 max-w-xl mx-auto">
            <div
              className="grid grid-cols-3 divide-x divide-white/10 rounded-lg bg-white/[0.04] border border-white/10 backdrop-blur-[16px] p-2 sm:p-3"
              aria-label="মেনু হাইলাইটস ও পরিসংখ্যান"
            >
              {/* Total items */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('all')}
                className="group flex flex-col items-center justify-center py-2 px-1 sm:px-3 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer text-center"
                title="সব মেনু আইটেম দেখুন"
              >
                <span className="font-heading font-medium text-2xl sm:text-3xl text-white tabular-nums group-hover:scale-105 transition-transform">
                  {toBn(total)}
                </span>
                <span className="text-[var(--neutral-400)] group-hover:text-white mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors">
                  <PiBowlFoodLight className="text-xs sm:text-sm text-neutral-300" aria-hidden="true" />
                  <span>মোট আইটেম</span>
                </span>
              </a>

              {/* Snacks */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('snacks')}
                className="group flex flex-col items-center justify-center py-2 px-1 sm:px-3 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer text-center"
                title="স্ন্যাকস মেনু দেখুন"
              >
                <span className="font-heading font-medium text-2xl sm:text-3xl text-white tabular-nums group-hover:scale-105 transition-transform">
                  {toBn(snacks)}
                </span>
                <span className="text-[var(--neutral-400)] group-hover:text-white mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors">
                  <PiHamburgerLight className="text-xs sm:text-sm text-neutral-300" aria-hidden="true" />
                  <span>স্ন্যাকস</span>
                </span>
              </a>

              {/* Drinks & Juice */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('drinks')}
                className="group flex flex-col items-center justify-center py-2 px-1 sm:px-3 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer text-center"
                title="ড্রিংকস ও জুস মেনু দেখুন"
              >
                <span className="font-heading font-medium text-2xl sm:text-3xl text-white tabular-nums group-hover:scale-105 transition-transform">
                  {toBn(drinks)}
                </span>
                <span className="text-[var(--neutral-400)] group-hover:text-white mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 transition-colors">
                  <PiCoffeeLight className="text-xs sm:text-sm text-neutral-300" aria-hidden="true" />
                  <span>ড্রিংকস</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
