'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/menu';
import { toBn, fallbackSvg } from '@/data/menuData';
import { useOrderTray } from '@/hooks/useOrderTray';
import {
  PiHeartFill,
  PiHeartLight,
  PiCameraLight,
  PiPlusLight,
  PiMinusLight,
} from 'react-icons/pi';

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
  const { getItemQuantity, addItem, removeItem } = useOrderTray();
  const quantity = getItemQuantity(item.id);

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
      className="group cursor-pointer rounded-[10px] overflow-hidden bg-[var(--neutral-white)] border border-[var(--border-subtle)] hover:border-[var(--dark-32)] dark:hover:border-[var(--light-32)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)] focus-visible:outline-offset-2 flex flex-col justify-between"
    >
      <div>
        <div
          className={`relative aspect-[4/3] overflow-hidden ${
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
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={vignetteStyle}
          />

          <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 rounded-lg bg-[var(--light-16)] backdrop-blur-[16px] text-white font-mono text-[11px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 border border-[var(--light-16)] font-medium">
            {toBn(item.price)} ৳
          </span>
          <span className="hidden xs:inline-flex sm:inline-flex absolute bottom-2.5 right-2.5 rounded-lg bg-black/60 text-[var(--light-100)] font-mono text-[10px] px-2 py-0.5 items-center gap-1">
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
            className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 h-8 w-8 sm:h-8 sm:w-8 rounded-lg bg-black/40 hover:bg-black/60 active:scale-90 backdrop-blur-[16px] text-white grid place-items-center border border-[var(--light-16)] transition-colors"
          >
            {isFav ? (
              <PiHeartFill className="text-base text-white" aria-hidden="true" />
            ) : (
              <PiHeartLight className="text-base text-white/90" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Name + Note on Left, Quick Add / Stepper on Right (No duplicate price) */}
      <div className="p-3 sm:p-3.5 flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-medium text-sm sm:text-[15px] leading-snug truncate text-[var(--tone-strong)]">
            {item.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] mt-0.5 truncate">
            {item.note || '\u00A0'}
          </p>
        </div>

        {/* Quick Add / Stepper Area */}
        <div className="shrink-0">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addItem(item);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] hover:opacity-90 active:scale-95 transition-colors cursor-pointer"
            >
              <PiPlusLight className="text-xs" />
              <span>যোগ</span>
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-lift)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="w-6 h-6 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--dark-16)] dark:hover:bg-[var(--light-16)] active:scale-95 transition-colors cursor-pointer"
                aria-label="কমান"
              >
                <PiMinusLight className="text-[10px]" />
              </button>
              <span className="w-6 text-center text-xs font-medium text-[var(--tone-strong)]">
                {toBn(quantity)}
              </span>
              <button
                type="button"
                onClick={() => addItem(item)}
                className="w-6 h-6 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--dark-16)] dark:hover:bg-[var(--light-16)] active:scale-95 transition-colors cursor-pointer"
                aria-label="বাড়ান"
              >
                <PiPlusLight className="text-[10px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export { CardGrid };
