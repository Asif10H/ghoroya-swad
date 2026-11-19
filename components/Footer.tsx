'use client';

import { useOpeningHours } from '@/hooks/useOpeningHours';

export function Footer() {
  const { hoursText, isReady } = useOpeningHours();

  return (
    <footer className="bg-[#151515] text-[var(--light-100)] border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center space-y-5">
        <h2 className="h4 font-heading font-medium text-2xl text-[var(--light-100)]">
          ঘরোয়া স্বাদ রেস্টুরেন্ট
        </h2>
        <p className="body-md text-[var(--neutral-400)] max-w-md mx-auto">
          📍 মহিলা কলেজ রোড, পাসপোর্ট অফিস সংলগ্ন, খাগড়াছড়ি সদর
        </p>
        {isReady && hoursText ? (
          <p className="font-mono text-xs text-[var(--neutral-400)]">
            {hoursText}
          </p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href="tel:01819759868" className="btn btn--glass btn--sm">
            📞 ০১৮১৯-৭৫৯৮৬৮
          </a>
          <a href="tel:01577773404" className="btn btn--glass btn--sm">
            📞 ০১৫৭৭-৭৭৩৪০৪
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Mohila+College+Road+Khagrachari+Sadar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--glass btn--sm"
          >
            🗺️ ম্যাপে দেখুন
          </a>
        </div>
        <div className="pt-8 border-t border-[var(--neutral-800)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[var(--neutral-500)]">
          <span>© ঘরোয়া স্বাদ রেস্টুরেন্ট</span>
          <span>ডিজিটাল মেনু · সব দাম টাকায়</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
