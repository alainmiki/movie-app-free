"use client";

import { useState } from "react";
import { Play, ExternalLink, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface FreeMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube";
}

interface FreeMoviesClientProps {
  archiveMovies: FreeMovie[];
  youtubeMovies: FreeMovie[];
}

export function FreeMoviesClient({ archiveMovies, youtubeMovies }: FreeMoviesClientProps) {
  const [activeTab, setActiveTab] = useState<"archive" | "youtube">("archive");
  const [selectedMovie, setSelectedMovie] = useState<FreeMovie | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const currentMovies = activeTab === "archive" ? archiveMovies : youtubeMovies;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-wide mb-2">
          Free Movies
        </h1>
        <p className="text-[#9ca3af]">
          Watch movies from Internet Archive and YouTube - completely free
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("archive")}
          className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === "archive"
              ? "bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30"
              : "bg-[#1f1f1f] text-[#9ca3af] hover:bg-[#2a2a2a]"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>Internet Archive</span>
          </div>
          {activeTab === "archive" && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("youtube")}
          className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === "youtube"
              ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
              : "bg-[#1f1f1f] text-[#9ca3af] hover:bg-[#2a2a2a]"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span>YouTube</span>
          </div>
          {activeTab === "youtube" && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => movie.videoUrl && setSelectedMovie(movie)}
            className={`group relative overflow-hidden rounded-xl bg-[#1f1f1f] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
              movie.videoUrl
                ? activeTab === "archive"
                  ? "hover:shadow-[#ff6b6b]/20"
                  : "hover:shadow-red-600/20"
                : ""
            }`}
          >
            <div className="aspect-[2/3] relative bg-[#2a2a2a] overflow-hidden">
              {movie.thumbnail && (
                <>
                  <Image
                    src={movie.thumbnail}
                    alt={movie.title}
                    fill
                    className={`object-cover transition-opacity duration-500 ${
                      loadedImages.has(movie.id) ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(movie.id)}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {!loadedImages.has(movie.id) && (
                    <div className="absolute inset-0 bg-[#2a2a2a] animate-pulse" />
                  )}
                </>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {movie.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    activeTab === "archive"
                      ? "bg-[#ff6b6b]"
                      : "bg-red-600"
                  } shadow-lg`}>
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </div>
                </div>
              )}

              <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                activeTab === "archive" ? "bg-[#ff6b6b]" : "bg-red-600"
              }`}>
                {movie.source === "archive" ? "Archive" : "YouTube"}
              </div>

              {movie.year && (
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-medium text-white">
                    {movie.year}
                  </span>
                </div>
              )}
            </div>

            <div className="p-3">
              <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                {movie.title}
              </h3>
              <p className="text-xs text-[#9ca3af] line-clamp-2 mt-1">
                {movie.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && selectedMovie.videoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={selectedMovie.videoUrl}
                title={selectedMovie.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">{selectedMovie.title}</h3>
              <p className="text-[#9ca3af] mt-1">{selectedMovie.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}