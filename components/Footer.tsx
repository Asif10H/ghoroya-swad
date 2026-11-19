'use client';

import { useOpeningHours } from '@/hooks/useOpeningHours';
import { PiMapPinLight, PiPhoneCallLight, PiMapTrifoldLight } from 'react-icons/pi';

export function Footer() {
  const { isOpen, statusBadgeText, hoursText, isReady } = useOpeningHours();

  return (
    <footer className="bg-[var(--bg-base)] text-[var(--tone-strong)] border-t border-[var(--border-subtle)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-14 space-y-6 sm:space-y-8">
        {/* Brand & Opening Hours */}
        <div className="text-center space-y-3">
          <h2 className="font-heading font-medium text-2xl sm:text-3xl text-[var(--tone-strong)] tracking-tight">
            ঘরোয়া স্বাদ রেস্টুরেন্ট
          </h2>
          <p className="text-xs sm:text-sm text-[var(--tone-medium)] font-sans max-w-md mx-auto leading-relaxed">
            ঘরের সতেজ স্বাদ আর খাঁটি ভালোবাসায় তৈরি প্রতিটি খাবার।
          </p>
        </div>

        {/* Location & Quick Action Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {/* Address Card */}
          <div className="bg-[var(--neutral-white)] rounded-lg p-3.5 sm:p-4 border border-[var(--border-subtle)] flex flex-col justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--tone-faint)] text-[var(--tone-strong)] flex items-center justify-center shrink-0 border border-[var(--border-subtle)] mt-0.5">
                <PiMapPinLight className="text-base" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  রেস্টুরেন্ট লোকেশন
                </span>
                <p className="text-xs sm:text-sm text-[var(--tone-strong)] mt-0.5 leading-snug">
                  মহিলা কলেজ রোড, পাসপোর্ট অফিস সংলগ্ন, খাগড়াছড়ি সদর
                </p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Mohila+College+Road+Khagrachari+Sadar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--tone-faint)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PiMapTrifoldLight className="text-sm" aria-hidden="true" />
              <span>Google Maps-এ দেখুন</span>
            </a>
          </div>

          {/* Quick Phone Call Card */}
          <div className="bg-[var(--neutral-white)] rounded-lg p-3.5 sm:p-4 border border-[var(--border-subtle)] flex flex-col justify-between gap-3">
            <div>
              <span className="block text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                সরাসরি অর্ডার ও যোগাযোগ
              </span>
              <p className="text-xs text-[var(--tone-medium)] leading-snug">
                খাবারের অর্ডার ও তথ্যের জন্য সরাসরি কল করুন:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:01819759868"
                className="h-9 px-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--tone-faint)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                aria-label="কল করুন: 01819-759868"
              >
                <PiPhoneCallLight className="text-xs shrink-0" aria-hidden="true" />
                <span className="truncate">01819-759868</span>
              </a>
              <a
                href="tel:01577773404"
                className="h-9 px-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--tone-faint)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer"
                aria-label="কল করুন: 01577-773404"
              >
                <PiPhoneCallLight className="text-xs shrink-0" aria-hidden="true" />
                <span className="truncate">01577-773404</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono text-[11px] sm:text-xs text-[var(--text-muted)] text-center sm:text-left">
          <span>© ২০২৬ ঘরোয়া স্বাদ রেস্টুরেন্ট</span>
          <span className="flex items-center gap-1">
            <span>কারিগরী সহায়তায়:</span>
            <a
              href="https://facebook.com/asif10h"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--tone-strong)] font-medium hover:underline underline-offset-2 transition-colors"
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
