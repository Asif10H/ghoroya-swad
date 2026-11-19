'use client';

import React, { useState, useEffect } from 'react';
import { PiDownloadSimpleLight, PiXLight, PiShareNetworkLight } from 'react-icons/pi';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosTip, setShowIosTip] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone app mode
    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true);

    if (isStandalone) {
      return;
    }

    // Check dismissed status
    try {
      const dismissed = localStorage.getItem('gs-install-dismissed');
      if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    } catch {
      // ignore storage access errors
    }

    // Detect iOS Safari
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      const isApple = /iphone|ipad|ipod/.test(ua) && !('MSStream' in window);
      setIsIos(isApple);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIos) {
        setShowIosTip(true);
      }
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } catch {
      // ignore
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosTip(false);
    try {
      localStorage.setItem('gs-install-dismissed', String(Date.now()));
    } catch {
      // ignore
    }
  };

  if (!showPrompt && !showIosTip) {
    return null;
  }

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50">
      <div className="rounded-[10px] bg-[var(--neutral-white)] border border-[var(--border-subtle)] p-3 sm:p-4 backdrop-blur-[16px] flex items-center justify-between gap-3 transition-all">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-10 w-10 shrink-0 rounded-[8px] bg-[var(--tone-strong)] text-[var(--bg-base)] flex items-center justify-center text-lg">
            {isIos ? (
              <PiShareNetworkLight aria-hidden="true" />
            ) : (
              <PiDownloadSimpleLight aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium text-[var(--tone-strong)] truncate">
              ঘরোয়া স্বাদ অ্যাপ
            </p>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
              {showIosTip
                ? 'শেয়ার [↑] চেপে Add to Home Screen দিন'
                : 'হোম স্ক্রিনে ইনস্টল করে অফলাইনেও ব্যবহার করুন'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!showIosTip && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-[8px] bg-[var(--tone-strong)] text-[var(--bg-base)] text-xs font-mono font-medium hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              ইনস্টল
            </button>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            className="h-8 w-8 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--tone-strong)] hover:bg-[var(--bg-lift)] flex items-center justify-center transition-all cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <PiXLight className="text-sm" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPrompt;
