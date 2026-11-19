'use client';

import { useState, useEffect, useCallback } from 'react';
import { MenuItem } from '@/types/menu';
import { BY_ID } from '@/data/menuData';

const STORAGE_KEY = 'gs-order-tray';
const CHANGE_EVENT = 'gs-order-tray-change';

export interface TrayItemEntry {
  item: MenuItem;
  quantity: number;
}

export function useOrderTray() {
  const [tray, setTray] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTray(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable or disabled
    }
    setIsLoaded(true);
  }, []);

  // Listen for sync events across components / tabs
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        setTray(stored ? JSON.parse(stored) : {});
      } catch {
        // Storage error ignore
      }
    };

    window.addEventListener(CHANGE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const saveTray = useCallback((newTray: Record<string, number>) => {
    setTray(newTray);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTray));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // Storage error
    }
  }, []);

  const addItem = useCallback(
    (item: MenuItem) => {
      setTray((prev) => {
        const currentQty = prev[item.id] || 0;
        const updated = { ...prev, [item.id]: currentQty + 1 };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(new Event(CHANGE_EVENT));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const removeItem = useCallback(
    (id: string) => {
      setTray((prev) => {
        const currentQty = prev[id] || 0;
        const updated = { ...prev };
        if (currentQty <= 1) {
          delete updated[id];
        } else {
          updated[id] = currentQty - 1;
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(new Event(CHANGE_EVENT));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (id: string, qty: number) => {
      setTray((prev) => {
        const updated = { ...prev };
        if (qty <= 0) {
          delete updated[id];
        } else {
          updated[id] = qty;
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          window.dispatchEvent(new Event(CHANGE_EVENT));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const clearTray = useCallback(() => {
    saveTray({});
  }, [saveTray]);

  const getItemQuantity = useCallback(
    (id: string) => {
      return tray[id] || 0;
    },
    [tray]
  );

  // Compute items list, total count and total price
  const items: TrayItemEntry[] = Object.entries(tray)
    .filter(([_, qty]) => qty > 0)
    .map(([id, quantity]) => {
      const item = BY_ID[id];
      return item ? { item, quantity } : null;
    })
    .filter((entry): entry is TrayItemEntry => entry !== null);

  const totalCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.item.price,
    0
  );

  return {
    tray,
    items,
    isLoaded,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearTray,
    getItemQuantity,
  };
}
