import { Category, MenuItem, PriceFilter } from '../types/menu';

export const toBn = (n: number | string): string => String(n);

export const fallbackSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#f5f5f5'/><text x='50%' y='52%' font-size='96' text-anchor='middle'>🍽️</text></svg>`
  );

export const PRICE_FILTERS: PriceFilter[] = [
  { id: 'all', label: 'সব দাম' },
  { id: 'u50', label: '50 ৳ পর্যন্ত', test: (p: number) => p <= 50 },
  { id: 'u100', label: '51–100 ৳', test: (p: number) => p > 50 && p <= 100 },
  { id: 'o100', label: '100 ৳+', test: (p: number) => p > 100 },
];

/* Curated authentic food photography accurately matching each Bangladeshi dish */
const FOOD_PHOTOS: Record<string, string[]> = {
  'ক্রিসপি চিকেন': [
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন ফ্রাই': [
    'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন মোমো': [
    'https://images.pexels.com/photos/7363674/pexels-photo-7363674.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন ফিঙ্গার রোল': [
    'https://images.pexels.com/photos/39853099/pexels-photo-39853099.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন নাগেট': [
    'https://images.pexels.com/photos/9872916/pexels-photo-9872916.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সমুচা': [
    'https://images.pexels.com/photos/36905236/pexels-photo-36905236.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন অনথন': [
    'https://images.pexels.com/photos/5639730/pexels-photo-5639730.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সফট রোল': [
    'https://images.pexels.com/photos/12737661/pexels-photo-12737661.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সসেজ': [
    'https://images.pexels.com/photos/10794112/pexels-photo-10794112.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  ],
  'মিট বল': [
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=800&q=80',
  ],
  'চটপটি': [
    'https://images.pexels.com/photos/11818239/pexels-photo-11818239.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80',
  ],
  'ফুসকা': [
    'https://images.pexels.com/photos/13063312/pexels-photo-13063312.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
  ],
  'ফ্রেঞ্চ ফ্রাই': [
    'https://images.pexels.com/photos/5779487/pexels-photo-5779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
  ],
  'এগ চিকেন পাস্তা': [
    'https://images.pexels.com/photos/10966436/pexels-photo-10966436.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  ],
  'এগ চিকেন নুডলস': [
    'https://images.pexels.com/photos/4224304/pexels-photo-4224304.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন স্প্রিং রোল': [
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  ],
  'ফিশ ফ্রাই': [
    'https://images.pexels.com/photos/7298033/pexels-photo-7298033.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
  ],
  'পুডিং': [
    'https://images.pexels.com/photos/10918153/pexels-photo-10918153.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
  ],
  'দই ফুসকা': [
    'https://images.pexels.com/photos/13063312/pexels-photo-13063312.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
  ],

  'রেগুলার লাচ্ছি': [
    'https://images.pexels.com/photos/18142603/pexels-photo-18142603.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  ],
  'স্পেশাল লাচ্ছি': [
    'https://images.pexels.com/photos/4475024/pexels-photo-4475024.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  ],
  'কাজুবাদাম লাচ্ছি': [
    'https://images.pexels.com/photos/4475024/pexels-photo-4475024.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
  ],
  'কোল্ড কফি': [
    'https://images.pexels.com/photos/35229818/pexels-photo-35229818.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
  ],
  'অরেঞ্জ / মাল্টা জুস': [
    'https://images.pexels.com/photos/14510445/pexels-photo-14510445.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
  ],
  'ম্যাঙ্গো জুস': [
    'https://images.pexels.com/photos/30620864/pexels-photo-30620864.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
  ],
  'ড্রাগন জুস': [
    'https://images.pexels.com/photos/12144880/pexels-photo-12144880.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  ],
  'পেঁপে জুস': [
    'https://images.pexels.com/photos/8181521/pexels-photo-8181521.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
  ],
  'তেঁতুল জুস': [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  ],
  'লেমন জুস': [
    'https://images.pexels.com/photos/27551844/pexels-photo-27551844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  ],
  'মিন্ট লেমন জুস': [
    'https://images.pexels.com/photos/27551844/pexels-photo-27551844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  ],
  'ম্যাঙ্গো মিল্কশেক': [
    'https://images.pexels.com/photos/30620864/pexels-photo-30620864.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
  ],
  'চকলেট মিল্কশেক': [
    'https://images.pexels.com/photos/4113348/pexels-photo-4113348.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
  ],
  'স্ট্রবেরি মিল্কশেক': [
    'https://images.pexels.com/photos/10066812/pexels-photo-10066812.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80',
  ],
  'হট কফি': [
    'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  ],
  'স্পেশাল লিকার টি': [
    'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  ],
  'দুধ চা': [
    'https://images.pexels.com/photos/34324342/pexels-photo-34324342.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
  ],
};

export interface SubCategoryDef {
  id: string;
  catId: 'snacks' | 'drinks';
  label: string;
  icon: string;
}

export const SUB_CATEGORIES: SubCategoryDef[] = [
  { id: 'all', catId: 'snacks', label: 'সব সাব-মেনু', icon: '✨' },
  { id: 'chicken', catId: 'snacks', label: 'চিকেন স্পেশাল', icon: '🍗' },
  { id: 'street', catId: 'snacks', label: 'চাট ও ফুসকা', icon: '🍲' },
  { id: 'noodles', catId: 'snacks', label: 'পাস্তা ও নুডলস', icon: '🍝' },
  { id: 'dessert', catId: 'snacks', label: 'মিষ্টি ডেজার্ট', icon: '🍮' },
  { id: 'lassi', catId: 'drinks', label: 'লাচ্ছি কর্নার', icon: '🥛' },
  { id: 'juice', catId: 'drinks', label: 'তাজা জুস', icon: '🥤' },
  { id: 'shake', catId: 'drinks', label: 'মিল্কশেক', icon: '🍨' },
  { id: 'tea_coffee', catId: 'drinks', label: 'চা ও কফি', icon: '☕' },
];

const INFO: Record<
  string,
  { desc: string; ingredients: string[]; subCategory: string }
> = {
  'ক্রিসপি চিকেন': {
    subCategory: 'chicken',
    desc: 'মচমচে কোটিংয়ে ভাজা বড় সাইজের ক্রিসপি চিকেন পিস।',
    ingredients: ['চিকেন', 'ক্রিস্পি কোটিং', 'ঘরোয়া মসলা'],
  },
  'চিকেন ফ্রাই': {
    subCategory: 'chicken',
    desc: 'গরম গরম মচমচে ভাজা চিকেন, 5 পিসের প্যাকেজ।',
    ingredients: ['চিকেন', 'কোটিং', 'মসলা'],
  },
  'চিকেন মোমো': {
    subCategory: 'chicken',
    desc: 'ভাপে সেদ্ধ নরম আবরণে মসলাদার চিকেনের পুর ও লাল ঝাল সস।',
    ingredients: ['ময়দা', 'চিকেন কিমা', 'পেঁয়াজ', 'ঝাল মসলা'],
  },
  'চিকেন ফিঙ্গার রোল': {
    subCategory: 'chicken',
    desc: 'আঙুলের মতো লম্বা, ক্রিস্পি ও মুখরোচক চিকেন ফিঙ্গার রোল।',
    ingredients: ['চিকেন', 'ময়দার আবরণ', 'মসলা'],
  },
  'চিকেন নাগেট': {
    subCategory: 'chicken',
    desc: 'ছোট ছোট সোনালি মচমচে চিকেন নাগেট, 5 পিস।',
    ingredients: ['চিকেন', 'ব্রেডক্রাম্ব', 'মসলা'],
  },
  'চিকেন সমুচা': {
    subCategory: 'chicken',
    desc: 'মচমচে ত্রিভুজ সমুচা, ভেতরে রসালো মসলাদার চিকেন পুর।',
    ingredients: ['ময়দা', 'চিকেন', 'মসলা'],
  },
  'চিকেন অনথন': {
    subCategory: 'chicken',
    desc: 'ভাজা ক্রিস্পি ডাম্পলিং, ভেতরে সুস্বাদু চিকেনের পুর।',
    ingredients: ['ময়দা', 'চিকেন কিমা', 'মসলা'],
  },
  'চিকেন সফট রোল': {
    subCategory: 'chicken',
    desc: 'নরম রুটির মোড়কে চিকেন ও রকমারি সস ফিলিং।',
    ingredients: ['নরম রুটি', 'চিকেন কিমা', 'হোয়াইট সস'],
  },
  'চিকেন সসেজ': {
    subCategory: 'chicken',
    desc: 'প্যানে সেঁকা গরম গরম সুস্বাদু চিকেন সসেজ।',
    ingredients: ['চিকেন সসেজ', 'হালকা মসলা'],
  },
  'মিট বল': {
    subCategory: 'street',
    desc: 'স্টিকে গাঁথা 4 পিস ভাজা রসালো মাংসের বল।',
    ingredients: ['কিমা', 'বিশেষ মসলা'],
  },
  'চটপটি': {
    subCategory: 'street',
    desc: 'টক-ঝাল-মিষ্টি স্বাদের জনপ্রিয় বাংলাদেশি চটপটি, সেদ্ধ ডিম ও ধনেপাতা কুচি সহ।',
    ingredients: ['ডাবলি মটর', 'ছোলা', 'আলু', 'তেঁতুলের টক', 'ডিম', 'মসলা'],
  },
  'ফুসকা': {
    subCategory: 'street',
    desc: 'মুচমুচে সোনালি পুরির ভেতরে মসলাদার আলু-ছোলার পুর ও তেঁতুলের টক পানি।',
    ingredients: ['ফুসকা পুরি', 'তেঁতুলের পানি', 'আলু-ছোলা', 'মসলা'],
  },
  'ফ্রেঞ্চ ফ্রাই': {
    subCategory: 'street',
    desc: 'সোনালি মচমচে গরম আলুর ফ্রাই, হালকা লবণের স্বাদ।',
    ingredients: ['আলু', 'লবণ'],
  },
  'এগ চিকেন পাস্তা': {
    subCategory: 'noodles',
    desc: 'ডিম ও চিকেনের টুকরোয় ভরা দেশি স্টাইলের মসলাদার পেনে পাস্তা।',
    ingredients: ['পাস্তা', 'ডিম', 'চিকেন', 'টমেটো ও চিলি মসলা'],
  },
  'এগ চিকেন নুডলস': {
    subCategory: 'noodles',
    desc: 'ডিম ও চিকেনের সাথে তাজা সবজি মেশানো গরম ও ঝাল চাওমিন নুডলস।',
    ingredients: ['নুডলস', 'ডিম', 'চিকেন', 'সবজি', 'মসলা'],
  },
  'চিকেন স্প্রিং রোল': {
    subCategory: 'chicken',
    desc: 'মচমচে গোল্ডেন স্প্রিং রোল, ভেতরে সুস্বাদু চিকেন ও সবজির পুর।',
    ingredients: ['চিকেন', 'সবজি', 'রোল শিট'],
  },
  'ফিশ ফ্রাই': {
    subCategory: 'street',
    desc: 'স্টিকে গাঁথা 4 পিস মুচমুচে ক্রিস্পি কোটিংয়ে ভাজা মাছের ফ্রাই।',
    ingredients: ['মাছ', 'ক্রিস্পি কোটিং', 'মসলা'],
  },
  'পুডিং': {
    subCategory: 'dessert',
    desc: 'মুখে মিলিয়ে যাওয়া নরম, ক্যারামেল সিরাপে ঘেরা ডিম-দুধের মিষ্টি পুডিং।',
    ingredients: ['দুধ', 'ডিম', 'চিনি', 'ক্যারামেল'],
  },
  'দই ফুসকা': {
    subCategory: 'street',
    desc: 'ফুসকার উপর ঠান্ডা মিষ্টি দই, মসলা, ঝুরিভাজা ও টক-মিষ্টি চাটনি।',
    ingredients: ['ফুসকা পুরি', 'মিষ্টি দই', 'তেঁতুল চাটনি', 'ঝুরিভাজা', 'মসলা'],
  },

  'রেগুলার লাচ্ছি': {
    subCategory: 'lassi',
    desc: 'খাঁটি দই ও বরফে তৈরি ঐতিহ্যবাহী ঠান্ডা, ক্রিমি মিষ্টি লাচ্ছি।',
    ingredients: ['দই', 'চিনি', 'বরফ'],
  },
  'স্পেশাল লাচ্ছি': {
    subCategory: 'lassi',
    desc: 'মালাই ও পেস্তা বাদামের কুচিতে সমৃদ্ধ ঘন শাহী স্বাদের লাচ্ছি।',
    ingredients: ['দই', 'মালাই', 'বাদাম কুচি', 'চিনি'],
  },
  'কাজুবাদাম লাচ্ছি': {
    subCategory: 'lassi',
    desc: 'কাজুবাদামের ব্লেন্ডেড ক্রিমের বিশেষ রিচ ও পুষ্টিকর লাচ্ছি।',
    ingredients: ['দই', 'কাজুবাদাম', 'চিনি'],
  },
  'কোল্ড কফি': {
    subCategory: 'tea_coffee',
    desc: 'দুধ, এসপ্রেসো ও চকলেট ফ্রোথ সহ ঠান্ডা বরফশীতল রিফ্রেশিং কফি।',
    ingredients: ['কফি', 'দুধ', 'চকো সিরাপ', 'চিনি', 'বরফ'],
  },
  'অরেঞ্জ / মাল্টা জুস': {
    subCategory: 'juice',
    desc: 'তাজা কমলার রস ও মিষ্টি পাল্পে তৈরি ভিটামিন-সি ভরপুর সতেজ জুস।',
    ingredients: ['মাল্টা/কমলা', 'বরফ'],
  },
  'ম্যাঙ্গো জুস': {
    subCategory: 'juice',
    desc: 'পাকা মিষ্টি আমের ঘন ও শীতল রসালো জুস।',
    ingredients: ['আমের পাল্প', 'চিনি', 'বরফ'],
  },
  'ড্রাগন জুস': {
    subCategory: 'juice',
    desc: 'তাজা ড্রাগন ফলের হালকা মিষ্টি প্রাকৃতিক গোলাপি রঙের জুস।',
    ingredients: ['ড্রাগন ফল', 'চিনি', 'বরফ'],
  },
  'পেঁপে জুস': {
    subCategory: 'juice',
    desc: 'পাকা মিষ্টি পেঁপের পুষ্টিকর ও পেট ঠান্ডা করা তাজা জুস।',
    ingredients: ['পাকা পেঁপে', 'চিনি', 'বরফ'],
  },
  'তেঁতুল জুস': {
    subCategory: 'juice',
    desc: 'টক-ঝাল-মিষ্টি দেশীয় স্বাদের খাঁটি তেঁতুলের শরবত ও বিট লবণ।',
    ingredients: ['তেঁতুল', 'বিট লবণ', 'চিনি', 'বরফ'],
  },
  'লেমন জুস': {
    subCategory: 'juice',
    desc: 'তাজা কাগজি লেবু, সামান্য লবণ ও বরফ মিশ্রিত প্রাণবন্ত লেবুর শরবত।',
    ingredients: ['লেবু', 'চিনি', 'লবণ', 'বরফ'],
  },
  'মিন্ট লেমন জুস': {
    subCategory: 'juice',
    desc: 'তাজা পুদিনা পাতা ও লেবুর সুবাসে মন ভরানো চনমনে ঠান্ডা গ্রিন জুস।',
    ingredients: ['লেবু', 'পুদিনা পাতা', 'চিনি', 'বরফ'],
  },
  'ম্যাঙ্গো মিল্কশেক': {
    subCategory: 'shake',
    desc: 'ঘন দুধ, পাকা আম ও আইসক্রিমের স্বাদে জমকালো ফ্রুট শেক।',
    ingredients: ['আম', 'দুধ', 'আইসক্রিম', 'চিনি'],
  },
  'চকলেট মিল্কশেক': {
    subCategory: 'shake',
    desc: 'রিচ কোকো চকলেট, দুধ ও ভ্যানিলা স্কুপের ক্লাসিক ক্রিমি মিল্কশেক।',
    ingredients: ['চকলেট', 'দুধ', 'আইসক্রিম'],
  },
  'স্ট্রবেরি মিল্কশেক': {
    subCategory: 'shake',
    desc: 'স্ট্রবেরির মিষ্টি-গোলাপি সুবাসে ঘন ও ক্রিমি বরফশীতল মিল্কশেক।',
    ingredients: ['স্ট্রবেরি', 'দুধ', 'আইসক্রিম'],
  },
  'হট কফি': {
    subCategory: 'tea_coffee',
    desc: 'গরম গরম সুগন্ধি ফেনা তোলা ক্যাপুচিনো কফি।',
    ingredients: ['কফি বিন্স', 'দুধ', 'চিনি'],
  },
  'স্পেশাল লিকার টি': {
    subCategory: 'tea_coffee',
    desc: 'দুধ ছাড়া কড়া সুগন্ধি লিকার চা, এক চুমুকেই ক্লান্তি দূর।',
    ingredients: ['প্রিমিয়াম চা পাতা', 'চিনি'],
  },
  'দুধ চা': {
    subCategory: 'tea_coffee',
    desc: 'খাঁটি ঘন দুধে জ্বাল দেওয়া সুস্বাদু ক্লাসিক গরম মসলাদার দুধ চা।',
    ingredients: ['চা পাতা', 'দুধ', 'এলাচ', 'চিনি'],
  },
};

const RAW_CATEGORIES: {
  id: 'snacks' | 'drinks';
  title: string;
  icon: string;
  items: { name: string; note: string; price: number }[];
}[] = [
  {
    id: 'snacks',
    title: 'স্ন্যাকস মেনু',
    icon: '🍔',
    items: [
      { name: 'ক্রিসপি চিকেন', note: '1 পিস বড়', price: 120 },
      { name: 'চিকেন ফ্রাই', note: '5 পিস', price: 200 },
      { name: 'চিকেন মোমো', note: '5 পিস', price: 100 },
      { name: 'চিকেন ফিঙ্গার রোল', note: '8 পিস', price: 100 },
      { name: 'চিকেন নাগেট', note: '5 পিস', price: 100 },
      { name: 'চিকেন সমুচা', note: '1 পিস', price: 20 },
      { name: 'চিকেন অনথন', note: '1 পিস', price: 20 },
      { name: 'চিকেন সফট রোল', note: '1 পিস', price: 30 },
      { name: 'চিকেন সসেজ', note: '1 পিস', price: 40 },
      { name: 'মিট বল', note: '1 স্টিক 4 পিস', price: 50 },
      { name: 'চটপটি', note: '', price: 50 },
      { name: 'ফুসকা', note: '', price: 60 },
      { name: 'ফ্রেঞ্চ ফ্রাই', note: '', price: 80 },
      { name: 'এগ চিকেন পাস্তা', note: '1:2', price: 100 },
      { name: 'এগ চিকেন নুডলস', note: '1:2', price: 100 },
      { name: 'চিকেন স্প্রিং রোল', note: '1 পিস', price: 30 },
      { name: 'ফিশ ফ্রাই', note: '1 স্টিক 4 পিস', price: 50 },
      { name: 'পুডিং', note: '1 পিস', price: 50 },
      { name: 'দই ফুসকা', note: '', price: 100 },
    ],
  },
  {
    id: 'drinks',
    title: 'ড্রিংকস ও জুস',
    icon: '🥤',
    items: [
      { name: 'রেগুলার লাচ্ছি', note: '', price: 80 },
      { name: 'স্পেশাল লাচ্ছি', note: '', price: 100 },
      { name: 'কাজুবাদাম লাচ্ছি', note: '', price: 120 },
      { name: 'কোল্ড কফি', note: '', price: 100 },
      { name: 'অরেঞ্জ / মাল্টা জুস', note: '', price: 100 },
      { name: 'ম্যাঙ্গো জুস', note: '', price: 80 },
      { name: 'ড্রাগন জুস', note: '', price: 80 },
      { name: 'পেঁপে জুস', note: '', price: 70 },
      { name: 'তেঁতুল জুস', note: '', price: 70 },
      { name: 'লেমন জুস', note: '', price: 50 },
      { name: 'মিন্ট লেমন জুস', note: '', price: 60 },
      { name: 'ম্যাঙ্গো মিল্কশেক', note: '', price: 100 },
      { name: 'চকলেট মিল্কশেক', note: '', price: 100 },
      { name: 'স্ট্রবেরি মিল্কশেক', note: '', price: 100 },
      { name: 'হট কফি', note: '', price: 50 },
      { name: 'স্পেশাল লিকার টি', note: '', price: 20 },
      { name: 'দুধ চা', note: '', price: 20 },
    ],
  },
];

export const CATEGORIES: Category[] = RAW_CATEGORIES.map((c) => ({
  id: c.id,
  title: c.title,
  icon: c.icon,
  items: c.items.map((it, i) => {
    const info = INFO[it.name] ?? {
      desc: '',
      ingredients: [],
      subCategory: 'all',
    };
    const images = FOOD_PHOTOS[it.name] ?? [
      `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80`,
    ];
    return {
      id: `${c.id}-${i}`,
      cat: c.id,
      subCategory: info.subCategory,
      name: it.name,
      note: it.note,
      price: it.price,
      images,
      desc: info.desc,
      ingredients: info.ingredients,
    };
  }),
}));

export const ALL_ITEMS: MenuItem[] = CATEGORIES.flatMap((c) => c.items);
export const BY_ID: Record<string, MenuItem> = Object.fromEntries(
  ALL_ITEMS.map((item) => [item.id, item])
);
