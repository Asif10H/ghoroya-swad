'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  PiUserLight,
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
    updateQuantity,
    clearTray,
  } = useOrderTray();
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [nameError, setNameError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Restore saved customer details from localStorage
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('gs-customer-name');
      const savedTable = localStorage.getItem('gs-customer-address');
      if (savedName) setCustomerName(savedName);
      if (savedTable) setTableOrAddress(savedTable);
    } catch {
      // ignore
    }
  }, []);

  // Close drawer automatically if last item is deleted
  useEffect(() => {
    if (totalCount === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [totalCount, isOpen]);

  const handleNameChange = (val: string) => {
    setCustomerName(val);
    if (nameError && val.trim()) {
      setNameError(false);
    }
    try {
      localStorage.setItem('gs-customer-name', val);
    } catch {
      // ignore
    }
  };

  const handleTableChange = (val: string) => {
    setTableOrAddress(val);
    try {
      localStorage.setItem('gs-customer-address', val);
    } catch {
      // ignore
    }
  };

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      setNameError(true);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
        nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setNameError(false);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${buildWhatsAppMessage()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (totalCount === 0) return null;

  // Build formatted Bengali WhatsApp order text with customer details
  const buildWhatsAppMessage = () => {
    let msg = 'আসসালামু আলাইকুম, ঘরোয়া স্বাদ থেকে আমি অর্ডার করতে চাই:\n\n';

    const trimmedName = customerName.trim();
    const trimmedTable = tableOrAddress.trim();
    if (trimmedName) {
      msg += `👤 গ্রাহকের নাম: ${trimmedName}\n`;
    }
    if (trimmedTable) {
      msg += `📍 টেবিল নং / ঠিকানা: ${trimmedTable}\n`;
    }
    if (trimmedName || trimmedTable) {
      msg += '\n';
    }

    msg += '📋 অর্ডারের বিবরণ:\n';
    items.forEach((entry) => {
      const portion = entry.item.note ? ` (${entry.item.note})` : '';
      const subtotal = entry.quantity * entry.item.price;
      msg += `• ${entry.item.name}${portion} x ${toBn(entry.quantity)} = ${toBn(subtotal)} ৳\n`;
    });
    msg += '\n-----------------------------\n';
    msg += `💰 সর্বমোট মূল্য: ${toBn(totalPrice)} ৳\n\n`;
    msg += 'ধন্যবাদ!';
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Floating Bottom Bar (visible when tray has items) */}
      <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
        <div className="w-full max-w-lg pointer-events-auto bg-[var(--bg-base)]/95 backdrop-blur-[16px] border border-[var(--border-subtle)] rounded-2xl p-3 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] flex items-center justify-center font-medium text-sm relative">
              <PiShoppingBagLight className="text-xl" />
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--tone-strong)] text-[var(--bg-base)] text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-mono font-medium border-2 border-[var(--bg-base)] tabular-nums">
                {toBn(totalCount)}
              </span>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">অর্ডার ট্রে</div>
              <div className="text-sm font-medium text-[var(--tone-strong)] font-heading">
                {toBn(totalPrice)} ৳ <span className="text-xs font-normal text-[var(--tone-medium)] font-mono">({toBn(totalCount)}টি আইটেম)</span>
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
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-base)]">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-[var(--tone-faint)] text-[var(--tone-strong)] flex items-center justify-center text-lg border border-[var(--border-subtle)]">
                  <PiShoppingBagLight aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-medium text-base text-[var(--tone-strong)]">
                      আপনার অর্ডার ট্রে
                    </h3>
                    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-[var(--tone-strong)] text-[var(--bg-base)] font-mono text-xs font-medium tabular-nums">
                      {toBn(totalCount)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] font-mono">
                    নির্বাচিত খাবারের তালিকা
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearTray}
                  title="ট্রে খালি করুন"
                  className="p-2 rounded-lg text-xs text-[var(--text-muted)] hover:text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                  aria-label="ট্রে খালি করুন"
                >
                  <PiTrashLight className="text-lg" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] rounded-lg active:scale-95 transition-colors cursor-pointer"
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

                  {/* Quantity Stepper & Individual Item Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="inline-flex items-center border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-lift)] overflow-hidden">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                        aria-label={quantity === 1 ? 'আইটেম বাদ দিন' : 'কমান'}
                        title={quantity === 1 ? 'আইটেম বাদ দিন' : 'কমান'}
                      >
                        {quantity === 1 ? (
                          <PiTrashLight className="text-xs" />
                        ) : (
                          <PiMinusLight className="text-xs" />
                        )}
                      </button>
                      <span className="w-7 text-center text-xs font-medium text-[var(--tone-strong)] font-mono tabular-nums">
                        {toBn(quantity)}
                      </span>
                      <button
                        onClick={() => addItem(item)}
                        className="w-7 h-7 flex items-center justify-center text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                        aria-label="বাড়ান"
                        title="বাড়ান"
                      >
                        <PiPlusLight className="text-xs" />
                      </button>
                    </div>

                    {/* Dedicated Single Item Delete Button */}
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 0)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--tone-strong)] hover:bg-[var(--tone-faint)] active:scale-95 transition-colors cursor-pointer"
                      aria-label={`${item.name} বাদ দিন`}
                      title="আইটেমটি বাদ দিন"
                    >
                      <PiTrashLight className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Information (Name & Table/Address for Restaurant Owner) */}
            <div className="p-3.5 sm:p-4 border-t border-[var(--border-subtle)] bg-[var(--neutral-white)] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--tone-strong)]">
                <PiUserLight className="text-sm text-[var(--tone-strong)]" aria-hidden="true" />
                <span>অর্ডারকারীর তথ্য (রেস্টুরেন্টের সুবিধার জন্য)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="customerName" className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    আপনার নাম <span className="text-[var(--tone-strong)] font-medium">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="নাম লিখুন (যেমন: আসিফ)"
                    aria-invalid={nameError}
                    aria-describedby={nameError ? 'name-error-msg' : undefined}
                    className={`w-full h-9 px-3 rounded-lg border bg-[var(--bg-base)] text-xs text-[var(--tone-strong)] placeholder:text-[var(--text-muted)] outline-none transition-colors font-sans ${
                      nameError
                        ? 'border-[var(--tone-strong)] ring-1 ring-[var(--tone-strong)]'
                        : 'border-[var(--border-subtle)] focus:outline-2 focus:outline-[var(--tone-strong)]'
                    }`}
                  />
                  {nameError && (
                    <p id="name-error-msg" className="mt-1 text-[11px] font-mono text-[var(--tone-strong)] font-medium">
                      ⚠️ অর্ডার করতে অনুগ্রহ করে আপনার নাম লিখুন
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="tableOrAddress" className="block text-[11px] font-mono text-[var(--text-muted)] mb-1">
                    টেবিল নং বা ঠিকানা
                  </label>
                  <input
                    id="tableOrAddress"
                    type="text"
                    value={tableOrAddress}
                    onChange={(e) => handleTableChange(e.target.value)}
                    placeholder="টেবিল নং / বাসা (ঐচ্ছিক)"
                    className="w-full h-9 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] text-xs text-[var(--tone-strong)] placeholder:text-[var(--text-muted)] outline-none focus:outline-2 focus:outline-[var(--tone-strong)] font-sans transition-colors"
                  />
                </div>
              </div>
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
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[var(--tone-strong)] text-[var(--bg-base)] text-xs font-medium hover:opacity-90 active:scale-95 transition-colors cursor-pointer"
                >
                  <PiWhatsappLogoLight className="text-base" />
                  <span>WhatsApp অর্ডার</span>
                </button>
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
