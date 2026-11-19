'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gs-favs';

export function useFavorites() {
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavs(new Set(parsed));
        }
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsReady(true);
    }
  }, []);

  const toggleFav = useCallback((id: string): boolean => {
    let nextState = false;
    setFavs(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        nextState = false;
      } else {
        next.add(id);
        nextState = true;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore
      }
      return next;
    });
    return nextState;
  }, []);

  const isFav = useCallback((id: string) => favs.has(id), [favs]);

  return { favs, toggleFav, isFav, isReady };
}
