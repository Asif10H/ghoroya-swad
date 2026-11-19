'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  CategoryFilter,
  MenuItem,
  SortOption,
  TagType,
  ViewMode,
} from '@/types/menu';
import {
  CATEGORIES,
  ALL_ITEMS,
  PRICE_FILTERS,
  TAGS,
  toBn,
} from '@/data/menuData';
import { useFavorites } from '@/hooks/useFavorites';
import CategorySection from './CategorySection';
import ItemModal from './ItemModal';
import Toast from './Toast';
import FloatingActions from './FloatingActions';
import {
  PiMagnifyingGlassLight,
  PiXLight,
  PiSquaresFourLight,
  PiHamburgerLight,
  PiCoffeeLight,
  PiHeartLight,
  PiHeartFill,
  PiGridFourLight,
  PiListLight,
  PiBowlFoodLight,
  PiArrowCounterClockwiseLight,
} from 'react-icons/pi';

export function MenuExplorer() {
  const [activeCat, setActiveCat] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const { favs, toggleFav, isFav } = useFavorites();

  // Load saved viewMode preference
  useEffect(() => {
    try {
      const savedView = localStorage.getItem('gs-view');
      if (savedView === 'grid' || savedView === 'list') {
        setViewMode(savedView);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    try {
      localStorage.setItem('gs-view', mode);
    } catch {
      // Ignore storage access errors
    }
  };

  const handleToggleFav = (id: string) => {
    const willBeFav = !isFav(id);
    toggleFav(id);
    setToastMsg(
      willBeFav
        ? '❤️ পছন্দের তালিকায় যোগ হয়েছে'
        : 'তালিকা থেকে সরানো হয়েছে'
    );
  };

  const handleReset = () => {
    setActiveCat('all');
    setQuery('');
    setPriceFilter('all');
    setTagFilter('all');
    setSortBy('default');
  };

  // Used tags for filter pills
  const usedTags = useMemo(() => {
    const keys = Object.keys(TAGS) as TagType[];
    return keys.filter((k) =>
      ALL_ITEMS.some((i) => i.tags && i.tags.includes(k))
    );
  }, []);

  // Category navigation tabs
  const tabs = useMemo(
    () => [
      {
        id: 'all' as CategoryFilter,
        label: 'সব',
        icon: <PiSquaresFourLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'snacks' as CategoryFilter,
        label: 'স্ন্যাকস',
        icon: <PiHamburgerLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'drinks' as CategoryFilter,
        label: 'ড্রিংকস ও জুস',
        icon: <PiCoffeeLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'fav' as CategoryFilter,
        label: `পছন্দ${favs.size ? ` (${toBn(favs.size)})` : ''}`,
        icon: favs.size ? (
          <PiHeartFill className="text-sm shrink-0" aria-hidden="true" />
        ) : (
          <PiHeartLight className="text-sm shrink-0" aria-hidden="true" />
        ),
      },
    ],
    [favs.size]
  );

  // Filtered and sorted sections
  const visibleSections = useMemo(() => {
    let sections: {
      category: { id: string; title: string; icon: string };
      items: MenuItem[];
    }[] = [];

    if (activeCat === 'fav') {
      sections = [
        {
          category: { id: 'fav', title: 'আমার পছন্দের তালিকা', icon: '❤️' },
          items: ALL_ITEMS.filter((i) => favs.has(i.id)),
        },
      ];
    } else if (activeCat === 'all') {
      sections = CATEGORIES.map((c) => ({
        category: { id: c.id, title: c.title, icon: c.icon },
        items: c.items,
      }));
    } else {
      const found = CATEGORIES.find((c) => c.id === activeCat);
      if (found) {
        sections = [
          {
            category: { id: found.id, title: found.title, icon: found.icon },
            items: found.items,
          },
        ];
      }
    }

    const currentPriceTest = PRICE_FILTERS.find(
      (p) => p.id === priceFilter
    )?.test;
    const trimmedQuery = query.trim().toLowerCase();

    const result = sections.map((sec) => {
      let items = sec.items.filter((it) => {
        // Query search
        if (trimmedQuery) {
          const haystack = `${it.name} ${it.note} ${it.desc} ${it.ingredients.join(' ')}`.toLowerCase();
          if (!haystack.includes(trimmedQuery)) {
            return false;
          }
        }
        // Tag filter
        if (tagFilter !== 'all') {
          if (!it.tags.includes(tagFilter as TagType)) {
            return false;
          }
        }
        // Price filter
        if (currentPriceTest && !currentPriceTest(it.price)) {
          return false;
        }
        return true;
      });

      // Sort
      if (sortBy === 'asc') {
        items = [...items].sort((a, b) => a.price - b.price);
      } else if (sortBy === 'desc') {
        items = [...items].sort((a, b) => b.price - a.price);
      }

      return {
        category: sec.category,
        items,
      };
    });

    return result.filter((sec) => sec.items.length > 0);
  }, [activeCat, query, priceFilter, tagFilter, sortBy, favs]);

  const totalCount = useMemo(() => {
    return visibleSections.reduce((acc, sec) => acc + sec.items.length, 0);
  }, [visibleSections]);

  return (
    <>
      {/* Sticky Controls Bar */}
      <div id="menuTop" />
      <div className="sticky top-0 z-30 bg-[var(--bg-base)]/95 backdrop-blur-[16px] border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 space-y-2.5 sm:space-y-3">
          {/* Search input */}
          <div className="relative">
            <PiMagnifyingGlassLight
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-[var(--text-muted)] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="search"
              type="text"
              inputMode="search"
              autoComplete="off"
              placeholder="আইটেম খুঁজুন… (যেমন: লাচ্ছি, মোমো, কফি)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-[8px] border border-[var(--border-subtle)] bg-[var(--neutral-white)] pl-10 pr-10 py-2 sm:py-2.5 text-base sm:text-sm text-[var(--tone-strong)] placeholder-[var(--neutral-400)] outline-none focus:outline-2 focus:outline-[var(--tone-strong)] focus:outline-offset-2 transition-colors"
            />
            {query ? (
              <button
                id="clear"
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-[8px] bg-[var(--tone-faint)] text-xs text-[var(--tone-strong)] grid place-items-center active:scale-95"
                aria-label="মুছুন"
              >
                <PiXLight className="text-xs" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          {/* Categories tabs */}
          <div
            id="tabs"
            className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-3 px-3 sm:mx-0 sm:px-0"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCat(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 py-1.5 px-3.5 sm:px-4 rounded-full border text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer ${
                  activeCat === tab.id
                    ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                    : 'bg-[var(--neutral-white)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--bg-lift)]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary filters & view toggle */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5 -mx-3 px-3 sm:mx-0 sm:px-0">
            <div id="prices" className="flex gap-2 shrink-0">
              {PRICE_FILTERS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriceFilter(p.id)}
                  className={`shrink-0 inline-flex items-center justify-center py-1 px-3 rounded-full border text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer ${
                    priceFilter === p.id
                      ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                      : 'bg-[var(--neutral-white)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--bg-lift)]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {usedTags.length > 0 && (
              <>
                <span className="mx-1 h-4 w-px bg-[var(--border-subtle)] shrink-0 self-center" />
                <div className="flex gap-2 shrink-0">
                  {usedTags.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() =>
                        setTagFilter((prev) => (prev === k ? 'all' : k))
                      }
                      className={`shrink-0 inline-flex items-center justify-center py-1 px-3 rounded-full border text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer ${
                        tagFilter === k
                          ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                          : 'bg-[var(--neutral-white)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--bg-lift)]'
                      }`}
                    >
                      {TAGS[k]?.label || k}
                    </button>
                  ))}
                </div>
              </>
            )}

            <span className="mx-1 h-4 w-px bg-[var(--border-subtle)] shrink-0 self-center" />

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="shrink-0 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--neutral-white)] text-xs font-mono text-[var(--tone-strong)] px-2.5 sm:px-3 py-1 sm:py-1.5 outline-none focus:outline-2 focus:outline-[var(--tone-strong)] focus:outline-offset-2"
            >
              <option value="default">↕ ডিফল্ট ক্রম</option>
              <option value="asc">দাম: কম → বেশি</option>
              <option value="desc">দাম: বেশি → কম</option>
            </select>

            <div className="shrink-0 flex rounded-[8px] border border-[var(--border-subtle)] bg-[var(--neutral-white)] p-0.5">
              <button
                id="vGrid"
                type="button"
                onClick={() => handleSetViewMode('grid')}
                className={`rounded-[8px] px-2.5 py-1 text-xs font-mono transition-colors inline-flex items-center justify-center ${
                  viewMode === 'grid'
                    ? 'bg-[var(--tone-strong)] text-[var(--bg-base)]'
                    : 'text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                }`}
                aria-label="গ্রিড"
              >
                <PiGridFourLight className="text-sm" aria-hidden="true" />
              </button>
              <button
                id="vList"
                type="button"
                onClick={() => handleSetViewMode('list')}
                className={`rounded-[8px] px-2.5 py-1 text-xs font-mono transition-colors inline-flex items-center justify-center ${
                  viewMode === 'list'
                    ? 'bg-[var(--tone-strong)] text-[var(--bg-base)]'
                    : 'text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                }`}
                aria-label="লিস্ট"
              >
                <PiListLight className="text-sm" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu Content */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 min-h-[60vh]">
        <div className="flex items-center justify-between mb-6">
          <p id="count" className="font-mono text-xs text-[var(--text-muted)]">
            {totalCount > 0
              ? `${toBn(totalCount)}টি আইটেম প্রদর্শিত হচ্ছে`
              : ''}
          </p>
        </div>

        {totalCount > 0 ? (
          <div id="menu" className="space-y-12">
            {visibleSections.map((sec) => (
              <CategorySection
                key={sec.category.id}
                category={sec.category}
                items={sec.items}
                viewMode={viewMode}
                isFav={isFav}
                onToggleFav={(id) => handleToggleFav(id)}
                onOpen={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div id="empty" className="text-center py-24">
            <PiBowlFoodLight className="text-5xl mx-auto opacity-30 text-[var(--tone-strong)]" aria-hidden="true" />
            <h3 className="font-heading font-medium text-xl mt-4 text-[var(--tone-strong)]">
              কোনো আইটেম পাওয়া যায়নি
            </h3>
            <p id="emptyMsg" className="mt-1 text-sm text-[var(--text-muted)]">
              {activeCat === 'fav'
                ? 'এখনো কোনো পছন্দের আইটেম নেই। কার্ডের হার্ট আইকন চাপুন।'
                : 'অন্য কোনো নাম বা ফিল্টার দিয়ে চেষ্টা করুন'}
            </p>
            <button
              id="reset"
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--dark-8)] dark:bg-[var(--light-8)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] active:scale-95 transition-all text-xs font-mono cursor-pointer"
            >
              <PiArrowCounterClockwiseLight className="text-sm" aria-hidden="true" />
              <span>ফিল্টার রিসেট করুন</span>
            </button>
          </div>
        )}
      </main>

      {/* Item Modal */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFav={selectedItem ? isFav(selectedItem.id) : false}
        onToggleFav={(id) => handleToggleFav(id)}
        onOpenRelated={(item) => setSelectedItem(item)}
        onShowToast={(msg) => setToastMsg(msg)}
      />

      {/* Toast Notification */}
      <Toast message={toastMsg} onClose={() => setToastMsg(null)} />

      {/* Floating Actions */}
      <FloatingActions />
    </>
  );
}

export default MenuExplorer;
