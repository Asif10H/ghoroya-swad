'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem } from '@/types/menu';
import { CATEGORIES, TAGS, fallbackSvg, toBn } from '@/data/menuData';
import {
  PiCaretLeftLight,
  PiCaretRightLight,
  PiXLight,
  PiHeartFill,
  PiHeartLight,
  PiShareNetworkLight,
  PiHamburgerLight,
  PiCoffeeLight,
} from 'react-icons/pi';

export interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  isFav: boolean;
  onToggleFav: (id: string) => void;
  onOpenRelated: (item: MenuItem) => void;
  onShowToast: (msg: string) => void;
}

export default function ItemModal({
  item,
  onClose,
  isFav,
  onToggleFav,
  onOpenRelated,
  onShowToast,
}: ItemModalProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const images = useMemo(() => {
    return item?.images && item.images.length > 0 ? item.images : [fallbackSvg];
  }, [item]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [item]);

  // Reset scroll and active index when item changes
  useEffect(() => {
    setActiveIdx(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [item]);

  const handleSliderScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth || 1;
    const idx = Math.round(sliderRef.current.scrollLeft / width);
    setActiveIdx(Math.min(Math.max(idx, 0), images.length - 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
  }, []);

  const handleSelectThumb = (idx: number) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: idx * sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
    setActiveIdx(idx);
  };

  // Keyboard navigation: Escape to close, arrows for images
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, handleNext, handlePrev]);

  const handleShare = async () => {
    if (!item) return;
    const notePart = item.note ? ` (${item.note})` : '';
    const text = `${item.name}${notePart} — ${toBn(item.price)} ৳ · ঘরোয়া স্বাদ রেস্টুরেন্ট, খাগড়াছড়ি`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: item.name,
          text,
          url,
        });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${url}`);
        onShowToast('📋 লিংক কপি হয়েছে');
      }
    } catch {
      // Ignore user cancellation or share rejection
    }
  };

  const cat = useMemo(() => {
    return item ? CATEGORIES.find((c) => c.id === item.cat) : null;
  }, [item]);

  const relatedItems = useMemo(() => {
    if (!item) return [];
    const category = CATEGORIES.find((c) => c.id === item.cat);
    if (!category) return [];

    const rel = category.items.filter((i) => i.id !== item.id);
    const start = category.items.findIndex((i) => i.id === item.id);
    if (start === -1) return rel.slice(0, 3);
    return [...rel.slice(start), ...rel.slice(0, start)].slice(0, 3);
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <div
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="m-name"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-[16px] sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="pop bg-[var(--neutral-white)] text-[var(--tone-strong)] w-full sm:max-w-xl rounded-t-[16px] sm:rounded-[10px] overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col border border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)]"
      >
        {/* Media slider header */}
        <div className="relative bg-[var(--neutral-200)]">
          {/* Mobile drawer handle */}
          <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/50 rounded-full z-10 pointer-events-none" />

          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {images.map((src, i) => (
              <div
                key={i}
                className="min-w-full snap-center aspect-[4/3] shimmer relative"
              >
                <img
                  src={src}
                  alt={`${item.name} ছবি ${toBn(i + 1)}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onLoad={(e) =>
                    e.currentTarget.parentElement?.classList.remove('shimmer')
                  }
                  onError={(e) => {
                    e.currentTarget.parentElement?.classList.remove('shimmer');
                    (e.currentTarget as HTMLImageElement).src = fallbackSvg;
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            id="prev"
            type="button"
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white grid place-items-center active:scale-95"
            aria-label="আগের ছবি"
          >
            <PiCaretLeftLight className="text-lg" aria-hidden="true" />
          </button>
          <button
            id="next"
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white grid place-items-center active:scale-95"
            aria-label="পরের ছবি"
          >
            <PiCaretRightLight className="text-lg" aria-hidden="true" />
          </button>
          <button
            id="close"
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 h-9 w-9 sm:h-8 sm:w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white grid place-items-center active:scale-95 z-20"
            aria-label="বন্ধ করুন"
          >
            <PiXLight className="text-base" aria-hidden="true" />
          </button>
          <span
            id="counter"
            className="absolute left-3 top-3 rounded-full bg-black/60 text-white font-mono text-[11px] px-2.5 py-1 z-20"
          >
            {`${toBn(activeIdx + 1)} / ${toBn(images.length)}`}
          </span>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div
            id="thumbs"
            className="flex gap-2 overflow-x-auto no-scrollbar px-4 pt-3 pb-1"
          >
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectThumb(i)}
                className={`h-14 w-18 sm:h-16 sm:w-20 shrink-0 rounded-[8px] overflow-hidden border-2 transition-all ${
                  activeIdx === i
                    ? 'border-[var(--tone-strong)] opacity-100 ring-2 ring-[var(--tone-strong)]/20'
                    : 'border-[var(--border-subtle)] opacity-70 hover:opacity-100'
                }`}
                aria-label={`${item.name} থাম্বনেইল ${toBn(i + 1)}`}
              >
                <img
                  src={src}
                  alt={`${item.name} থাম্বনেইল ${toBn(i + 1)}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackSvg;
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Details body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p id="m-cat" className="eyebrow text-[11px] sm:text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                {cat?.id === 'snacks' ? (
                  <PiHamburgerLight className="text-sm" aria-hidden="true" />
                ) : (
                  <PiCoffeeLight className="text-sm" aria-hidden="true" />
                )}
                <span>{cat ? cat.title.toUpperCase() : ''}</span>
              </p>
              <h3
                id="m-name"
                className="h4 font-heading font-medium text-xl sm:text-2xl mt-1 text-[var(--tone-strong)]"
              >
                {item.name}
              </h3>
              {item.note ? (
                <p id="m-note" className="body-sm text-[var(--text-muted)] mt-0.5 text-xs sm:text-sm">
                  {item.note}
                </p>
              ) : null}
            </div>
            <span
              id="m-price"
              className="shrink-0 rounded-[8px] bg-[var(--tone-faint)] text-[var(--tone-strong)] font-mono font-medium px-3 sm:px-3.5 py-1 sm:py-1.5 text-base sm:text-lg border border-[var(--border-subtle)]"
            >
              {toBn(item.price)} ৳
            </span>
          </div>

          {item.tags.length > 0 && (
            <div id="m-tags" className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="tag tag--glass text-[10px] sm:text-xs">
                  {TAGS[tag]?.label || tag}
                </span>
              ))}
            </div>
          )}

          {item.desc ? (
            <p
              id="m-desc"
              className="body-md text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed"
            >
              {item.desc}
            </p>
          ) : null}

          {item.ingredients && item.ingredients.length > 0 && (
            <div
              id="m-ing-wrap"
              className="pt-2 border-t border-[var(--border-subtle)]"
            >
              <h4 className="font-heading font-medium text-xs font-mono uppercase text-[var(--text-muted)] mb-2">
                উপকরণ
              </h4>
              <div id="m-ing" className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <span key={ing} className="tag text-[10px] sm:text-xs">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex gap-2.5 sm:gap-3">
            <button
              id="m-fav"
              type="button"
              onClick={() => onToggleFav(item.id)}
              className="btn btn--secondary flex-1 h-11 sm:h-10 text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95"
            >
              {isFav ? (
                <>
                  <PiHeartFill className="text-base text-[var(--tone-strong)]" aria-hidden="true" />
                  <span>পছন্দের তালিকায়</span>
                </>
              ) : (
                <>
                  <PiHeartLight className="text-base text-[var(--tone-strong)]" aria-hidden="true" />
                  <span>পছন্দে যোগ করুন</span>
                </>
              )}
            </button>
            <button
              id="m-share"
              type="button"
              onClick={handleShare}
              className="btn btn--primary flex-1 h-11 sm:h-10 text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <PiShareNetworkLight className="text-base" aria-hidden="true" />
              <span>শেয়ার করুন</span>
            </button>
          </div>

          {/* Related items */}
          {relatedItems.length > 0 && (
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <h4 className="font-heading font-medium text-xs font-mono uppercase text-[var(--text-muted)] mb-2.5">
                আরও দেখুন
              </h4>
              <div id="related" className="grid grid-cols-3 gap-2 sm:gap-3">
                {relatedItems.map((r) => (
                  <RelatedCard key={r.id} item={r} onOpen={onOpenRelated} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RelatedCardProps {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
}

function RelatedCard({ item, onOpen }: RelatedCardProps) {
  const initialSrc =
    item.images && item.images.length > 0 ? item.images[0] : fallbackSvg;
  const [src, setSrc] = useState<string>(initialSrc);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setSrc(item.images && item.images.length > 0 ? item.images[0] : fallbackSvg);
    setIsLoaded(false);
  }, [item]);

  return (
    <button
      type="button"
      data-rel={item.id}
      onClick={() => onOpen(item)}
      className="group text-left rounded-[8px] overflow-hidden bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--dark-32)] active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)]"
    >
      <div className={`aspect-[4/3] relative overflow-hidden bg-[var(--neutral-100)] ${isLoaded ? '' : 'shimmer'}`}>
        <img
          src={src}
          alt={item.name}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setSrc(fallbackSvg);
            setIsLoaded(true);
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-2 sm:p-2.5">
        <p className="text-xs sm:text-[13px] font-medium leading-snug truncate text-[var(--tone-strong)]">
          {item.name}
        </p>
        <p className="text-[11px] sm:text-xs font-mono font-medium text-[var(--tone-strong)] mt-0.5">
          {toBn(item.price)} ৳
        </p>
      </div>
    </button>
  );
}
