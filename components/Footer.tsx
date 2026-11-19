'use client';

import { useOpeningHours } from '@/hooks/useOpeningHours';
import { PiMapPinLight, PiPhoneLight, PiMapTrifoldLight } from 'react-icons/pi';

export function Footer() {
  const { hoursText, isReady } = useOpeningHours();

  return (
    <footer className="bg-[var(--bg-base)] text-[var(--tone-strong)] border-t border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center space-y-4 sm:space-y-5">
        <h2 className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)]">
          ঘরোয়া স্বাদ রেস্টুরেন্ট
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto flex items-center justify-center gap-1.5">
          <PiMapPinLight className="text-base shrink-0" aria-hidden="true" />
          <span>মহিলা কলেজ রোড, পাসপোর্ট অফিস সংলগ্ন, খাগড়াছড়ি সদর</span>
        </p>
        {isReady && hoursText ? (
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {hoursText}
          </p>
        ) : null}
        <div className="flex flex-col xs:flex-row sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 pt-2 max-w-xs sm:max-w-none mx-auto">
          <a
            href="tel:01819759868"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] text-[var(--tone-strong)] backdrop-blur-md hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono cursor-pointer"
          >
            <PiPhoneLight className="text-sm" aria-hidden="true" />
            <span>01819-759868</span>
          </a>
          <a
            href="tel:01577773404"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] text-[var(--tone-strong)] backdrop-blur-md hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono cursor-pointer"
          >
            <PiPhoneLight className="text-sm" aria-hidden="true" />
            <span>01577-773404</span>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mohila+College+Road+Khagrachari+Sadar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] text-[var(--tone-strong)] backdrop-blur-md hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono cursor-pointer"
          >
            <PiMapTrifoldLight className="text-sm" aria-hidden="true" />
            <span>ম্যাপে দেখুন</span>
          </a>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 font-mono text-[11px] sm:text-xs text-[var(--text-muted)]">
          <span>© ঘরোয়া স্বাদ রেস্টুরেন্ট</span>
          <span>
            Developed by{' '}
            <a
              href="https://facebook.com/asif10h"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--tone-strong)] hover:underline underline-offset-2 transition-colors"
            >
              Habibullah Asif
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
