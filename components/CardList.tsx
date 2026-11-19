'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { toBn, TAGS, fallbackSvg } from '@/data/menuData';

export interface CardListProps {
  item: MenuItem;
  isFav: boolean;
  onToggleFav: (id: string, e: React.MouseEvent) => void;
  onOpen: (item: MenuItem) => void;
  delay?: number;
}

export default function CardList({
  item,
  isFav,
  onToggleFav,
  onOpen,
  delay = 0,
}: CardListProps) {
  const initialSrc =
    item.images && item.images.length > 0 ? item.images[0] : fallbackSvg;
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(
      item.images && item.images.length > 0 ? item.images[0] : fallbackSvg
    );
    setIsLoaded(false);
  }, [item]);

  const animStyle: React.CSSProperties = { animationDelay: `${delay}ms` };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item);
        }
      }}
      style={animStyle}
      className="pop group cursor-pointer flex items-center gap-4 rounded-[10px] p-3 bg-[var(--neutral-white)] border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)] focus-visible:outline-offset-2"
    >
      <div
        className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-[8px] overflow-hidden ${
          isLoaded ? '' : 'shimmer'
        }`}
      >
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImgSrc(fallbackSvg);
            setIsLoaded(true);
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[15px] leading-snug truncate text-[var(--tone-strong)]">
          {item.name}
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          {item.note || '\u00A0'}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {item.tags.map((t) =>
              TAGS[t] ? (
                <span key={t} className="tag tag--glass text-[10px] py-0.5 px-2">
                  {TAGS[t].label}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>
      <div className="text-right pr-1 shrink-0">
        <div className="font-mono text-base font-medium text-[var(--tone-strong)] whitespace-nowrap">
          {toBn(item.price)} ৳
        </div>
        <button
          type="button"
          aria-label={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দ তালিকায় যোগ করুন'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(item.id, e);
          }}
          className="mt-1 p-1 inline-flex items-center justify-center text-base hover:opacity-80 transition-opacity"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </article>
  );
}
