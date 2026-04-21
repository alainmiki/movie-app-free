"use client";

import { useState, useCallback } from "react";

interface MovieRating {
  movieId: number;
  rating: number;
  createdAt: number;
}

function getStoredRatings(): MovieRating[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cineverse-ratings");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function useMovieRatings() {
  const [ratings, setRatings] = useState<MovieRating[]>(() => getStoredRatings());

  const saveToStorage = useCallback((items: MovieRating[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cineverse-ratings", JSON.stringify(items));
    }
  }, []);

  const rateMovie = useCallback((movieId: number, rating: number) => {
    setRatings((prev) => {
      const existing = prev.findIndex((r) => r.movieId === movieId);
      let newRatings: MovieRating[];
      
      if (existing >= 0) {
        newRatings = [...prev];
        newRatings[existing] = { movieId, rating, createdAt: Date.now() };
      } else {
        newRatings = [...prev, { movieId, rating, createdAt: Date.now() }];
      }
      
      saveToStorage(newRatings);
      return newRatings;
    });
  }, [saveToStorage]);

  const getRating = useCallback(
    (movieId: number) => {
      const rating = ratings.find((r) => r.movieId === movieId);
      return rating?.rating;
    },
    [ratings]
  );

  const removeRating = useCallback((movieId: number) => {
    setRatings((prev) => {
      const newRatings = prev.filter((r) => r.movieId !== movieId);
      saveToStorage(newRatings);
      return newRatings;
    });
  }, [saveToStorage]);

  const getAverageRating = useCallback(() => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  return {
    ratings,
    rateMovie,
    getRating,
    removeRating,
    getAverageRating,
    ratingsCount: ratings.length,
  };
}