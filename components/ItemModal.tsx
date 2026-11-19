'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { MenuItem } from '@/types/menu';
import { CATEGORIES, fallbackSvg, toBn } from '@/data/menuData';
import { useOrderTray } from '@/hooks/useOrderTray';
import {
  PiCaretLeftLight,
  PiCaretRightLight,
  PiXLight,
  PiHeartFill,
  PiHeartLight,
  PiShareNetworkLight,
  PiHamburgerLight,
  PiCoffeeLight,
  PiPlusLight,
  PiMinusLight,
  PiShoppingBagLight,
  PiCheckLight,
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
  const { getItemQuantity, addItem, removeItem } = useOrderTray();
  const quantity = item ? getItemQuantity(item.id) : 0;

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-[16px] sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--neutral-white)] text-[var(--tone-strong)] w-full sm:max-w-3xl rounded-t-xl sm:rounded-lg overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col border border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)]"
      >
        {/* Mobile drawer handle */}
        <div className="sm:hidden w-full pt-2.5 pb-1 flex justify-center bg-[var(--bg-base)]">
          <div className="w-10 h-1 bg-[var(--border-subtle)] rounded-full" />
        </div>

        {/* Modal content container: Grid on desktop, stack on mobile */}
        <div className="flex-1 overflow-y-auto sm:overflow-hidden sm:grid sm:grid-cols-12">
          {/* Left Column: Visual Media Gallery */}
          <div className="sm:col-span-6 bg-[var(--bg-base)] flex flex-col border-b sm:border-b-0 sm:border-r border-[var(--border-subtle)]">
            <div className="relative bg-[var(--neutral-200)] aspect-[4/3] sm:aspect-square overflow-hidden">
              <div
                ref={sliderRef}
                onScroll={handleSliderScroll}
                className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="min-w-full h-full snap-center bg-[var(--neutral-200)] relative"
                  >
                    <img
                      src={src}
                      alt={`${item.name} ছবি ${toBn(i + 1)}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = fallbackSvg;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Prev / Next Controls */}
              {images.length > 1 && (
                <>
                  <button
                    id="prev"
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-black/60 hover:bg-black/85 text-white grid place-items-center active:scale-95 transition-colors cursor-pointer z-10"
                    aria-label="আগের ছবি"
                  >
                    <PiCaretLeftLight className="text-lg" aria-hidden="true" />
                  </button>
                  <button
                    id="next"
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-black/60 hover:bg-black/85 text-white grid place-items-center active:scale-95 transition-colors cursor-pointer z-10"
                    aria-label="পরের ছবি"
                  >
                    <PiCaretRightLight className="text-lg" aria-hidden="true" />
                  </button>
                </>
              )}

              {/* Close Button on Mobile (floating over photo) */}
              <button
                type="button"
                onClick={onClose}
                className="sm:hidden absolute right-2.5 top-2.5 h-8 w-8 rounded-lg bg-black/60 hover:bg-black/85 text-white grid place-items-center active:scale-95 z-20 transition-colors cursor-pointer"
                aria-label="বন্ধ করুন"
              >
                <PiXLight className="text-base" aria-hidden="true" />
              </button>

              {/* Image Counter Badge */}
              <span
                id="counter"
                className="absolute left-2.5 bottom-2.5 rounded-lg bg-black/70 backdrop-blur-md text-white font-mono text-[11px] px-2.5 py-1 z-10 border border-white/10"
              >
                {`${toBn(activeIdx + 1)} / ${toBn(images.length)}`}
              </span>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div
                id="thumbs"
                className="flex gap-2 overflow-x-auto no-scrollbar p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]"
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectThumb(i)}
                    className={`h-12 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                      activeIdx === i
                        ? 'border-[var(--tone-strong)] opacity-100'
                        : 'border-[var(--border-subtle)] opacity-60 hover:opacity-100'
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
          </div>

          {/* Right Column: Culinary Details & Actions */}
          <div className="sm:col-span-6 flex flex-col justify-between overflow-y-auto bg-[var(--neutral-white)]">
            <div className="p-4 sm:p-6 space-y-4">
              {/* Category & Desktop Close Row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--tone-faint)] text-[var(--tone-strong)] text-xs font-mono uppercase tracking-wider border border-[var(--border-subtle)]">
                    {cat?.id === 'snacks' ? (
                      <PiHamburgerLight className="text-sm" aria-hidden="true" />
                    ) : (
                      <PiCoffeeLight className="text-sm" aria-hidden="true" />
                    )}
                    <span>{cat ? cat.title : ''}</span>
                  </span>

                  {item.note && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-[var(--tone-faint)] text-[var(--text-muted)] text-xs font-mono border border-[var(--border-subtle)]">
                      {item.note}
                    </span>
                  )}
                </div>

                {/* Close Button on Desktop */}
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-lg border border-[var(--border-subtle)] text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                >
                  <PiXLight className="text-base" aria-hidden="true" />
                </button>
              </div>

              {/* Title & Price Header */}
              <div>
                <h3
                  id="m-name"
                  className="font-heading font-medium text-2xl sm:text-3xl text-[var(--tone-strong)] leading-tight"
                >
                  {item.name}
                </h3>

                <div className="mt-2.5 flex items-baseline gap-2">
                  <span
                    id="m-price"
                    className="font-heading font-medium text-2xl sm:text-3xl text-[var(--tone-strong)] tabular-nums"
                  >
                    {toBn(item.price)} ৳
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    / পরিমাপ: {item.note || 'রেগুলার'}
                  </span>
                </div>
              </div>



              {/* Description */}
              {item.desc && (
                <div className="pt-1">
                  <p
                    id="m-desc"
                    className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed"
                  >
                    {item.desc}
                  </p>
                </div>
              )}

              {/* Ingredients Cloud */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div
                  id="m-ing-wrap"
                  className="pt-3 border-t border-[var(--border-subtle)]"
                >
                  <h4 className="font-heading font-medium text-xs font-mono uppercase text-[var(--text-muted)] mb-2">
                    উপকরণ ও বৈশিষ্ট্য
                  </h4>
                  <div id="m-ing" className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-mono bg-[var(--tone-faint)] text-[var(--tone-strong)] border border-[var(--border-subtle)]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Items Section */}
              {relatedItems.length > 0 && (
                <div className="pt-3 border-t border-[var(--border-subtle)]">
                  <h4 className="font-heading font-medium text-xs font-mono uppercase text-[var(--text-muted)] mb-2">
                    আরও দেখুন ({cat?.title})
                  </h4>
                  <div id="related" className="grid grid-cols-3 gap-2">
                    {relatedItems.map((r) => (
                      <RelatedCard key={r.id} item={r} onOpen={onOpenRelated} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop & Mobile Actions Container */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-subtle)] bg-[var(--bg-base)] space-y-2.5">
              {/* Order Tray 1-Tap CTA */}
              {quantity === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    addItem(item);
                    onShowToast('অর্ডার ট্রে-তে যোগ হয়েছে');
                  }}
                  className="w-full h-11 text-xs sm:text-sm inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] hover:opacity-90 active:scale-95 transition-colors font-medium cursor-pointer"
                >
                  <PiShoppingBagLight className="text-base" aria-hidden="true" />
                  <span>অর্ডার ট্রে-তে যোগ করুন ({toBn(item.price)} ৳)</span>
                </button>
              ) : (
                <div className="w-full h-11 flex items-center justify-between px-3 rounded-lg border border-[var(--tone-strong)] bg-[var(--tone-faint)]">
                  <span className="text-xs sm:text-sm font-medium text-[var(--tone-strong)] flex items-center gap-1.5">
                    <PiCheckLight className="text-base" aria-hidden="true" />
                    <span>ট্রে-তে আছে ({toBn(quantity * item.price)} ৳)</span>
                  </span>
                  <div className="inline-flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-base)] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--dark-8)] active:scale-95 transition-colors cursor-pointer"
                      aria-label="কমান"
                    >
                      <PiMinusLight className="text-xs" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-medium text-[var(--tone-strong)] tabular-nums">
                      {toBn(quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(item)}
                      className="w-8 h-8 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--dark-8)] active:scale-95 transition-colors cursor-pointer"
                      aria-label="বাড়ান"
                    >
                      <PiPlusLight className="text-xs" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* Secondary Favorite and Share Buttons */}
              <div className="flex gap-2.5">
                <button
                  id="m-fav"
                  type="button"
                  onClick={() => onToggleFav(item.id)}
                  className={`flex-1 h-10 text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 rounded-lg border transition-colors font-medium cursor-pointer ${
                    isFav
                      ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                      : 'bg-[var(--bg-base)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--tone-faint)]'
                  }`}
                >
                  {isFav ? (
                    <>
                      <PiHeartFill className="text-base text-[var(--bg-base)]" aria-hidden="true" />
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
                  className="flex-1 h-10 text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors font-medium cursor-pointer"
                >
                  <PiShareNetworkLight className="text-base" aria-hidden="true" />
                  <span>শেয়ার করুন</span>
                </button>
              </div>
            </div>
          </div>
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
      className="group text-left rounded-lg overflow-hidden bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--tone-strong)] active:scale-95 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--tone-strong)] cursor-pointer"
    >
      <div className={`aspect-[4/3] relative overflow-hidden bg-[var(--neutral-100)] ${isLoaded ? '' : 'animate-pulse bg-neutral-200 dark:bg-neutral-800'}`}>
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
      <div className="p-2">
        <p className="text-xs font-medium leading-snug truncate text-[var(--tone-strong)]">
          {item.name}
        </p>
        <p className="text-[11px] font-mono font-medium text-[var(--tone-strong)] mt-0.5 tabular-nums">
          {toBn(item.price)} ৳
        </p>
      </div>
    </button>
  );
}
