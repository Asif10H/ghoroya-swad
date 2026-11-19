'use client';

import { useEffect } from 'react';

export function PwaServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .catch(() => {
            // Service worker registration error ignored
          });
      });
    }
  }, []);

  return null;
}

export default PwaServiceWorker;
