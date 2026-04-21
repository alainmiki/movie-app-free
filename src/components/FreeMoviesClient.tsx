"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Play, X, Search, Filter, Clock, Calendar, Grid, List, Star, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

const closeModalStyles = "absolute -top-14 right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-[#ff6b6b] rounded-full text-white transition-colors";

interface FreeMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube";
  duration?: string;
  genre?: string;
  downloadUrl?: string;
  downloadQuality?: string;
}

interface FreeMoviesClientProps {
  initialTab?: "archive" | "youtube";
  initialQuery?: string;
  archiveMovies: FreeMovie[];
  youtubeMovies: FreeMovie[];
}

export function FreeMoviesClient({ initialTab = "archive", initialQuery = "", archiveMovies, youtubeMovies }: FreeMoviesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"archive" | "youtube">(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedMovie, setSelectedMovie] = useState<FreeMovie | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterGenre, setFilterGenre] = useState<string>("all");

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/free?tab=${activeTab}&query=${encodeURIComponent(searchQuery)}`);
  };

  const handleTabChange = (tab: "archive" | "youtube") => {
    setActiveTab(tab);
    router.push(`/free?tab=${tab}&query=${searchQuery}`);
  };

  const currentMovies = activeTab === "archive" ? archiveMovies : youtubeMovies;
  
  const filteredMovies = filterGenre === "all" 
    ? currentMovies 
    : currentMovies.filter(m => m.genre === filterGenre);

  const genres = ["all", "drama", "comedy", "action", "documentary", "horror", "sci-fi"];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedMovie) {
        setSelectedMovie(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedMovie]);

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMovie]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0a0a0a] pt-12 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-3">
              Free Movies
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Discover thousands of free movies from Internet Archive and YouTube
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1 flex gap-3">
              <button
                onClick={() => handleTabChange("archive")}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "archive"
                    ? "bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>Internet Archive</span>
                <span className="ml-1 text-xs opacity-70">({archiveMovies.length})</span>
              </button>

              <button
                onClick={() => handleTabChange("youtube")}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "youtube"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <span>YouTube</span>
                <span className="ml-1 text-xs opacity-70">({youtubeMovies.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#ff6b6b] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#ff6b6b] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-[#1f1f1f] rounded-2xl p-4 mb-8 shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search movies on ${activeTab === "archive" ? "Internet Archive" : "YouTube"}...`}
                className="w-full h-12 pl-12 pr-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#ff6b6b] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-8 h-12 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold rounded-xl transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#2a2a2a]">
            <Filter className="w-4 h-4 text-[#9ca3af] mt-1" />
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setFilterGenre(genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterGenre === genre
                    ? "bg-[#ff6b6b] text-white"
                    : "bg-[#2a2a2a] text-[#9ca3af] hover:bg-[#3a3a3a]"
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredMovies.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pb-16">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => movie.videoUrl && setSelectedMovie(movie)}
                  className={`group relative overflow-hidden rounded-2xl bg-[#1f1f1f] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
                    movie.videoUrl ? "hover:shadow-[#ff6b6b]/20" : ""
                  }`}
                >
                  <div className="aspect-[2/3] relative bg-[#2a2a2a] overflow-hidden">
                    {movie.thumbnail ? (
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
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {movie.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-[#ff6b6b] flex items-center justify-center shadow-lg shadow-[#ff6b6b]/50 transform scale-50 group-hover:scale-100 transition-transform">
                          <Play className="w-8 h-8 fill-white text-white ml-1" />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                        activeTab === "archive" ? "bg-[#ff6b6b]/90" : "bg-red-600/90"
                      }`}>
                        {movie.source === "archive" ? "Archive" : "YouTube"}
                      </span>
                    </div>

                    {(movie.year || movie.duration) && (
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        {movie.year && (
                          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-medium text-white flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {movie.year}
                          </span>
                        )}
                        {movie.duration && (
                          <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-medium text-white flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {movie.duration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] line-clamp-2 mt-1.5 h-10">
                      {movie.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {movie.genre && (
                        <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs text-[#9ca3af]">
                          {movie.genre}
                        </span>
                      )}
                      {movie.downloadUrl && (
                        <a
                          href={movie.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2 py-1 bg-[#ff6b6b]/20 hover:bg-[#ff6b6b]/30 text-[#ff6b6b] rounded text-xs font-medium transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 pb-16">
              {filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => movie.videoUrl && setSelectedMovie(movie)}
                  className={`group flex gap-4 p-4 bg-[#1f1f1f] rounded-2xl hover:bg-[#252525] transition-all cursor-pointer ${
                    movie.videoUrl ? "hover:shadow-lg hover:shadow-[#ff6b6b]/10" : ""
                  }`}
                >
                  <div className="relative w-32 sm:w-40 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden bg-[#2a2a2a]">
                    {movie.thumbnail ? (
                      <Image
                        src={movie.thumbnail}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        onLoad={() => handleImageLoad(movie.id)}
                        sizes="160px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white/30" />
                      </div>
                    )}
                    {movie.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center">
                          <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                        {movie.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white flex-shrink-0 ${
                        activeTab === "archive" ? "bg-[#ff6b6b]" : "bg-red-600"
                      }`}>
                        {movie.source === "archive" ? "Archive" : "YouTube"}
                      </span>
                    </div>
                    <p className="text-sm text-[#9ca3af] mt-2 line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-[#9ca3af]">
                      {movie.year && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{movie.year}</span>}
                      {movie.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{movie.duration}</span>}
                      {movie.genre && <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs">{movie.genre}</span>}
                    </div>
                    {movie.downloadUrl && (
                      <a
                        href={movie.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#ff6b6b]/20 hover:bg-[#ff6b6b]/30 text-[#ff6b6b] rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[#1f1f1f] flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-[#9ca3af]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-[#9ca3af]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {selectedMovie && selectedMovie.videoUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in"
          onClick={(e) => e.target === e.currentTarget && setSelectedMovie(null)}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedMovie(null)}
              className={closeModalStyles}
              aria-label="Close player"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={selectedMovie.videoUrl}
                title={selectedMovie.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="mt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedMovie.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-[#9ca3af]">
                    {selectedMovie.year && <span>{selectedMovie.year}</span>}
                    {selectedMovie.duration && <span>{selectedMovie.duration}</span>}
                    {selectedMovie.genre && <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-sm">{selectedMovie.genre}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMovie.downloadUrl && (
                    <a
                      href={selectedMovie.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${
                    activeTab === "archive" ? "bg-[#ff6b6b]" : "bg-red-600"
                  }`}>
                    {selectedMovie.source === "archive" ? "Internet Archive" : "YouTube"}
                  </span>
                </div>
              </div>
              {selectedMovie.description && (
                <p className="text-[#9ca3af] mt-4">{selectedMovie.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}