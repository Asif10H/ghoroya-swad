# ঘরোয়া স্বাদ রেস্টুরেন্ট — ডিজিটাল মেনু (Ghoroya Swad Restaurant)

একটি আধুনিক, মিনিমালিস্ট এবং এডিটোরিয়াল ডিজাইনের রেস্টুরেন্ট ডিজিটাল মেনু ওয়েব অ্যাপ্লিকেশন। Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 এবং Phosphor Icons (`react-icons/pi`) দিয়ে নির্মিত।

---

## বৈশিষ্ট্যসমূহ (Features)

- **🎨 Monochrome Editorial Taste Design System**:
  - খাঁটি একবর্ণ (Achromatic) প্যালেট: `#151515`, `#ededed` এবং নিখুঁত আলফা টোকেন।
  - কালার শুধু খাবারের আসল ফটোগ্রাফিতে (Authentic High-Resolution Food Photography)।
  - জিরো বক্স-শ্যাডো (Zero box-shadows), ১৬ পিক্সেল ব্যাকড্রপ ব্লার ও সূক্ষ্ম ১ পিক্সেল বর্ডার।
  - টাইপোগ্রাফি: Geist + Hind Siliguri এবং Geist Mono (দাম ও মেটাডেটা)।
  - Phosphor Light আইকনোগ্রাফি (`react-icons/pi`)।
- **🍽️ সম্পূর্ণ মেনু ক্যাটালগ (৩৬টি পদ)**:
  - ১৯টি স্ন্যাকস পদ (ক্রিসপি চিকেন, মোমো, ফুসকা, চটপটি, ইত্যাদি)।
  - ১৭টি ড্রিংকস ও জুস পদ (লাচ্ছি, কোল্ড কফি, ফ্রেশ জুস, মিল্কশেক, স্পেশাল চা)।
  - প্রতিটি খাবারের উপাদান (Ingredients), বিবরণ ও নোট।
- **⚡ ইন্টারঅ্যাক্টিভ মেনু এক্সপ্লোরার**:
  - ইনস্ট্যান্ট লাইভ সার্চ (খাবারের নাম, বিবরণ ও উপাদান সার্চ)।
  - ক্যাটাগরি ও প্রাইস রেঞ্জ ফিল্টারিং (৫০ ৳ পর্যন্ত, ৫১–১০০ ৳, ১০০ ৳+)।
  - ডাইনামিক সর্টিং (ডিফল্ট, কম থেকে বেশি দাম, বেশি থেকে কম দাম)।
  - গ্রিড ও লিস্ট ভিউ টগল (Grid & List View Switcher)।
- **❤️ পছন্দের তালিকা (Favorites)**:
  - লোকাল স্টোরেজে ফেভারিট সেভ এবং লাইভ কাউন্টার।
- **🕒 রিয়েল-টাইম রেস্টুরেন্ট স্ট্যাটাস**:
  - ঢাকা টাইমজোন (Asia/Dhaka) অনুযায়ী রেস্টুরেন্ট খোলা/বন্ধের লাইভ স্ট্যাটাস।
- **🔍 ইন্টারেক্টিভ আইটেম মোডাল**:
  - ফুল-স্ক্রিন ফটো গ্যালারি উইথ স্লাইডার ও থাম্বনেইল স্ট্রিপ।
  - রিলেটেড ফুড আইটেম ব্রাউজিং।
  - ওয়েব শেয়ার এপিআই (Web Share API) ও কপি লিংক অপশন।
- **🌓 ডার্ক মোড সাপোর্ট**:
  - সিস্টেম ও ম্যানুয়াল টগল এবং জিরো FOUC প্রিভেনশন।

---

## টেকনোলজি স্ট্যাক (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [React Icons (Phosphor Light)](https://react-icons.github.io/react-icons/icons/pi/)
- **Fonts**: Hind Siliguri, Geist, Geist Mono (via `next/font/google`)

---

## লোকাল ডেভেলপমেন্ট সেটআপ (Getting Started)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ২. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করুন।

### ৩. প্রোডাকশন বিল্ড তৈরি করুন
```bash
npm run build
npm start
```

---

## লাইসেন্স (License)

ব্যক্তিগত ও বাণিজ্যিক ব্যবহারের জন্য অনুমোদিত।
© ঘরোয়া স্বাদ রেস্টুরেন্ট, খাগড়াছড়ি সদর।
