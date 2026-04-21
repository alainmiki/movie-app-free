"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { Movie, getPosterUrl } from "@/lib/types";
import { useRecentlyWatched } from "@/hooks/useRecentlyWatched";

export function RecentlyWatchedSection() {
  const { recentlyWatched, clearRecentlyWatched } = useRecentlyWatched();
  const [isClient, setIsClient] = useState(false);
  
  if (!isClient) {
    setIsClient(true);
  }

  if (recentlyWatched.length === 0) {
    return null;
  }

  const displayMovies = recentlyWatched.slice(0, 5);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
          Continue Watching
        </h2>
        <button
          onClick={clearRecentlyWatched}
          className="text-sm text-[#9ca3af] hover:text-white transition-colors"
        >
          Clear History
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group relative bg-[#1f1f1f] rounded-xl overflow-hidden hover:scale-[1.02] transition-all"
          >
            <div className="aspect-[2/3] relative">
              {(() => {
                const posterUrl = getPosterUrl(movie.poster_path, "small");
                return posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[#2a2a2a] flex items-center justify-center">
                  <Play className="w-8 h-8 text-white/30" />
                </div>
              );
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2a2a2a]">
                <div 
                  className="h-full bg-[#ff6b6b]" 
                  style={{ width: movie.watchTime ? `${Math.min(movie.watchTime, 100)}%` : '30%' }}
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center">
                  <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-sm font-semibold text-white truncate">
                {movie.title}
              </h3>
              <p className="text-xs text-[#9ca3af] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {movie.watchTime ? `${movie.watchTime}% watched` : '30% watched'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}