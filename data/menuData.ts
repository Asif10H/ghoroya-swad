import { Category, MenuItem, PriceFilter, TagInfo, TagType } from '../types/menu';

export const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const fallbackSvg =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#f5f5f5'/><text x='50%' y='52%' font-size='96' text-anchor='middle'>🍽️</text></svg>`
  );

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

/* Curated authentic food photography for each dish */
const FOOD_PHOTOS: Record<string, string[]> = {
  'ক্রিসপি চিকেন': [
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন ফ্রাই': [
    'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন মোমো': [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন ফিঙ্গার রোল': [
    'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন নাগেট': [
    'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সমুচা': [
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন অনথন': [
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সফট রোল': [
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন সসেজ': [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
  ],
  'মিট বল': [
    'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515516969-d4008cc6241a?auto=format&fit=crop&w=800&q=80',
  ],
  'চটপটি': [
    'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=800&q=80',
  ],
  'ফুসকা': [
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
  ],
  'ফ্রেঞ্চ ফ্রাই': [
    'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
  ],
  'এগ চিকেন পাস্তা': [
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  ],
  'এগ চিকেন নুডলস': [
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
  ],
  'চিকেন স্প্রিং রোল': [
    'https://images.unsplash.com/photo-1548865175-6c7c4273c52e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
  ],
  'ফিশ ফ্রাই': [
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
  ],
  'পুডিং': [
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
  ],
  'দই ফুসকা': [
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
  ],

  'রেগুলার লাচ্ছি': [
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571006687087-21a478db182c?auto=format&fit=crop&w=800&q=80',
  ],
  'স্পেশাল লাচ্ছি': [
    'https://images.unsplash.com/photo-1571006687087-21a478db182c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  ],
  'কাজুবাদাম লাচ্ছি': [
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571006687087-21a478db182c?auto=format&fit=crop&w=800&q=80',
  ],
  'কোল্ড কফি': [
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
  ],
  'অরেঞ্জ / মাল্টা জুস': [
    'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
  ],
  'ম্যাঙ্গো জুস': [
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
  ],
  'ড্রাগন জুস': [
    'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80',
  ],
  'পেঁপে জুস': [
    'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
  ],
  'তেঁতুল জুস': [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
  ],
  'লেমন জুস': [
    'https://images.unsplash.com/photo-1523677068659-3cb304e08920?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  ],
  'মিন্ট লেমন জুস': [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523677068659-3cb304e08920?auto=format&fit=crop&w=800&q=80',
  ],
  'ম্যাঙ্গো মিল্কশেক': [
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
  ],
  'চকলেট মিল্কশেক': [
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
  ],
  'স্ট্রবেরি মিল্কশেক': [
    'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
  ],
  'হট কফি': [
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  ],
  'স্পেশাল লিকার টি': [
    'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  ],
  'দুধ চা': [
    'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
  ],
};

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

const RAW_CATEGORIES: { id: 'snacks' | 'drinks'; title: string; icon: string; items: { name: string; note: string; price: number }[] }[] = [
  {
    id: 'snacks',
    title: 'স্ন্যাকস মেনু',
    icon: '🍔',
    items: [
      { name: 'ক্রিসপি চিকেন', note: '১ পিস বড়', price: 120 },
      { name: 'চিকেন ফ্রাই', note: '৫ পিস', price: 200 },
      { name: 'চিকেন মোমো', note: '৫ পিস', price: 100 },
      { name: 'চিকেন ফিঙ্গার রোল', note: '৮ পিস', price: 100 },
      { name: 'চিকেন নাগেট', note: '৫ পিস', price: 100 },
      { name: 'চিকেন সমুচা', note: '১ পিস', price: 20 },
      { name: 'চিকেন অনথন', note: '১ পিস', price: 20 },
      { name: 'চিকেন সফট রোল', note: '১ পিস', price: 30 },
      { name: 'চিকেন সসেজ', note: '১ পিস', price: 40 },
      { name: 'মিট বল', note: '১ স্টিক ৪ পিস', price: 50 },
      { name: 'চটপটি', note: '', price: 50 },
      { name: 'ফুসকা', note: '', price: 60 },
      { name: 'ফ্রেঞ্চ ফ্রাই', note: '', price: 80 },
      { name: 'এগ চিকেন পাস্তা', note: '১:২', price: 100 },
      { name: 'এগ চিকেন নুডলস', note: '১:২', price: 100 },
      { name: 'চিকেন স্প্রিং রোল', note: '১ পিস', price: 30 },
      { name: 'ফিশ ফ্রাই', note: '১ স্টিক ৪ পিস', price: 50 },
      { name: 'পুডিং', note: '১ পিস', price: 50 },
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
    const info = INFO[it.name] ?? { tags: [], desc: '', ingredients: [] };
    const images = FOOD_PHOTOS[it.name] ?? [
      `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80`,
    ];
    return {
      id: `${c.id}-${i}`,
      cat: c.id,
      name: it.name,
      note: it.note,
      price: it.price,
      images,
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
