"use client";

import { useState, useCallback } from "react";
import { Movie } from "@/lib/types";

interface RecentlyWatchedItem extends Movie {
  watchedAt: number;
  watchTime?: number;
}

const MAX_RECENT_ITEMS = 20;

function getStoredRecentlyWatched(): RecentlyWatchedItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cineverse-recently-watched");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function useRecentlyWatched() {
  const [recentlyWatched, setRecentlyWatched] = useState<RecentlyWatchedItem[]>(() => getStoredRecentlyWatched());

  const saveToStorage = useCallback((items: RecentlyWatchedItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cineverse-recently-watched", JSON.stringify(items));
    }
  }, []);

  const addToRecentlyWatched = useCallback((movie: Movie, watchTime?: number) => {
    setRecentlyWatched((prev) => {
      const filtered = prev.filter((m) => m.id !== movie.id);
      const newItem: RecentlyWatchedItem = {
        ...movie,
        watchedAt: Date.now(),
        watchTime,
      };
      const newList = [newItem, ...filtered].slice(0, MAX_RECENT_ITEMS);
      saveToStorage(newList);
      return newList;
    });
  }, [saveToStorage]);

  const removeFromRecentlyWatched = useCallback((movieId: number) => {
    setRecentlyWatched((prev) => {
      const newList = prev.filter((m) => m.id !== movieId);
      saveToStorage(newList);
      return newList;
    });
  }, [saveToStorage]);

  const clearRecentlyWatched = useCallback(() => {
    setRecentlyWatched([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const getMovieWatchTime = useCallback(
    (movieId: number) => {
      const item = recentlyWatched.find((m) => m.id === movieId);
      return item?.watchTime;
    },
    [recentlyWatched]
  );

  return {
    recentlyWatched,
    addToRecentlyWatched,
    removeFromRecentlyWatched,
    clearRecentlyWatched,
    getMovieWatchTime,
    recentlyWatchedCount: recentlyWatched.length,
  };
}