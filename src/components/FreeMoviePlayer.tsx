"use client";

import { useState, useEffect } from "react";
import { Play, X, ExternalLink, Loader2 } from "lucide-react";

interface FreeMoviePlayerProps {
  title: string;
  videoUrl: string;
}

export function FreeMoviePlayer({ title, videoUrl }: FreeMoviePlayerProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!videoUrl) {
    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
      >
        <Play className="w-4 h-4 fill-white" />
        Watch Free
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
      >
        <Play className="w-4 h-4 fill-white" />
        Watch Free
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center h-full">
              <iframe
                src={videoUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface ArchiveCardProps {
  movie: {
    identifier: string;
    title: string;
    description: string;
    date: string;
  };
}

export function ArchiveCard({ movie }: ArchiveCardProps) {
  return (
    <a
      href={`https://archive.org/details/${movie.identifier}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-xl bg-[#1f1f1f] transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ff6b6b]/10"
    >
      <div className="aspect-[2/3] relative bg-[#2a2a2a] flex items-center justify-center">
        <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition-colors" />
        <div className="absolute top-2 right-2 px-2 py-1 bg-[#ff6b6b] rounded text-xs font-semibold text-white">
          Internet Archive
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-[#9ca3af] truncate">{movie.date}</p>
      </div>
    </a>
  );
}