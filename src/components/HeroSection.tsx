"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Movie, getBackdropUrl, getPosterUrl, formatRating } from "@/lib/types";

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, "large");
  const posterUrl = getPosterUrl(movie.poster_path, "small");

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {backdropUrl ? (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[#1f1f1f]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-end">
            <div className="hidden lg:block relative w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[#1f1f1f]" />
              )}
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-white tracking-wide">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 bg-[#1f1f1f]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-[#ffd93d] fill-[#ffd93d]" />
                  <span className="font-semibold text-white">
                    {formatRating(movie.vote_average)}
                  </span>
                  <span className="text-[#9ca3af]">({movie.vote_count.toLocaleString()})</span>
                </div>
                {movie.release_date && (
                  <span className="text-[#9ca3af]">
                    {movie.release_date.split("-")[0]}
                  </span>
                )}
              </div>

              <p className="text-[#9ca3af] text-sm sm:text-base max-w-2xl line-clamp-3 sm:line-clamp-4">
                {movie.overview || "No overview available."}
              </p>

              <Link
                href={`/movie/${movie.id}`}
                className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <Play className="w-5 h-5 fill-white" />
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
