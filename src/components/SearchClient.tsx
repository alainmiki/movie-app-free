"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchMovies, searchTVShows } from "@/lib/tmdb";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { SkeletonCard } from "@/components/Skeleton";
import { Movie, TVShow } from "@/lib/types";

export function SearchClient({ initialQuery = "", initialType = "movie" }: { initialQuery?: string; initialType?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [mediaType, setMediaType] = useState<"movie" | "tv">(initialType as "movie" | "tv");
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = useCallback(async (page: number) => {
    if (!query) return [];
    if (mediaType === "movie") {
      const data = await searchMovies(query, page);
      return data.results;
    } else {
      const data = await searchTVShows(query, page);
      return data.results;
    }
  }, [query, mediaType]);

  const { items, setItems, loading, hasMore, loadMoreRef, reset } = useInfiniteScroll<Movie | TVShow>(fetchMovies);

  useEffect(() => {
    reset();
    setItems([]);
    const fetchInitial = async () => {
      if (!query) {
        return;
      }
      const data = mediaType === "movie" 
        ? await searchMovies(query, 1)
        : await searchTVShows(query, 1);
      setItems(data.results);
      setTotalResults(data.total_results);
    };
    fetchInitial();
  }, [query, mediaType, reset, setItems]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    router.push(`/search?q=${encodeURIComponent(newQuery)}&type=${mediaType}`);
  };

  const handleTypeChange = (type: "movie" | "tv") => {
    setMediaType(type);
    router.push(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-8 tracking-wide">
        Search
      </h1>

      <SearchBar initialQuery={query} onSearch={handleSearch} />

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => handleTypeChange("movie")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mediaType === "movie"
              ? "bg-[#ff6b6b] text-white"
              : "bg-[#1f1f1f] text-[#9ca3af] hover:text-white"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => handleTypeChange("tv")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mediaType === "tv"
              ? "bg-[#ff6b6b] text-white"
              : "bg-[#1f1f1f] text-[#9ca3af] hover:text-white"
          }`}
        >
          TV Shows
        </button>
      </div>

      {query && (
        <div className="mt-8">
          <p className="text-[#9ca3af] mb-6">
            {loading && items.length === 0 ? "Searching..." : `${totalResults} results for "${query}"`}
          </p>
          
          <MovieGrid movies={items as Movie[]} />
          
          {hasMore && (
            <div ref={loadMoreRef} className="py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[#9ca3af] text-lg">Search for your favorite movies and TV shows</p>
        </div>
      )}
    </div>
  );
}