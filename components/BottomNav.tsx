'use client';

import React from 'react';
import { CategoryFilter } from '@/types/menu';
import { toBn } from '@/data/menuData';
import {
  PiSquaresFourLight,
  PiHamburgerLight,
  PiPintGlassLight,
  PiCoffeeLight,
  PiHeartFill,
  PiHeartLight,
  PiPhoneLight,
} from 'react-icons/pi';

export interface BottomNavProps {
  activeCat: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  favCount: number;
}

export function BottomNav({
  activeCat,
  onSelectCategory,
  favCount,
}: BottomNavProps) {
  const handleTap = (cat: CategoryFilter) => {
    onSelectCategory(cat);
    const top = document.getElementById('menuTop');
    if (top) {
      top.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="মোবাইল অ্যাপ নেভিগেশন"
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--bg-base)]/90 backdrop-blur-[16px] border-t border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)] transition-colors"
    >
      <div className="flex items-center justify-around h-15 px-2">
        <button
          type="button"
          onClick={() => handleTap('all')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-colors active:scale-90 ${
            activeCat === 'all'
              ? 'text-[var(--tone-strong)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--tone-strong)]'
          }`}
          aria-label="সব মেনু"
        >
          <PiSquaresFourLight className="text-xl" aria-hidden="true" />
          <span className="text-[10px] font-mono mt-0.5">সব</span>
          {activeCat === 'all' && (
            <span className="w-1 h-1 rounded-full bg-[var(--tone-strong)] mt-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTap('snacks')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-colors active:scale-90 ${
            activeCat === 'snacks'
              ? 'text-[var(--tone-strong)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--tone-strong)]'
          }`}
          aria-label="স্ন্যাকস মেনু"
        >
          <PiHamburgerLight className="text-xl" aria-hidden="true" />
          <span className="text-[10px] font-mono mt-0.5">স্ন্যাকস</span>
          {activeCat === 'snacks' && (
            <span className="w-1 h-1 rounded-full bg-[var(--tone-strong)] mt-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTap('drinks')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-colors active:scale-90 ${
            activeCat === 'drinks'
              ? 'text-[var(--tone-strong)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--tone-strong)]'
          }`}
          aria-label="ড্রিংকস মেনু"
        >
          <PiPintGlassLight className="text-xl" aria-hidden="true" />
          <span className="text-[10px] font-mono mt-0.5">ড্রিংকস</span>
          {activeCat === 'drinks' && (
            <span className="w-1 h-1 rounded-full bg-[var(--tone-strong)] mt-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTap('tea_coffee')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 transition-colors active:scale-90 ${
            activeCat === 'tea_coffee'
              ? 'text-[var(--tone-strong)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--tone-strong)]'
          }`}
          aria-label="চা ও কফি মেনু"
        >
          <PiCoffeeLight className="text-xl" aria-hidden="true" />
          <span className="text-[10px] font-mono mt-0.5">চা-কফি</span>
          {activeCat === 'tea_coffee' && (
            <span className="w-1 h-1 rounded-full bg-[var(--tone-strong)] mt-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTap('fav')}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 relative transition-colors active:scale-90 ${
            activeCat === 'fav'
              ? 'text-[var(--tone-strong)] font-medium'
              : 'text-[var(--text-muted)] hover:text-[var(--tone-strong)]'
          }`}
          aria-label="পছন্দের তালিকা"
        >
          <div className="relative">
            {favCount > 0 ? (
              <PiHeartFill className="text-xl" aria-hidden="true" />
            ) : (
              <PiHeartLight className="text-xl" aria-hidden="true" />
            )}
            {favCount > 0 && (
              <span className="absolute -top-1 -right-2 rounded-full bg-[var(--tone-strong)] text-[var(--bg-base)] text-[9px] font-mono px-1 min-w-[14px] h-[14px] flex items-center justify-center">
                {toBn(favCount)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono mt-0.5">পছন্দ</span>
          {activeCat === 'fav' && (
            <span className="w-1 h-1 rounded-full bg-[var(--tone-strong)] mt-0.5" />
          )}
        </button>

        <a
          href="tel:01819759868"
          className="flex-1 flex flex-col items-center justify-center py-1.5 text-[var(--text-muted)] hover:text-[var(--tone-strong)] transition-colors active:scale-90"
          aria-label="কল করুন"
        >
          <PiPhoneLight className="text-xl" aria-hidden="true" />
          <span className="text-[10px] font-mono mt-0.5">কল</span>
        </a>
      </div>
    </nav>
  );
}

export default BottomNav;
