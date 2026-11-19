'use client';

import React from 'react';
import { MenuItem, ViewMode } from '@/types/menu';
import { toBn } from '@/data/menuData';
import CardGrid from './CardGrid';
import CardList from './CardList';
import {
  PiHamburgerLight,
  PiCoffeeLight,
  PiHeartFill,
  PiBowlFoodLight,
} from 'react-icons/pi';

export interface CategorySectionProps {
  category: {
    id: string;
    title: string;
    icon: string;
  };
  items: MenuItem[];
  viewMode: ViewMode;
  isFav: (id: string) => boolean;
  onToggleFav: (id: string, e: React.MouseEvent) => void;
  onOpen: (item: MenuItem) => void;
  className?: string;
}

export default function CategorySection({
  category,
  items,
  viewMode,
  isFav,
  onToggleFav,
  onOpen,
  className = '',
}: CategorySectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={`sec-${category.id}`}
      className={`scroll-mt-48 ${className}`.trim()}
    >
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border-subtle)]">
        {category.id === 'snacks' ? (
          <PiHamburgerLight className="text-xl text-[var(--tone-strong)] shrink-0" aria-hidden="true" />
        ) : category.id === 'drinks' ? (
          <PiCoffeeLight className="text-xl text-[var(--tone-strong)] shrink-0" aria-hidden="true" />
        ) : category.id === 'fav' ? (
          <PiHeartFill className="text-xl text-[var(--tone-strong)] shrink-0" aria-hidden="true" />
        ) : (
          <PiBowlFoodLight className="text-xl text-[var(--tone-strong)] shrink-0" aria-hidden="true" />
        )}
        <h2 className="font-heading font-medium text-xl sm:text-2xl text-[var(--tone-strong)]">
          {category.title}
        </h2>
        <span className="ml-auto font-mono text-xs text-[var(--text-muted)]">
          {toBn(items.length)}টি আইটেম
        </span>
      </div>
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5'
            : 'grid grid-cols-1 md:grid-cols-2 gap-3'
        }
      >
        {items.map((item, index) => {
          const delay = Math.min(index * 25, 300);
          return viewMode === 'grid' ? (
            <CardGrid
              key={item.id}
              item={item}
              isFav={isFav(item.id)}
              onToggleFav={onToggleFav}
              onOpen={onOpen}
              delay={delay}
            />
          ) : (
            <CardList
              key={item.id}
              item={item}
              isFav={isFav(item.id)}
              onToggleFav={onToggleFav}
              onOpen={onOpen}
              delay={delay}
            />
          );
        })}
      </div>
    </section>
  );
}
