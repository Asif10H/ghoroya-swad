'use client';

import Header from './Header';
import { useOpeningHours } from '@/hooks/useOpeningHours';
import { CATEGORIES, toBn } from '@/data/menuData';
import {
  PiArrowDownLight,
  PiPhoneCallLight,
  PiPhoneLight,
  PiBowlFoodLight,
  PiHamburgerLight,
  PiCoffeeLight,
  PiPintGlassLight,
} from 'react-icons/pi';

export interface HeroProps {
  hideHeader?: boolean;
  totalCount?: number;
  snacksCount?: number;
  drinksCount?: number;
  teaCoffeeCount?: number;
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
  teaCoffeeCount,
}: HeroProps) {
  const { statusBadgeText, isOpen, isReady } = useOpeningHours();

  const defaultTotal = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);
  const defaultSnacks = CATEGORIES.find((c) => c.id === 'snacks')?.items.length || 0;
  const defaultDrinks = CATEGORIES.find((c) => c.id === 'drinks')?.items.length || 0;
  const defaultTeaCoffee = CATEGORIES.find((c) => c.id === 'tea_coffee')?.items.length || 0;

  const total = totalCount ?? defaultTotal;
  const snacks = snacksCount ?? defaultSnacks;
  const drinks = drinksCount ?? defaultDrinks;
  const teaCoffee = teaCoffeeCount ?? defaultTeaCoffee;

  const handleSelectCategory = (cat: 'all' | 'snacks' | 'drinks' | 'tea_coffee') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gs-select-cat', { detail: cat }));
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)] text-[var(--tone-strong)] pt-8 sm:pt-14 pb-10 sm:pb-14 transition-colors">
      {/* Background culinary photography layer */}
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
        alt="ঘরোয়া স্বাদ রেস্টুরেন্ট ব্যানার"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
      />

      {/* Photo vignettes */}
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={heroGradientStyle}
      />
      <div
        className="hidden dark:block absolute inset-0 pointer-events-none"
        style={vignetteBottomStyle}
      />
      <div
        className="dark:hidden absolute inset-0 pointer-events-none bg-[var(--bg-base)]/80"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {!hideHeader && <Header />}

        {/* 2-Column Responsive Split: Side-by-Side on Desktop (md:), Stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mt-2 sm:mt-6">
          {/* Left Column: Brand, Tagline, Live Status & Primary CTAs */}
          <div className="md:col-span-7 text-center md:text-left">
            {/* Eyebrow kicker */}
            <p className="font-mono uppercase tracking-[0.14em] text-[var(--text-muted)] text-[11px] sm:text-xs">
              ঘরের স্বাদ · মনের মতো
            </p>

            {/* Main Title & Subtitle */}
            <h1 className="h2 font-heading font-medium text-3xl sm:text-5xl lg:text-6xl mt-2 text-[var(--tone-strong)] tracking-tight leading-tight">
              ঘরোয়া স্বাদ
            </h1>
            <p className="font-heading font-normal text-lg sm:text-2xl text-[var(--tone-medium)] mt-0.5 sm:mt-1">
              রেস্টুরেন্ট
            </p>
            <p className="mt-2 text-[var(--text-muted)] text-xs sm:text-sm max-w-lg mx-auto md:mx-0">
              স্ন্যাকস · জুস · পাস্তা · ডিনার
            </p>

            {/* Real-time status badge */}
            <div className="mt-3.5 sm:mt-4 flex justify-center md:justify-start min-h-[28px]">
              {isReady && statusBadgeText ? (
                <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--neutral-white)] dark:bg-white/10 border border-[var(--border-subtle)] px-3.5 py-1 text-[11px] sm:text-xs font-mono text-[var(--tone-strong)] backdrop-blur-[16px]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOpen ? 'bg-[var(--tone-strong)]' : 'border border-[var(--border-subtle)]'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{statusBadgeText}</span>
                </div>
              ) : null}
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="mt-5 sm:mt-6 flex flex-row justify-center md:justify-start items-center gap-2.5 sm:gap-3">
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('all')}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] font-mono text-xs font-medium hover:opacity-90 active:scale-95 transition-opacity cursor-pointer"
              >
                <span>মেনু দেখুন</span>
                <PiArrowDownLight className="text-sm" aria-hidden="true" />
              </a>
              <a
                href="tel:01819759868"
                className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] text-[var(--tone-strong)] backdrop-blur-[16px] hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono cursor-pointer"
              >
                <PiPhoneCallLight className="text-sm text-[var(--tone-strong)]" aria-hidden="true" />
                <span>কল করুন</span>
              </a>
            </div>
          </div>

          {/* Right Column: Side-by-Side Highlights & Stats Dock */}
          <div className="md:col-span-5 w-full">
            {/* Desktop: Vertical 4-card stack; Mobile: 4-column horizontal grid */}
            <div
              className="grid grid-cols-4 md:grid-cols-1 divide-x md:divide-x-0 md:divide-y divide-[var(--border-subtle)] rounded-lg bg-[var(--neutral-white)] dark:bg-white/[0.04] border border-[var(--border-subtle)] backdrop-blur-[16px] p-2 sm:p-2.5"
              aria-label="মেনু হাইলাইটস ও পরিসংখ্যান"
            >
              {/* 36 Total Items */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('all')}
                className="group flex flex-col md:flex-row md:items-center md:justify-between py-2 md:py-2.5 px-1.5 md:px-3.5 rounded-lg text-center md:text-left hover:bg-[var(--bg-lift)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="সব মেনু আইটেম দেখুন"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <span className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)] tabular-nums group-hover:scale-105 transition-transform">
                    {toBn(total)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[var(--tone-strong)] text-xs sm:text-sm font-medium hidden md:inline">
                      সকল মেনু আইটেম
                    </span>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] font-mono uppercase text-[9px] sm:text-xs flex items-center justify-center md:justify-start gap-1 transition-colors">
                      <PiBowlFoodLight className="text-xs text-[var(--text-muted)] group-hover:text-[var(--tone-strong)]" aria-hidden="true" />
                      <span>মোট</span>
                    </span>
                  </div>
                </div>
                <span className="hidden md:inline-flex text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] transition-colors">
                  দেখুন →
                </span>
              </a>

              {/* 19 Snacks */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('snacks')}
                className="group flex flex-col md:flex-row md:items-center md:justify-between py-2 md:py-2.5 px-1.5 md:px-3.5 rounded-lg text-center md:text-left hover:bg-[var(--bg-lift)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="স্ন্যাকস মেনু দেখুন"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <span className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)] tabular-nums group-hover:scale-105 transition-transform">
                    {toBn(snacks)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[var(--tone-strong)] text-xs sm:text-sm font-medium hidden md:inline">
                      মচমচে স্ন্যাকস ও চাট
                    </span>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] font-mono uppercase text-[9px] sm:text-xs flex items-center justify-center md:justify-start gap-1 transition-colors">
                      <PiHamburgerLight className="text-xs text-[var(--text-muted)] group-hover:text-[var(--tone-strong)]" aria-hidden="true" />
                      <span>স্ন্যাকস</span>
                    </span>
                  </div>
                </div>
                <span className="hidden md:inline-flex text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] transition-colors">
                  দেখুন →
                </span>
              </a>

              {/* 13 Drinks & Juice */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('drinks')}
                className="group flex flex-col md:flex-row md:items-center md:justify-between py-2 md:py-2.5 px-1.5 md:px-3.5 rounded-lg text-center md:text-left hover:bg-[var(--bg-lift)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="ড্রিংকস ও জুস মেনু দেখুন"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <span className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)] tabular-nums group-hover:scale-105 transition-transform">
                    {toBn(drinks)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[var(--tone-strong)] text-xs sm:text-sm font-medium hidden md:inline">
                      লাচ্ছি, জুস ও শেক
                    </span>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] font-mono uppercase text-[9px] sm:text-xs flex items-center justify-center md:justify-start gap-1 transition-colors">
                      <PiPintGlassLight className="text-xs text-[var(--text-muted)] group-hover:text-[var(--tone-strong)]" aria-hidden="true" />
                      <span>ড্রিংকস</span>
                    </span>
                  </div>
                </div>
                <span className="hidden md:inline-flex text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] transition-colors">
                  দেখুন →
                </span>
              </a>

              {/* 4 Tea & Coffee */}
              <a
                href="#menuTop"
                onClick={() => handleSelectCategory('tea_coffee')}
                className="group flex flex-col md:flex-row md:items-center md:justify-between py-2 md:py-2.5 px-1.5 md:px-3.5 rounded-lg text-center md:text-left hover:bg-[var(--bg-lift)] dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                title="চা ও কফি মেনু দেখুন"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <span className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)] tabular-nums group-hover:scale-105 transition-transform">
                    {toBn(teaCoffee)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[var(--tone-strong)] text-xs sm:text-sm font-medium hidden md:inline">
                      গরম ও কোল্ড চা-কফি
                    </span>
                    <span className="text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] font-mono uppercase text-[9px] sm:text-xs flex items-center justify-center md:justify-start gap-1 transition-colors">
                      <PiCoffeeLight className="text-xs text-[var(--text-muted)] group-hover:text-[var(--tone-strong)]" aria-hidden="true" />
                      <span>চা-কফি</span>
                    </span>
                  </div>
                </div>
                <span className="hidden md:inline-flex text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--tone-strong)] transition-colors">
                  দেখুন →
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
