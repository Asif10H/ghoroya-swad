export interface MenuItem {
  id: string;
  cat: 'snacks' | 'drinks' | 'tea_coffee';
  subCategory?: string;
  name: string;
  note: string;
  price: number;
  images: string[];
  desc: string;
  ingredients: string[];
}

export interface Category {
  id: 'snacks' | 'drinks' | 'tea_coffee';
  title: string;
  icon: string;
  items: MenuItem[];
}

export interface PriceFilter {
  id: 'all' | 'u50' | 'u100' | 'o100';
  label: string;
  test?: (price: number) => boolean;
}

export type SortOption = 'default' | 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';
export type CategoryFilter = 'all' | 'snacks' | 'drinks' | 'tea_coffee' | 'fav';
