"use client";

import { useState, useCallback } from "react";
import { Movie } from "@/lib/types";

interface WatchlistItem extends Movie {
  addedAt: number;
}

function getStoredWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cineverse-watchlist");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => getStoredWatchlist());

  const saveToStorage = useCallback((items: WatchlistItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cineverse-watchlist", JSON.stringify(items));
    }
  }, []);

  const addToWatchlist = useCallback((movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const newList = [...prev, { ...movie, addedAt: Date.now() }];
      saveToStorage(newList);
      return newList;
    });
  }, [saveToStorage]);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist((prev) => {
      const newList = prev.filter((m) => m.id !== movieId);
      saveToStorage(newList);
      return newList;
    });
  }, [saveToStorage]);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (movie: Movie) => {
      setWatchlist((prev) => {
        const exists = prev.some((m) => m.id === movie.id);
        let newList: WatchlistItem[];
        if (exists) {
          newList = prev.filter((m) => m.id !== movie.id);
        } else {
          newList = [...prev, { ...movie, addedAt: Date.now() }];
        }
        saveToStorage(newList);
        return newList;
      });
    },
    [saveToStorage]
  );

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    watchlistCount: watchlist.length,
  };
}