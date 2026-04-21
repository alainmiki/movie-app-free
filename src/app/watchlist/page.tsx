"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, X, Bookmark, Clock, Calendar, Trash2 } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Movie, getPosterUrl } from "@/lib/types";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display text-white tracking-wide">
              My Watchlist
            </h1>
            <p className="text-[#9ca3af] mt-2">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
            </p>
          </div>
          {watchlist.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] hover:bg-red-600/20 hover:text-red-500 text-[#9ca3af] rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-[#1f1f1f] flex items-center justify-center mb-6">
              <Bookmark className="w-12 h-12 text-[#9ca3af]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Your watchlist is empty</h2>
            <p className="text-[#9ca3af] mb-6 max-w-md">
              Start building your watchlist by browsing movies and clicking the bookmark icon
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Play className="w-5 h-5 fill-white" />
              Discover Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {watchlist.map((movie) => (
              <MovieWatchlistCard
                key={movie.id}
                movie={movie}
                onRemove={() => removeFromWatchlist(movie.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MovieWatchlistCard({ 
  movie, 
  onRemove 
}: { 
  movie: Movie & { addedAt: number }; 
  onRemove: () => void;
}) {
  const posterUrl = getPosterUrl(movie.poster_path, "small");
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <div className="group relative bg-[#1f1f1f] rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
      <Link href={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative bg-[#2a2a2a]">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Remove from watchlist"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Link>
      <div className="p-3">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="text-sm font-semibold text-white truncate hover:text-[#ff6b6b] transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1 text-xs text-[#9ca3af]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {releaseYear}
          </span>
          <span className="flex items-center gap-1">
            <StarRating rating={movie.vote_average} />
          </span>
        </div>
        <p className="text-xs text-[#6b7280] mt-1">
          Added {new Date(movie.addedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      <svg className="w-3 h-3 text-[#ffd93d] fill-[#ffd93d]" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}