'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { toBn, TAGS, fallbackSvg } from '@/data/menuData';
import { PiHeartFill, PiHeartLight, PiCameraLight } from 'react-icons/pi';

export interface CardGridProps {
  item: MenuItem;
  isFav: boolean;
  onToggleFav: (id: string, e: React.MouseEvent) => void;
  onOpen: (item: MenuItem) => void;
  delay?: number;
}

const vignetteStyle: React.CSSProperties = {
  background:
    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
};

export default function CardGrid({
  item,
  isFav,
  onToggleFav,
  onOpen,
  delay = 0,
}: CardGridProps) {
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
      className="pop group cursor-pointer rounded-[10px] overflow-hidden bg-[var(--neutral-white)] border border-[var(--border-subtle)] hover:border-[var(--dark-32)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)] focus-visible:outline-offset-2"
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden ${
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
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={vignetteStyle}
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 pointer-events-none">
            {item.tags.map((t) =>
              TAGS[t] ? (
                <span key={t} className="tag tag--glass">
                  {TAGS[t].label}
                </span>
              ) : null
            )}
          </div>
        )}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[var(--light-16)] backdrop-blur-[16px] text-white font-mono text-xs px-3 py-1 border border-[var(--light-16)]">
          {toBn(item.price)} ৳
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/60 text-[var(--light-100)] font-mono text-[10px] px-2 py-0.5 inline-flex items-center gap-1">
          <PiCameraLight className="text-xs" aria-hidden="true" />
          <span>{toBn(item.images ? item.images.length : 0)}</span>
        </span>
        <button
          type="button"
          aria-label={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দ তালিকায় যোগ করুন'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(item.id, e);
          }}
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-[8px] bg-black/40 hover:bg-black/60 backdrop-blur-[16px] text-white grid place-items-center border border-[var(--light-16)] transition-colors"
        >
          {isFav ? (
            <PiHeartFill className="text-base text-white" aria-hidden="true" />
          ) : (
            <PiHeartLight className="text-base text-white/90" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="p-3.5 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-[15px] leading-snug truncate text-[var(--tone-strong)]">
            {item.name}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 min-h-[1rem]">
            {item.note || '\u00A0'}
          </p>
        </div>
      </div>
    </article>
  );
}

export { CardGrid };
