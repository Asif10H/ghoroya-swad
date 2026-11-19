'use client';

import { useEffect } from 'react';

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
      className="fixed left-1/2 -translate-x-1/2 bottom-20 z-[60] rounded-[8px] bg-[var(--tone-strong)] text-[var(--bg-base)] px-4 py-2 text-xs font-mono border border-[var(--border-subtle)] pop"
    >
      {message}
    </div>
  );
}
