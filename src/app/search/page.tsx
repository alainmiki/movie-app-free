"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { searchMovies } from "@/lib/tmdb";
import { Movie } from "@/lib/types";
import { SkeletonCard } from "@/components/Skeleton";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSearch() {
      if (!query) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchMovies(query, 1);
        setMovies(data.results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSearch();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-8 tracking-wide">
        Search Movies
      </h1>

      <SearchBar initialQuery={query} />

      {query && (
        <div className="mt-8">
          <p className="text-[#9ca3af] mb-6">
            {loading ? "Searching..." : `${movies.length} results for "${query}"`}
          </p>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <MovieGrid movies={movies} />
          )}
        </div>
      )}

      {!query && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[#9ca3af] text-lg">Search for your favorite movies</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-8 tracking-wide">
            Search Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}