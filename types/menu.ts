export type TagType = 'best' | 'new' | 'spicy' | 'veg';

export interface TagInfo {
  label: string;
}

export interface MenuItem {
  id: string;
  cat: 'snacks' | 'drinks';
  name: string;
  note: string;
  price: number;
  images: string[];
  tags: TagType[];
  desc: string;
  ingredients: string[];
}

export interface Category {
  id: 'snacks' | 'drinks';
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
export type CategoryFilter = 'all' | 'snacks' | 'drinks' | 'fav';
