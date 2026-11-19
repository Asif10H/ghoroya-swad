'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CategoryFilter,
  MenuItem,
  SortOption,
  ViewMode,
} from '@/types/menu';
import {
  CATEGORIES,
  ALL_ITEMS,
  PRICE_FILTERS,
  toBn,
} from '@/data/menuData';
import { useFavorites } from '@/hooks/useFavorites';
import CategorySection from './CategorySection';
import ItemModal from './ItemModal';
import Toast from './Toast';
import FloatingActions from './FloatingActions';
import BottomNav from './BottomNav';
import InstallPrompt from './InstallPrompt';
import OrderTray from './OrderTray';
import {
  PiMagnifyingGlassLight,
  PiXLight,
  PiSquaresFourLight,
  PiHamburgerLight,
  PiPintGlassLight,
  PiCoffeeLight,
  PiHeartLight,
  PiHeartFill,
  PiGridFourLight,
  PiListLight,
  PiBowlFoodLight,
  PiArrowCounterClockwiseLight,
  PiCaretDownLight,
  PiArrowsDownUpLight,
  PiCheckLight,
} from 'react-icons/pi';

export function MenuExplorer() {
  const [activeCat, setActiveCat] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const { favs, toggleFav, isFav } = useFavorites();

  const sortOptions = useMemo(
    () => [
      { id: 'default' as SortOption, label: 'ডিফল্ট ক্রম' },
      { id: 'asc' as SortOption, label: 'দাম: কম → বেশি' },
      { id: 'desc' as SortOption, label: 'দাম: বেশি → কম' },
    ],
    []
  );

  // Close sort dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!isSortOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(e.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSortOpen]);

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

  // Listen for category selection events from the Hero stats bar
  useEffect(() => {
    const handleCatChange = (e: Event) => {
      const customEvent = e as CustomEvent<CategoryFilter>;
      if (
        customEvent.detail &&
        ['all', 'snacks', 'drinks', 'tea_coffee', 'fav'].includes(customEvent.detail)
      ) {
        setActiveCat(customEvent.detail);
      }
    };
    window.addEventListener('gs-select-cat', handleCatChange);
    return () => window.removeEventListener('gs-select-cat', handleCatChange);
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

  const handleSelectCategory = (cat: CategoryFilter) => {
    setActiveCat(cat);
  };

  const handleReset = () => {
    setActiveCat('all');
    setQuery('');
    setPriceFilter('all');
    setSortBy('default');
  };

  // Category navigation tabs
  const tabs = useMemo(
    () => [
      {
        id: 'all' as CategoryFilter,
        label: `সব (${toBn(ALL_ITEMS.length)})`,
        icon: <PiSquaresFourLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'snacks' as CategoryFilter,
        label: `স্ন্যাকস (${toBn(CATEGORIES.find((c) => c.id === 'snacks')?.items.length || 0)})`,
        icon: <PiHamburgerLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'drinks' as CategoryFilter,
        label: `ড্রিংকস ও জুস (${toBn(CATEGORIES.find((c) => c.id === 'drinks')?.items.length || 0)})`,
        icon: <PiPintGlassLight className="text-sm shrink-0" aria-hidden="true" />,
      },
      {
        id: 'tea_coffee' as CategoryFilter,
        label: `চা ও কফি (${toBn(CATEGORIES.find((c) => c.id === 'tea_coffee')?.items.length || 0)})`,
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
  }, [activeCat, query, priceFilter, sortBy, favs]);

  const totalCount = useMemo(() => {
    return visibleSections.reduce((acc, sec) => acc + sec.items.length, 0);
  }, [visibleSections]);

  const isAnyFilterActive =
    query.trim() !== '' ||
    priceFilter !== 'all' ||
    sortBy !== 'default';

  return (
    <>
      {/* Sticky Controls Bar */}
      <div id="menu" />
      <div className="sticky top-0 z-30 bg-[var(--bg-base)]/95 backdrop-blur-[16px] border-b border-[var(--border-subtle)] transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 space-y-2">
          {/* Row 1: Search + Sort Dropdown + Grid/List View Mode Toggle */}
          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="relative flex-1">
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
                className="w-full h-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] pl-10 pr-9 text-[16px] sm:text-sm text-[var(--tone-strong)] placeholder:text-[var(--text-muted)] outline-none focus:outline-2 focus:outline-[var(--tone-strong)] transition-colors font-sans"
              />
              {query ? (
                <button
                  id="clear"
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-lg bg-[var(--tone-faint)] text-xs text-[var(--tone-strong)] grid place-items-center active:scale-95 transition-colors cursor-pointer"
                  aria-label="মুছুন"
                >
                  <PiXLight className="text-xs" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            {/* Custom Sort Dropdown (Zero Native Select CSS) */}
            <div ref={sortDropdownRef} className="relative shrink-0">
              <button
                id="sort"
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                className={`h-10 px-2.5 sm:px-3 rounded-lg border text-xs font-mono font-medium inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-colors select-none ${
                  isSortOpen
                    ? 'border-[var(--tone-strong)] bg-[var(--tone-faint)] text-[var(--tone-strong)]'
                    : sortBy !== 'default'
                    ? 'border-[var(--tone-strong)] bg-[var(--tone-strong)] text-[var(--bg-base)]'
                    : 'border-[var(--border-subtle)] bg-[var(--neutral-white)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                }`}
                aria-label="সর্টিং বা ক্রম নির্ধারণ"
              >
                <PiArrowsDownUpLight className="text-sm shrink-0" aria-hidden="true" />
                <span>
                  {sortOptions.find((o) => o.id === sortBy)?.label || 'ডিফল্ট ক্রম'}
                </span>
                <PiCaretDownLight
                  className={`text-xs transition-transform duration-200 shrink-0 ${
                    isSortOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Custom Options Popover */}
              {isSortOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 sm:left-0 top-full mt-1.5 min-w-[170px] z-50 rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] backdrop-blur-[16px] p-1.5 space-y-0.5"
                >
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSortBy(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] font-medium'
                            : 'text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && (
                          <PiCheckLight className="text-xs shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grid / List View Mode Toggle */}
            <div className="shrink-0 flex h-10 items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--neutral-white)] p-0.5">
              <button
                id="vGrid"
                type="button"
                onClick={() => handleSetViewMode('grid')}
                className={`h-full px-2 sm:px-2.5 rounded-lg text-xs font-mono transition-colors inline-flex items-center justify-center cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[var(--tone-strong)] text-[var(--bg-base)]'
                    : 'text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                }`}
                aria-label="গ্রিড ভিউ"
                title="গ্রিড ভিউ"
              >
                <PiGridFourLight className="text-sm sm:text-base" aria-hidden="true" />
              </button>
              <button
                id="vList"
                type="button"
                onClick={() => handleSetViewMode('list')}
                className={`h-full px-2 sm:px-2.5 rounded-lg text-xs font-mono transition-colors inline-flex items-center justify-center cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[var(--tone-strong)] text-[var(--bg-base)]'
                    : 'text-[var(--tone-strong)] hover:bg-[var(--bg-lift)]'
                }`}
                aria-label="লিস্ট ভিউ"
                title="লিস্ট ভিউ"
              >
                <PiListLight className="text-sm sm:text-base" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Row 2: Primary Categories tabs (rounded-lg) */}
          <div
            id="tabs"
            className="flex gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-3 px-3 sm:mx-0 sm:px-0"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectCategory(tab.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-lg border text-xs font-mono font-medium transition-colors active:scale-95 cursor-pointer ${
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

          {/* Row 3: Secondary Filter Chips (Price & Tags - Toggleable, no repetition) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5 -mx-3 px-3 sm:mx-0 sm:px-0">
            {/* Price Filter Chips */}
            <div id="prices" className="flex gap-1.5 shrink-0">
              {PRICE_FILTERS.filter((p) => p.id !== 'all').map((p) => {
                const isActive = priceFilter === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriceFilter(isActive ? 'all' : p.id)}
                    className={`shrink-0 inline-flex items-center justify-center py-1 px-3 rounded-lg border text-xs font-mono font-medium transition-colors active:scale-95 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--tone-strong)] text-[var(--bg-base)] border-[var(--tone-strong)]'
                        : 'bg-[var(--neutral-white)] text-[var(--tone-strong)] border-[var(--border-subtle)] hover:bg-[var(--bg-lift)]'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>



            {/* Clear Filters Reset Button */}
            {isAnyFilterActive && (
              <>
                <span className="mx-0.5 h-4 w-px bg-[var(--border-subtle)] shrink-0 self-center" />
                <button
                  type="button"
                  onClick={handleReset}
                  className="shrink-0 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--tone-faint)] text-[var(--tone-strong)] text-xs font-mono font-medium hover:bg-[var(--bg-lift)] active:scale-95 transition-colors cursor-pointer"
                  title="সকল ফিল্টার রিসেট করুন"
                >
                  <PiArrowCounterClockwiseLight className="text-xs" aria-hidden="true" />
                  <span>রিসেট</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Menu Grid / List */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8 pb-28 md:pb-20">
        {visibleSections.length > 0 ? (
          visibleSections.map((sec) => (
            <CategorySection
              key={sec.category.id}
              category={sec.category}
              items={sec.items}
              viewMode={viewMode}
              isFav={isFav}
              onToggleFav={(id) => handleToggleFav(id)}
              onOpen={(item) => setSelectedItem(item)}
            />
          ))
        ) : (
          <div
            id="empty"
            className="text-center py-12 sm:py-16 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-lift)]"
          >
            <PiBowlFoodLight className="mx-auto text-4xl sm:text-5xl text-[var(--text-muted)] stroke-1" aria-hidden="true" />
            <h3 className="mt-3 font-heading font-medium text-lg sm:text-xl text-[var(--tone-strong)]">
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
              className="mt-5 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--tone-faint)] text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] active:scale-95 transition-colors text-xs font-mono cursor-pointer"
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

      {/* Interactive 1-Tap Order Tray Drawer & Floating Bar */}
      <OrderTray />

      {/* Floating Actions (Back to Top & Call) */}
      <FloatingActions />

      {/* Mobile App Bottom Navigation Bar */}
      <BottomNav
        activeCat={activeCat}
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        favCount={favs.size}
      />

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </>
  );
}

export default MenuExplorer;
