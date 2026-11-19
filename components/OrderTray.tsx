'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useOrderTray } from '@/hooks/useOrderTray';
import { toBn, fallbackSvg } from '@/data/menuData';
import {
  PiShoppingBagLight,
  PiXLight,
  PiPlusLight,
  PiMinusLight,
  PiTrashLight,
  PiPhoneCallLight,
  PiWhatsappLogoLight,
  PiArrowRightLight,
} from 'react-icons/pi';

const RESTAURANT_PHONE = '01793871658';
const WHATSAPP_PHONE = '8801793871658';

export default function OrderTray() {
  const {
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    clearTray,
  } = useOrderTray();
  const [isOpen, setIsOpen] = useState(false);

  if (totalCount === 0) return null;

  // Build formatted Bengali WhatsApp order text
  const buildWhatsAppMessage = () => {
    let msg = 'আসসালামু আলাইকুম, ঘরোয়া স্বাদ থেকে আমি অর্ডার করতে চাই:\n\n';
    items.forEach((entry) => {
      const portion = entry.item.note ? ` (${entry.item.note})` : '';
      const subtotal = entry.quantity * entry.item.price;
      msg += `• ${entry.item.name}${portion} x ${toBn(entry.quantity)} = ${toBn(subtotal)} ৳\n`;
    });
    msg += '\n-----------------------------\n';
    msg += `সর্বমোট মূল্য: ${toBn(totalPrice)} ৳\n`;
    msg += 'ডেলিভারি ঠিকানা / টেবিল নং: ';
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${buildWhatsAppMessage()}`;

  return (
    <>
      {/* Floating Bottom Bar (visible when tray has items) */}
      <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
        <div className="w-full max-w-lg pointer-events-auto bg-[var(--bg-base)]/95 backdrop-blur-[16px] border border-[var(--border-subtle)] rounded-2xl p-3 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] flex items-center justify-center font-medium text-sm relative">
              <PiShoppingBagLight className="text-xl" />
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--tone-strong)] text-[var(--bg-base)] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium border border-[var(--bg-base)]">
                {toBn(totalCount)}
              </span>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] font-medium">অর্ডার ট্রে</div>
              <div className="text-sm font-medium text-[var(--tone-strong)] font-heading">
                {toBn(totalPrice)} ৳ <span className="text-xs font-normal text-[var(--tone-medium)]">({toBn(totalCount)}টি আইটেম)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--tone-strong)] text-[var(--bg-base)] text-xs font-medium rounded-lg hover:opacity-90 active:scale-95 transition-colors cursor-pointer"
          >
            <span>অর্ডার দেখুন</span>
            <PiArrowRightLight className="text-sm" />
          </button>
        </div>
      </div>

      {/* Drawer / Bottom Sheet Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[var(--neutral-black)]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full md:max-w-md max-h-[85vh] md:max-h-[90vh] bg-[var(--bg-base)] border-t md:border border-[var(--border-subtle)] rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden z-10 transition-transform">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-lift)]/50">
              <div className="flex items-center gap-2">
                <PiShoppingBagLight className="text-xl text-[var(--tone-strong)]" />
                <h3 className="font-heading font-medium text-base text-[var(--tone-strong)]">
                  আপনার অর্ডার ট্রে
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--tone-strong)] text-[var(--bg-base)] font-medium">
                  {toBn(totalCount)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearTray}
                  title="ট্রে খালি করুন"
                  className="p-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] transition-colors cursor-pointer"
                >
                  <PiTrashLight className="text-lg" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-[var(--tone-medium)] hover:text-[var(--tone-strong)] rounded-lg hover:bg-[var(--tone-faint)] transition-colors cursor-pointer"
                  aria-label="বন্ধ করুন"
                >
                  <PiXLight className="text-xl" />
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[var(--border-subtle)]">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[var(--bg-lift)] border border-[var(--border-subtle)]">
                    <Image
                      src={item.images[0] || fallbackSvg}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-medium text-sm text-[var(--tone-strong)] truncate">
                      {item.name}
                    </h4>
                    <div className="text-xs text-[var(--tone-medium)]">
                      {item.note && <span className="mr-1.5">{item.note} •</span>}
                      <span>{toBn(item.price)} ৳</span>
                    </div>
                    <div className="text-xs font-medium text-[var(--tone-strong)] mt-0.5">
                      মোট: {toBn(quantity * item.price)} ৳
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-lift)] overflow-hidden">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                      aria-label="কমান"
                    >
                      <PiMinusLight className="text-xs" />
                    </button>
                    <span className="w-7 text-center text-xs font-medium text-[var(--tone-strong)]">
                      {toBn(quantity)}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-7 h-7 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                      aria-label="বাড়ান"
                    >
                      <PiPlusLight className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary & CTAs */}
            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-lift)] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--tone-medium)]">মোট আইটেম:</span>
                <span className="font-medium text-[var(--tone-strong)]">{toBn(totalCount)}টি</span>
              </div>
              <div className="flex items-center justify-between text-base border-t border-[var(--border-subtle)] pt-2">
                <span className="font-heading font-medium text-[var(--tone-strong)]">সর্বমোট মূল্য:</span>
                <span className="font-heading font-medium text-lg text-[var(--tone-strong)]">
                  {toBn(totalPrice)} ৳
                </span>
              </div>

              {/* Order Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] text-xs font-medium hover:opacity-90 active:scale-95 transition-colors cursor-pointer"
                >
                  <PiWhatsappLogoLight className="text-base" />
                  <span>WhatsApp অর্ডার</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_PHONE}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-[var(--tone-strong)] text-[var(--tone-strong)] text-xs font-medium hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                >
                  <PiPhoneCallLight className="text-base" />
                  <span>সরাসরি কল</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
