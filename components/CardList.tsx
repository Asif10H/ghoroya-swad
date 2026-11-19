'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { toBn, TAGS, fallbackSvg } from '@/data/menuData';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

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
      className="group cursor-pointer flex items-center gap-3 sm:gap-4 rounded-[10px] p-2.5 sm:p-3 bg-[var(--neutral-white)] border border-[var(--border-subtle)] hover:bg-[var(--bg-lift)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)] focus-visible:outline-offset-2"
    >
      <div
        className={`relative h-18 w-18 sm:h-24 sm:w-24 shrink-0 rounded-[8px] overflow-hidden ${
          isLoaded ? '' : 'animate-pulse bg-neutral-200 dark:bg-neutral-800'
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
        <h3 className="font-medium text-sm sm:text-[15px] leading-snug truncate text-[var(--tone-strong)]">
          {item.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5 truncate">
          {item.note || '\u00A0'}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 sm:mt-1.5">
            {item.tags.map((t) =>
              TAGS[t] ? (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider bg-[var(--tone-faint)] text-[var(--tone-strong)] border border-[var(--border-subtle)]"
                >
                  {TAGS[t].label}
                </span>
              ) : null
            )}
          </div>
        )}
      </div>
      <div className="text-right pr-0.5 sm:pr-1 shrink-0">
        <div className="font-mono text-sm sm:text-base font-medium text-[var(--tone-strong)] whitespace-nowrap">
          {toBn(item.price)} ৳
        </div>
        <button
          type="button"
          aria-label={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দ তালিকায় যোগ করুন'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(item.id, e);
          }}
          className="mt-1 p-1.5 inline-flex items-center justify-center text-lg hover:opacity-80 active:scale-90 transition-all"
        >
          {isFav ? (
            <PiHeartFill className="text-[var(--tone-strong)]" aria-hidden="true" />
          ) : (
            <PiHeartLight className="text-[var(--text-muted)] hover:text-[var(--tone-strong)]" aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
}
