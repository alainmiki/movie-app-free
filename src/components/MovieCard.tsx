"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Bookmark, Plus, Check } from "lucide-react";
import { Movie, getPosterUrl, getYear, formatRating } from "@/lib/types";
import { useWatchlist } from "@/hooks/useWatchlist";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, "medium");
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block overflow-hidden rounded-xl bg-[#1f1f1f] transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ff6b6b]/10"
    >
      <div className="aspect-[2/3] relative">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1f1f1f] flex items-center justify-center">
            <span className="text-[#9ca3af] text-sm">No Poster</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            inWatchlist
              ? "bg-[#ff6b6b] text-white"
              : "bg-black/70 backdrop-blur-sm text-white hover:bg-[#ff6b6b]"
          }`}
          aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 text-[#ffd93d] fill-[#ffd93d]" />
          <span className="text-xs font-semibold text-white">
            {formatRating(movie.vote_average)}
          </span>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
          <span className="text-xs text-white font-medium">
            {getYear(movie.release_date)}
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}