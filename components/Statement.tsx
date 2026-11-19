'use client';

import { useEffect, useRef } from 'react';

const STATEMENT_TEXT = 'ঘরের সতেজ স্বাদ আর খাঁটি ভালোবাসায় তৈরি প্রতিটি খাবার।';

export function Statement() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const words = STATEMENT_TEXT.trim().split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="statement__word">${w}</span>`)
      .join(' ');

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const spans = el.querySelectorAll<HTMLSpanElement>('.statement__word');

    if (prefersReducedMotion) {
      spans.forEach((w) => w.classList.add('lit'));
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            spans.forEach((s, idx) => {
              const timer = setTimeout(() => {
                s.classList.add('lit');
              }, idx * 80);
              timeouts.push(timer);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-base)] py-6 sm:py-12 transition-colors"
      aria-label="ব্র্যান্ড স্টেটমেন্ট"
    >
      <div className="max-w-6xl mx-auto px-4">
        <p ref={textRef} className="h0 statement__text max-w-4xl font-heading font-medium text-xl sm:text-4xl text-[var(--tone-strong)] leading-snug" data-words>ঘরের সতেজ স্বাদ আর খাঁটি ভালোবাসায় তৈরি প্রতিটি খাবার।</p>
      </div>
    </section>
  );
}

export default Statement;
