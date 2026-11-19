'use client';

import { useOpeningHours } from '@/hooks/useOpeningHours';
import { PiMapPinLight, PiPhoneLight, PiMapTrifoldLight } from 'react-icons/pi';

export function Footer() {
  const { hoursText, isReady } = useOpeningHours();

  return (
    <footer className="bg-[#151515] text-[var(--light-100)] border-t border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center space-y-4 sm:space-y-5">
        <h2 className="h4 font-heading font-medium text-xl sm:text-2xl text-[var(--light-100)]">
          ঘরোয়া স্বাদ রেস্টুরেন্ট
        </h2>
        <p className="body-md text-xs sm:text-sm text-[var(--neutral-400)] max-w-md mx-auto flex items-center justify-center gap-1.5">
          <PiMapPinLight className="text-base shrink-0" aria-hidden="true" />
          <span>মহিলা কলেজ রোড, পাসপোর্ট অফিস সংলগ্ন, খাগড়াছড়ি সদর</span>
        </p>
        {isReady && hoursText ? (
          <p className="font-mono text-xs text-[var(--neutral-400)]">
            {hoursText}
          </p>
        ) : null}
        <div className="flex flex-col xs:flex-row sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 pt-2 max-w-xs sm:max-w-none mx-auto">
          <a href="tel:01819759868" className="btn btn--glass btn--sm h-10 inline-flex items-center justify-center gap-1.5 active:scale-95">
            <PiPhoneLight className="text-sm" aria-hidden="true" />
            <span>০১৮১৯-৭৫৯৮৬৮</span>
          </a>
          <a href="tel:01577773404" className="btn btn--glass btn--sm h-10 inline-flex items-center justify-center gap-1.5 active:scale-95">
            <PiPhoneLight className="text-sm" aria-hidden="true" />
            <span>০১৫৭৭-৭৭৩৪০৪</span>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mohila+College+Road+Khagrachari+Sadar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--glass btn--sm h-10 inline-flex items-center justify-center gap-1.5 active:scale-95"
          >
            <PiMapTrifoldLight className="text-sm" aria-hidden="true" />
            <span>ম্যাপে দেখুন</span>
          </a>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-[var(--neutral-800)] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 font-mono text-[11px] sm:text-xs text-[var(--neutral-500)]">
          <span>© ঘরোয়া স্বাদ রেস্টুরেন্ট</span>
          <span>ডিজিটাল মেনু · সব দাম টাকায়</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
