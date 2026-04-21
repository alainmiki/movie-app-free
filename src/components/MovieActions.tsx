"use client";

import { useState, useEffect } from "react";
import { Star, Share2, Link as LinkIcon, Mail, Check, Plus, Check as CheckIcon } from "lucide-react";
import { useMovieRatings } from "@/hooks/useMovieRatings";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Movie, MovieDetails } from "@/lib/types";

interface MovieActionsProps {
  movie: Movie | MovieDetails;
  title: string;
  overview: string;
}

export function MovieActions({ movie, title, overview }: MovieActionsProps) {
  const movieId = movie.id;
  const { rateMovie, getRating } = useMovieRatings();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  
  const [hoverRating, setHoverRating] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const isClient = typeof window !== "undefined";
  const userRating = isClient ? getRating(movieId) : 0;
  const displayRating = hoverRating || userRating || 0;
  const inWatchlist = isClient && isInWatchlist(movieId);

  const handleRate = (rating: number) => {
    rateMovie(movieId, rating);
  };

  const handleAddToWatchlist = () => {
    toggleWatchlist(movie);
  };

  const copyToClipboard = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors
    }
  };

  const shareToTwitter = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
    setShowShareOptions(false);
  };

  const shareToFacebook = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank");
    setShowShareOptions(false);
  };

  const shareToEmail = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out ${title}: ${url}`)}`;
    window.location.href = emailUrl;
    setShowShareOptions(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={handleAddToWatchlist}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          inWatchlist
            ? "bg-[#ff6b6b] text-white"
            : "bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white"
        }`}
      >
        {inWatchlist ? <CheckIcon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {inWatchlist ? "In Watchlist" : "Watchlist"}
      </button>

      <div className="relative flex items-center gap-1 bg-[#1f1f1f] rounded-lg px-2 py-1">
        <Star className={`w-4 h-4 ${displayRating > 0 ? "text-[#ffd93d] fill-[#ffd93d]" : "text-[#9ca3af]"}`} />
        <div className="flex" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHoverRating(star)}
              className="p-0.5 transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  star <= displayRating
                    ? "fill-[#ffd93d] text-[#ffd93d]"
                    : "fill-transparent text-[#9ca3af]"
                }`}
              />
            </button>
          ))}
        </div>
        {userRating && userRating > 0 && (
          <span className="text-sm font-semibold text-white ml-1">{userRating}</span>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowShareOptions(!showShareOptions)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        {showShareOptions && (
          <div className="absolute top-full right-0 mt-2 bg-[#1f1f1f] border border-[#2a2a2a] rounded-xl overflow-hidden z-50 min-w-[200px]">
            <button
              onClick={() => {
                copyToClipboard();
                setShowShareOptions(false);
              }}
              className="w-full px-4 py-3 text-left text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-3"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={shareToTwitter}
              className="w-full px-4 py-3 text-left text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </button>
            <button
              onClick={shareToFacebook}
              className="w-full px-4 py-3 text-left text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-3"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              onClick={shareToEmail}
              className="w-full px-4 py-3 text-left text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-3"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}