import { toBn } from '@/data/menuData';

export interface HighlightStatsProps {
  totalCount: number;
  snacksCount: number;
  drinksCount: number;
}

export default function HighlightStats({
  totalCount,
  snacksCount,
  drinksCount,
}: HighlightStatsProps) {
  return (
    <section
      className="border-b border-[var(--border-subtle)] bg-[var(--neutral-white)] py-10"
      aria-label="রেস্টুরেন্ট পরিসংখ্যান"
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
        <div className="py-2">
          <div className="h1 font-heading font-medium text-[var(--tone-strong)] tabular-nums">
            {toBn(totalCount)}
          </div>
          <div className="body-sm text-[var(--text-muted)] mt-1 font-mono uppercase text-xs">
            মোট আইটেম
          </div>
        </div>
        <div className="py-2 border-x border-[var(--border-subtle)]">
          <div className="h1 font-heading font-medium text-[var(--tone-strong)] tabular-nums">
            {toBn(snacksCount)}
          </div>
          <div className="body-sm text-[var(--text-muted)] mt-1 font-mono uppercase text-xs">
            স্ন্যাকস
          </div>
        </div>
        <div className="py-2">
          <div className="h1 font-heading font-medium text-[var(--tone-strong)] tabular-nums">
            {toBn(drinksCount)}
          </div>
          <div className="body-sm text-[var(--text-muted)] mt-1 font-mono uppercase text-xs">
            ড্রিংকস
          </div>
        </div>
      </div>
    </section>
  );
}
