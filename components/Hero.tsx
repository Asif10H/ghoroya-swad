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
    <section className="relative overflow-hidden bg-[#151515] text-[var(--light-100)] pt-8 sm:pt-14 pb-14 sm:pb-24">
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
        <div className="text-center mt-4 sm:mt-10 max-w-3xl mx-auto pop">
          <p className="eyebrow text-[var(--neutral-400)] tracking-widest text-[11px] sm:text-xs">
            ঘরের স্বাদ · মনের মতো
          </p>
          <h1 className="h2 font-heading font-medium text-3xl sm:text-5xl mt-2.5 sm:mt-3 text-white tracking-tight leading-tight">
            ঘরোয়া স্বাদ
          </h1>
          <p className="font-heading text-lg sm:text-2xl text-[var(--light-88)] mt-1">
            রেস্টুরেন্ট
          </p>
          <p className="mt-2.5 sm:mt-3 text-[var(--neutral-400)] text-xs sm:text-base max-w-lg mx-auto">
            স্ন্যাকস · জুস · পাস্তা · ডিনার
          </p>

          {/* Real-time status badge */}
          <div className="mt-4 sm:mt-5 flex justify-center min-h-[30px]">
            {isReady && statusBadgeText ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--light-16)] border border-[var(--light-16)] px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono text-[var(--light-100)] backdrop-blur-[16px]">
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
          <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row sm:flex-row justify-center items-stretch sm:items-center gap-2.5 sm:gap-3 max-w-xs sm:max-w-none mx-auto">
            <a href="#menuTop" className="btn btn--primary btn--pill h-11 sm:h-10 inline-flex items-center justify-center gap-2">
              <span>মেনু দেখুন</span>
              <PiArrowDownLight className="text-sm" aria-hidden="true" />
            </a>
            <a href="tel:01819759868" className="btn btn--glass btn--pill h-11 sm:h-10 inline-flex items-center justify-center gap-2">
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
