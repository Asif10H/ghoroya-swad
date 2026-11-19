'use client';

import Header from './Header';
import { useOpeningHours } from '@/hooks/useOpeningHours';
import { PiArrowDownLight, PiPhoneLight } from 'react-icons/pi';

export interface HeroProps {
  hideHeader?: boolean;
}

const heroGradientStyle = { background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)' };
const vignetteBottomStyle = { background: 'var(--vignette-bottom)' };

export function Hero({ hideHeader = true }: HeroProps) {
  const { statusBadgeText, isOpen, isReady } = useOpeningHours();

  return (
    <section className="relative overflow-hidden bg-[#151515] text-[var(--light-100)] pt-6 sm:pt-12 pb-8 sm:pb-14">
      {/* Background culinary photography layer */}
      <img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
        alt=""
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
        <div className="text-center mt-2 sm:mt-6 max-w-3xl mx-auto">
          <p className="font-mono uppercase tracking-[0.08em] text-[var(--neutral-400)] text-[11px] sm:text-xs">
            ঘরের স্বাদ · মনের মতো
          </p>
          <h1 className="h2 font-heading font-medium text-3xl sm:text-5xl mt-2 text-white tracking-tight leading-tight">
            ঘরোয়া স্বাদ
          </h1>
          <p className="font-heading text-lg sm:text-2xl text-[var(--light-88)] mt-0.5 sm:mt-1">
            রেস্টুরেন্ট
          </p>
          <p className="mt-2 text-[var(--neutral-400)] text-xs sm:text-sm max-w-lg mx-auto">
            স্ন্যাকস · জুস · পাস্তা · ডিনার
          </p>

          {/* Real-time status badge */}
          <div className="mt-3.5 sm:mt-4 flex justify-center min-h-[28px]">
            {isReady && statusBadgeText ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--light-16)] border border-[var(--light-16)] px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono text-[var(--light-100)] backdrop-blur-[16px]">
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
              className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-full bg-white text-[#151515] font-mono text-xs font-medium hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer"
            >
              <span>মেনু দেখুন</span>
              <PiArrowDownLight className="text-sm" aria-hidden="true" />
            </a>
            <a
              href="tel:01819759868"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 sm:px-6 rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-[16px] hover:bg-white/20 active:scale-95 transition-all text-xs font-mono cursor-pointer"
            >
              <PiPhoneLight className="text-base" aria-hidden="true" />
              <span>কল করুন</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
