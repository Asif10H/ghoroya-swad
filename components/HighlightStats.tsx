import { toBn } from '@/data/menuData';
import { PiBowlFoodLight, PiHamburgerLight, PiCoffeeLight } from 'react-icons/pi';

export interface HighlightStatsProps {
  totalCount: number;
  snacksCount: number;
  drinksCount: number;
}

export function HighlightStats({
  totalCount,
  snacksCount,
  drinksCount,
}: HighlightStatsProps) {
  return (
    <section
      className="border-b border-[var(--border-subtle)] bg-[var(--neutral-white)] py-4 sm:py-6 transition-colors"
      aria-label="রেস্টুরেন্ট পরিসংখ্যান"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="py-0.5 sm:py-1">
          <div className="font-heading font-medium text-xl sm:text-3xl text-[var(--tone-strong)] tabular-nums">
            {toBn(totalCount)}
          </div>
          <div className="text-[var(--text-muted)] mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5">
            <PiBowlFoodLight className="text-xs sm:text-sm" aria-hidden="true" />
            <span>মোট আইটেম</span>
          </div>
        </div>
        <div className="py-0.5 sm:py-1 border-x border-[var(--border-subtle)]">
          <div className="font-heading font-medium text-xl sm:text-3xl text-[var(--tone-strong)] tabular-nums">
            {toBn(snacksCount)}
          </div>
          <div className="text-[var(--text-muted)] mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5">
            <PiHamburgerLight className="text-xs sm:text-sm" aria-hidden="true" />
            <span>স্ন্যাকস</span>
          </div>
        </div>
        <div className="py-0.5 sm:py-1">
          <div className="font-heading font-medium text-xl sm:text-3xl text-[var(--tone-strong)] tabular-nums">
            {toBn(drinksCount)}
          </div>
          <div className="text-[var(--text-muted)] mt-1 font-mono uppercase text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5">
            <PiCoffeeLight className="text-xs sm:text-sm" aria-hidden="true" />
            <span>ড্রিংকস</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HighlightStats;
