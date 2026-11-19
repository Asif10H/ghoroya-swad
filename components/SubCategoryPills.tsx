'use client';

import React from 'react';
import { SUB_CATEGORIES, SubCategoryDef } from '@/data/menuData';
import { CategoryFilter } from '@/types/menu';

interface SubCategoryPillsProps {
  activeCat: CategoryFilter;
  activeSubCat: string;
  onSelectSubCat: (subCatId: string) => void;
}

export default function SubCategoryPills({
  activeCat,
  activeSubCat,
  onSelectSubCat,
}: SubCategoryPillsProps) {
  // Filter subcategories according to the active main category
  const visibleSubCats = SUB_CATEGORIES.filter((sub) => {
    if (sub.id === 'all') return true;
    if (activeCat === 'snacks') return sub.catId === 'snacks';
    if (activeCat === 'drinks') return sub.catId === 'drinks';
    return true; // if 'all' or 'fav', show all
  });

  if (visibleSubCats.length <= 1) return null;

  return (
    <div className="w-full overflow-x-auto py-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
      <div className="flex items-center gap-1.5 min-w-max px-0.5">
        {visibleSubCats.map((sub: SubCategoryDef) => {
          const isActive = activeSubCat === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubCat(sub.id)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 border cursor-pointer select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                  : 'bg-[var(--bg-base)] text-[var(--tone-medium)] border-[var(--border-subtle)] hover:text-[var(--tone-strong)] hover:border-[var(--dark-32)] dark:hover:border-[var(--light-32)]'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
