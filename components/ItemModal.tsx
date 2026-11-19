'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem } from '@/types/menu';
import { CATEGORIES, TAGS, fallbackSvg, toBn } from '@/data/menuData';

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
        className="pop bg-[var(--neutral-white)] text-[var(--tone-strong)] w-full sm:max-w-xl rounded-t-[10px] sm:rounded-[10px] overflow-hidden max-h-[94vh] flex flex-col border border-[var(--border-subtle)]"
      >
        {/* Media slider header */}
        <div className="relative bg-[var(--neutral-200)]">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white text-base grid place-items-center"
            aria-label="আগের ছবি"
          >
            ‹
          </button>
          <button
            id="next"
            type="button"
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white text-base grid place-items-center"
            aria-label="পরের ছবি"
          >
            ›
          </button>
          <button
            id="close"
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 h-8 w-8 rounded-[8px] bg-black/60 hover:bg-black/80 text-white text-sm grid place-items-center"
            aria-label="বন্ধ করুন"
          >
            ✕
          </button>
          <span
            id="counter"
            className="absolute left-3 top-3 rounded-full bg-black/60 text-white font-mono text-[11px] px-2.5 py-1"
          >
            {`${toBn(activeIdx + 1)} / ${toBn(images.length)}`}
          </span>
        </div>

        {/* Thumbnail strip */}
        <div
          id="thumbs"
          className="flex gap-2 overflow-x-auto no-scrollbar px-4 pt-3"
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectThumb(i)}
              className={`h-12 w-16 shrink-0 rounded-[8px] overflow-hidden border transition-opacity ${
                activeIdx === i
                  ? 'border-[var(--tone-strong)]'
                  : 'border-[var(--border-subtle)] opacity-50'
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

        {/* Details body */}
        <div className="overflow-y-auto p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p id="m-cat" className="eyebrow text-xs text-[var(--text-muted)]">
                {cat ? `${cat.icon} ${cat.title}`.toUpperCase() : ''}
              </p>
              <h3
                id="m-name"
                className="h4 font-heading font-medium text-2xl mt-1 text-[var(--tone-strong)]"
              >
                {item.name}
              </h3>
              {item.note ? (
                <p id="m-note" className="body-sm text-[var(--text-muted)] mt-0.5">
                  {item.note}
                </p>
              ) : null}
            </div>
            <span
              id="m-price"
              className="shrink-0 rounded-[8px] bg-[var(--tone-faint)] text-[var(--tone-strong)] font-mono font-medium px-3.5 py-1.5 text-lg border border-[var(--border-subtle)]"
            >
              {toBn(item.price)} ৳
            </span>
          </div>

          {item.tags.length > 0 && (
            <div id="m-tags" className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="tag tag--glass">
                  {TAGS[tag]?.label || tag}
                </span>
              ))}
            </div>
          )}

          {item.desc ? (
            <p
              id="m-desc"
              className="body-md text-[var(--text-muted)] leading-relaxed"
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
                  <span key={ing} className="tag">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              id="m-fav"
              type="button"
              onClick={() => onToggleFav(item.id)}
              className="btn btn--secondary flex-1"
            >
              {isFav ? '❤️ পছন্দের তালিকায় আছে' : '🤍 পছন্দে যোগ করুন'}
            </button>
            <button
              id="m-share"
              type="button"
              onClick={handleShare}
              className="btn btn--primary flex-1"
            >
              🔗 শেয়ার করুন
            </button>
          </div>

          {/* Related items */}
          {relatedItems.length > 0 && (
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <h4 className="font-heading font-medium text-xs font-mono uppercase text-[var(--text-muted)] mb-3">
                আরও দেখুন
              </h4>
              <div id="related" className="grid grid-cols-3 gap-2.5">
                {relatedItems.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    data-rel={r.id}
                    onClick={() => onOpenRelated(r)}
                    className="text-left rounded-[8px] overflow-hidden bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--dark-32)] transition-colors"
                  >
                    <div className="aspect-[4/3] shimmer relative">
                      <img
                        src={
                          r.images && r.images.length > 0
                            ? r.images[0]
                            : fallbackSvg
                        }
                        alt={r.name}
                        loading="lazy"
                        onLoad={(e) =>
                          e.currentTarget.parentElement?.classList.remove(
                            'shimmer'
                          )
                        }
                        onError={(e) => {
                          e.currentTarget.parentElement?.classList.remove(
                            'shimmer'
                          );
                          (e.currentTarget as HTMLImageElement).src =
                            fallbackSvg;
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium leading-tight truncate text-[var(--tone-strong)]">
                        {r.name}
                      </p>
                      <p className="text-xs font-mono text-[var(--text-muted)]">
                        {toBn(r.price)} ৳
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
