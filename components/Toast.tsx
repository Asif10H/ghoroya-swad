'use client';

import { useEffect } from 'react';
import { PiCheckCircleLight } from 'react-icons/pi';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 1800);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 bottom-20 z-[60] rounded-[8px] bg-[var(--tone-strong)] text-[var(--bg-base)] px-4 py-2 text-xs font-mono border border-[var(--border-subtle)] inline-flex items-center gap-1.5 transition-opacity"
    >
      <PiCheckCircleLight className="text-sm shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
