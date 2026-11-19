import { Category, MenuItem, PriceFilter, TagInfo, TagType } from '../types/menu';

export const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const fallbackSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#f5f5f5'/><text x='50%' y='52%' font-size='96' text-anchor='middle'>🍽️</text></svg>`
  );

export const demo = (key: string): string[] =>
  Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${key}-${i + 1}/800/600`);

export const TAGS: Record<TagType, TagInfo> = {
  best: { label: 'বেস্ট সেলার' },
  new: { label: 'নতুন' },
  spicy: { label: 'স্পাইসি' },
  veg: { label: 'ভেজ' },
};

export const PRICE_FILTERS: PriceFilter[] = [
  { id: 'all', label: 'সব দাম' },
  { id: 'u50', label: '৫০ ৳ পর্যন্ত', test: (p: number) => p <= 50 },
  { id: 'u100', label: '৫১–১০০ ৳', test: (p: number) => p > 50 && p <= 100 },
  { id: 'o100', label: '১০০ ৳+', test: (p: number) => p > 100 },
];

const INFO: Record<string, { tags: TagType[]; desc: string; ingredients: string[] }> = {
  'ক্রিসপি চিকেন': { tags: [], desc: 'মচমচে কোটিংয়ে ভাজা বড় সাইজের চিকেন পিস।', ingredients: ['চিকেন', 'কোটিং', 'মসলা'] },
  'চিকেন ফ্রাই': { tags: [], desc: 'গরম গরম মচমচে ভাজা চিকেন, ৫ পিসের প্যাকেজ।', ingredients: ['চিকেন', 'কোটিং', 'মসলা'] },
  'চিকেন মোমো': { tags: [], desc: 'ভাপে সেদ্ধ নরম আবরণে মসলাদার চিকেনের পুর।', ingredients: ['ময়দা', 'চিকেন কিমা', 'পেঁয়াজ', 'মসলা'] },
  'চিকেন ফিঙ্গার রোল': { tags: [], desc: 'আঙুলের মতো লম্বা, মচমচে চিকেন রোল।', ingredients: ['চিকেন', 'ময়দার আবরণ', 'মসলা'] },
  'চিকেন নাগেট': { tags: [], desc: 'ছোট ছোট মচমচে চিকেন নাগেট।', ingredients: ['চিকেন', 'ব্রেডক্রাম্ব', 'মসলা'] },
  'চিকেন সমুচা': { tags: [], desc: 'মচমচে সমুচা, ভেতরে মসলাদার চিকেন পুর।', ingredients: ['ময়দা', 'চিকেন', 'মসলা'] },
  'চিকেন অনথন': { tags: [], desc: 'ভাজা ডাম্পলিং ধরনের স্ন্যাকস, ভেতরে চিকেনের পুর।', ingredients: ['ময়দা', 'চিকেন কিমা', 'মসলা'] },
  'চিকেন সফট রোল': { tags: [], desc: 'নরম রুটির ভেতরে চিকেন ফিলিং।', ingredients: ['রুটি', 'চিকেন', 'সস'] },
  'চিকেন সসেজ': { tags: [], desc: 'ভাজা চিকেন সসেজ।', ingredients: ['চিকেন সসেজ'] },
  'মিট বল': { tags: [], desc: 'স্টিকে গাঁথা ৪ পিস মাংসের বল।', ingredients: ['কিমা', 'মসলা'] },
  'চটপটি': { tags: [], desc: 'টক-ঝাল-মিষ্টি স্বাদের জনপ্রিয় বাংলাদেশি স্ট্রিট ফুড।', ingredients: ['মটর', 'ছোলা', 'আলু', 'তেঁতুলের টক', 'মসলা'] },
  'ফুসকা': { tags: [], desc: 'মচমচে পুরির ভেতরে টক-ঝাল পানি ও মসলা।', ingredients: ['ফুসকা পুরি', 'তেঁতুলের পানি', 'আলু-ছোলা', 'মসলা'] },
  'ফ্রেঞ্চ ফ্রাই': { tags: [], desc: 'সোনালি মচমচে আলুর ফ্রাই।', ingredients: ['আলু', 'লবণ'] },
  'এগ চিকেন পাস্তা': { tags: [], desc: 'ডিম ও চিকেনসহ মসলাদার পাস্তা।', ingredients: ['পাস্তা', 'ডিম', 'চিকেন', 'মসলা'] },
  'এগ চিকেন নুডলস': { tags: [], desc: 'ডিম ও চিকেনসহ মজাদার নুডলস।', ingredients: ['নুডলস', 'ডিম', 'চিকেন', 'মসলা'] },
  'চিকেন স্প্রিং রোল': { tags: [], desc: 'মচমচে স্প্রিং রোল, ভেতরে চিকেন ও সবজি।', ingredients: ['চিকেন', 'সবজি', 'রোল শিট'] },
  'ফিশ ফ্রাই': { tags: [], desc: 'স্টিকে গাঁথা ৪ পিস ভাজা মাছের ফ্রাই।', ingredients: ['মাছ', 'কোটিং', 'মসলা'] },
  'পুডিং': { tags: [], desc: 'নরম, মিষ্টি ডেজার্ট।', ingredients: ['দুধ', 'ডিম', 'চিনি'] },
  'দই ফুসকা': { tags: [], desc: 'ফুসকার সাথে ঠান্ডা মিষ্টি দই আর টক-ঝাল স্বাদ।', ingredients: ['ফুসকা পুরি', 'দই', 'তেঁতুল', 'মসলা'] },

  'রেগুলার লাচ্ছি': { tags: [], desc: 'ঠান্ডা, ক্রিমি দইয়ের লাচ্ছি।', ingredients: ['দই', 'চিনি', 'বরফ'] },
  'স্পেশাল লাচ্ছি': { tags: [], desc: 'রেগুলারের চেয়ে সমৃদ্ধ স্বাদের ক্রিমি লাচ্ছি।', ingredients: ['দই', 'চিনি', 'বরফ'] },
  'কাজুবাদাম লাচ্ছি': { tags: [], desc: 'কাজুবাদামের স্বাদে ক্রিমি লাচ্ছি।', ingredients: ['দই', 'কাজুবাদাম', 'চিনি'] },
  'কোল্ড কফি': { tags: [], desc: 'ঠান্ডা, ক্রিমি কফি।', ingredients: ['কফি', 'দুধ', 'চিনি', 'বরফ'] },
  'অরেঞ্জ / মাল্টা জুস': { tags: [], desc: 'তাজা সাইট্রাস স্বাদের জুস।', ingredients: ['মাল্টা', 'বরফ'] },
  'ম্যাঙ্গো জুস': { tags: [], desc: 'আমের মিষ্টি স্বাদের ঠান্ডা জুস।', ingredients: ['আম', 'চিনি', 'বরফ'] },
  'ড্রাগন জুস': { tags: [], desc: 'ড্রাগন ফলের হালকা মিষ্টি ঠান্ডা জুস।', ingredients: ['ড্রাগন ফল', 'চিনি', 'বরফ'] },
  'পেঁপে জুস': { tags: [], desc: 'পাকা পেঁপের নরম স্বাদের জুস।', ingredients: ['পেঁপে', 'চিনি', 'বরফ'] },
  'তেঁতুল জুস': { tags: [], desc: 'টক-মিষ্টি তেঁতুলের জুস।', ingredients: ['তেঁতুল', 'চিনি', 'বরফ'] },
  'লেমন জুস': { tags: [], desc: 'সতেজ লেবুর শরবত।', ingredients: ['লেবু', 'চিনি', 'লবণ', 'বরফ'] },
  'মিন্ট লেমন জুস': { tags: [], desc: 'পুদিনার সুবাসে লেবুর ঠান্ডা জুস।', ingredients: ['লেবু', 'পুদিনা', 'চিনি', 'বরফ'] },
  'ম্যাঙ্গো মিল্কশেক': { tags: [], desc: 'আমের স্বাদে ঘন ক্রিমি মিল্কশেক।', ingredients: ['আম', 'দুধ', 'আইসক্রিম'] },
  'চকলেট মিল্কশেক': { tags: [], desc: 'চকলেটের স্বাদে ঘন ক্রিমি মিল্কশেক।', ingredients: ['চকলেট', 'দুধ', 'আইসক্রিম'] },
  'স্ট্রবেরি মিল্কশেক': { tags: [], desc: 'স্ট্রবেরির স্বাদে ঘন ক্রিমি মিল্কশেক।', ingredients: ['স্ট্রবেরি', 'দুধ', 'আইসক্রিম'] },
  'হট কফি': { tags: [], desc: 'গরম, সুগন্ধি কফি।', ingredients: ['কফি', 'দুধ', 'চিনি'] },
  'স্পেশাল লিকার টি': { tags: [], desc: 'দুধ ছাড়া কড়া লিকার চা।', ingredients: ['চা পাতা', 'চিনি'] },
  'দুধ চা': { tags: [], desc: 'দুধ ও চা পাতার ক্লাসিক গরম চা।', ingredients: ['চা পাতা', 'দুধ', 'চিনি'] },
};

interface RawItem {
  name: string;
  note: string;
  price: number;
  images: string[];
}

interface RawCategory {
  id: 'snacks' | 'drinks';
  title: string;
  icon: string;
  items: RawItem[];
}

const RAW_CATEGORIES: RawCategory[] = [
  {
    id: 'snacks',
    title: 'স্ন্যাকস মেনু',
    icon: '🍔',
    items: [
      { name: 'ক্রিসপি চিকেন', note: '১ পিস বড়', price: 120, images: demo('crispy-chicken') },
      { name: 'চিকেন ফ্রাই', note: '৫ পিস', price: 200, images: demo('chicken-fry') },
      { name: 'চিকেন মোমো', note: '৫ পিস', price: 100, images: demo('chicken-momo') },
      { name: 'চিকেন ফিঙ্গার রোল', note: '৮ পিস', price: 100, images: demo('finger-roll') },
      { name: 'চিকেন নাগেট', note: '৫ পিস', price: 100, images: demo('chicken-nugget') },
      { name: 'চিকেন সমুচা', note: '১ পিস', price: 20, images: demo('chicken-samosa') },
      { name: 'চিকেন অনথন', note: '১ পিস', price: 20, images: demo('chicken-wonton') },
      { name: 'চিকেন সফট রোল', note: '১ পিস', price: 30, images: demo('soft-roll') },
      { name: 'চিকেন সসেজ', note: '১ পিস', price: 40, images: demo('chicken-sausage') },
      { name: 'মিট বল', note: '১ স্টিক ৪ পিস', price: 50, images: demo('meat-ball') },
      { name: 'চটপটি', note: '', price: 50, images: demo('chotpoti') },
      { name: 'ফুসকা', note: '', price: 60, images: demo('fuska') },
      { name: 'ফ্রেঞ্চ ফ্রাই', note: '', price: 80, images: demo('french-fry') },
      { name: 'এগ চিকেন পাস্তা', note: '১:২', price: 100, images: demo('egg-chicken-pasta') },
      { name: 'এগ চিকেন নুডলস', note: '১:২', price: 100, images: demo('egg-chicken-noodles') },
      { name: 'চিকেন স্প্রিং রোল', note: '১ পিস', price: 30, images: demo('spring-roll') },
      { name: 'ফিশ ফ্রাই', note: '১ স্টিক ৪ পিস', price: 50, images: demo('fish-fry') },
      { name: 'পুডিং', note: '১ পিস', price: 50, images: demo('pudding') },
      { name: 'দই ফুসকা', note: '', price: 100, images: demo('doi-fuska') },
    ],
  },
  {
    id: 'drinks',
    title: 'ড্রিংকস ও জুস',
    icon: '🥤',
    items: [
      { name: 'রেগুলার লাচ্ছি', note: '', price: 80, images: demo('regular-lassi') },
      { name: 'স্পেশাল লাচ্ছি', note: '', price: 100, images: demo('special-lassi') },
      { name: 'কাজুবাদাম লাচ্ছি', note: '', price: 120, images: demo('cashew-lassi') },
      { name: 'কোল্ড কফি', note: '', price: 100, images: demo('cold-coffee') },
      { name: 'অরেঞ্জ / মাল্টা জুস', note: '', price: 100, images: demo('orange-juice') },
      { name: 'ম্যাঙ্গো জুস', note: '', price: 80, images: demo('mango-juice') },
      { name: 'ড্রাগন জুস', note: '', price: 80, images: demo('dragon-juice') },
      { name: 'পেঁপে জুস', note: '', price: 70, images: demo('papaya-juice') },
      { name: 'তেঁতুল জুস', note: '', price: 70, images: demo('tamarind-juice') },
      { name: 'লেমন জুস', note: '', price: 50, images: demo('lemon-juice') },
      { name: 'মিন্ট লেমন জুস', note: '', price: 60, images: demo('mint-lemon-juice') },
      { name: 'ম্যাঙ্গো মিল্কশেক', note: '', price: 100, images: demo('mango-milkshake') },
      { name: 'চকলেট মিল্কশেক', note: '', price: 100, images: demo('chocolate-milkshake') },
      { name: 'স্ট্রবেরি মিল্কশেক', note: '', price: 100, images: demo('strawberry-milkshake') },
      { name: 'হট কফি', note: '', price: 50, images: demo('hot-coffee') },
      { name: 'স্পেশাল লিকার টি', note: '', price: 20, images: demo('liquor-tea') },
      { name: 'দুধ চা', note: '', price: 20, images: demo('milk-tea') },
    ],
  },
];

export const CATEGORIES: Category[] = RAW_CATEGORIES.map((c) => ({
  id: c.id,
  title: c.title,
  icon: c.icon,
  items: c.items.map((it, i) => {
    const info = INFO[it.name] ?? { tags: [], desc: '', ingredients: [] };
    return {
      id: `${c.id}-${i}`,
      cat: c.id,
      name: it.name,
      note: it.note,
      price: it.price,
      images: it.images,
      tags: info.tags,
      desc: info.desc,
      ingredients: info.ingredients,
    };
  }),
}));

export const ALL_ITEMS: MenuItem[] = CATEGORIES.flatMap((c) => c.items);

export const BY_ID: Record<string, MenuItem> = Object.fromEntries(
  ALL_ITEMS.map((item) => [item.id, item])
);
