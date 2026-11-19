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
  // Only show subcategories relevant to the current main category
  // Exclude redundant 'all' chip since main category already represents all items
  const visibleSubCats = SUB_CATEGORIES.filter((sub) => {
    if (sub.id === 'all') return false;
    if (activeCat === 'snacks') return sub.catId === 'snacks';
    if (activeCat === 'drinks') return sub.catId === 'drinks';
    return true; // Show all specific subcategories when 'all' is active
  });

  if (visibleSubCats.length === 0 || activeCat === 'fav') return null;

  return (
    <div className="w-full overflow-x-auto py-0.5 no-scrollbar">
      <div className="flex items-center gap-1.5 min-w-max">
        {visibleSubCats.map((sub: SubCategoryDef) => {
          const isActive = activeSubCat === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectSubCat(isActive ? 'all' : sub.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-lg transition-colors border cursor-pointer select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                  : 'bg-[var(--neutral-white)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--bg-lift)]'
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
