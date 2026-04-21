"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, X } from "lucide-react";
import { MovieVideos } from "@/lib/types";

interface MovieTrailerProps {
  videos: MovieVideos;
}

export function MovieTrailer({ videos }: MovieTrailerProps) {
  const [showModal, setShowModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const trailer = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
  );
  const teaser = videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Teaser"
  );
  const ytVideo = trailer || teaser;

  const closeTrailer = useCallback(() => {
    setShowModal(false);
    setTrailerKey(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        closeTrailer();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal, closeTrailer]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  if (!ytVideo) {
    return (
      <div className="flex items-center gap-2 text-[#9ca3af]">
        <Play className="w-4 h-4" />
        <span className="text-sm">No trailer available</span>
      </div>
    );
  }

  const openTrailer = () => {
    setTrailerKey(ytVideo.key);
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={openTrailer}
        className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
      >
        <Play className="w-4 h-4 fill-white" />
        Watch Trailer
      </button>

      {showModal && trailerKey && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && closeTrailer()}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={closeTrailer}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#ff6b6b] rounded-full text-white transition-colors"
              aria-label="Close trailer"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}