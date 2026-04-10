"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Play, X, Search, Filter, Clock, Calendar, Grid, List, Download, Star, ExternalLink, Film, Tv, MonitorPlay } from "lucide-react";
import Image from "next/image";

export interface StreamingMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube" | "pluto" | "tubi" | "public";
  duration?: string;
  genre?: string;
  downloadUrl?: string;
  rating?: string;
  type: "movie" | "tv";
}

interface StreamingClientProps {
  initialTab?: string;
  initialQuery?: string;
  initialGenre?: string;
  movies: StreamingMovie[];
  allMoviesCount: {
    all: number;
    archive: number;
    youtube: number;
    pluto: number;
    tubi: number;
  };
}

const sourceInfo: Record<string, { name: string; color: string; icon: string }> = {
  archive: { name: "Internet Archive", color: "bg-[#ff6b6b]", icon: "🌐" },
  youtube: { name: "YouTube", color: "bg-red-600", icon: "▶️" },
  pluto: { name: "Pluto TV", color: "bg-indigo-600", icon: "📺" },
  tubi: { name: "Tubi", color: "bg-green-600", icon: "📺" },
  public: { name: "Public Domain", color: "bg-orange-600", icon: "🎬" },
};

const genres = ["all", "action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "crime", "thriller"];

export function StreamingClient({ initialTab = "all", initialQuery = "", initialGenre = "all", movies, allMoviesCount }: StreamingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterGenre, setFilterGenre] = useState(initialGenre);
  const [selectedMovie, setSelectedMovie] = useState<StreamingMovie | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/streaming?tab=${activeTab}&query=${encodeURIComponent(searchQuery)}&genre=${filterGenre}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/streaming?tab=${tab}&query=${searchQuery}&genre=${filterGenre}`);
  };

  const handleGenreChange = (g: string) => {
    setFilterGenre(g);
    router.push(`/streaming?tab=${activeTab}&query=${searchQuery}&genre=${g}`);
  };

  const tabs = [
    { id: "all", label: "All", count: allMoviesCount.all, icon: MonitorPlay },
    { id: "pluto", label: "Pluto TV", count: allMoviesCount.pluto, icon: Tv },
    { id: "tubi", label: "Tubi", count: allMoviesCount.tubi, icon: Film },
    { id: "archive", label: "Archive", count: allMoviesCount.archive, icon: MonitorPlay },
    { id: "youtube", label: "YouTube", count: allMoviesCount.youtube, icon: Play },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0a0a0a] pt-12 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-3">
              Stream Free Movies & TV
            </h1>
            <p className="text-lg text-[#9ca3af]">
              Watch thousands of free movies and shows from Pluto TV, Tubi, and more
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-[#ff6b6b] text-white shadow-lg shadow-[#ff6b6b]/30"
                      : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="text-xs opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#ff6b6b] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#ff6b6b] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
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
                placeholder="Search movies and shows..."
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

          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#2a2a2a]">
            <Filter className="w-4 h-4 text-[#9ca3af] mt-0.5" />
            <span className="text-sm text-[#9ca3af] mr-2">Genre:</span>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => handleGenreChange(g)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filterGenre === g
                    ? "bg-[#ff6b6b] text-white"
                    : "bg-[#2a2a2a] text-[#9ca3af] hover:bg-[#3a3a3a]"
                }`}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {movies.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 pb-16">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="group relative overflow-hidden rounded-2xl bg-[#1f1f1f] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ff6b6b]/10 cursor-pointer"
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
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#ff6b6b] flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                        <Play className="w-8 h-8 fill-white text-white ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${sourceInfo[movie.source]?.color || "bg-gray-600"}`}>
                        {sourceInfo[movie.source]?.name || movie.source}
                      </span>
                    </div>

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
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] line-clamp-2 mt-1.5">
                      {movie.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {movie.genre && (
                        <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs text-[#9ca3af]">
                          {movie.genre}
                        </span>
                      )}
                      {movie.rating && (
                        <span className="flex items-center gap-1 text-xs text-[#ffd93d]">
                          <Star className="w-3 h-3 fill-[#ffd93d]" />
                          {movie.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 pb-16">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className="group flex gap-4 p-4 bg-[#1f1f1f] rounded-2xl hover:bg-[#252525] transition-all cursor-pointer hover:shadow-lg hover:shadow-[#ff6b6b]/10"
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                        {movie.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold text-white flex-shrink-0 ${sourceInfo[movie.source]?.color || "bg-gray-600"}`}>
                        {sourceInfo[movie.source]?.name || movie.source}
                      </span>
                    </div>
                    <p className="text-sm text-[#9ca3af] mt-2 line-clamp-2">
                      {movie.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-[#9ca3af]">
                      {movie.year && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{movie.year}</span>}
                      {movie.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{movie.duration}</span>}
                      {movie.genre && <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs">{movie.genre}</span>}
                      {movie.rating && <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#ffd93d] text-[#ffd93d]" />{movie.rating}</span>}
                    </div>
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

      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl mb-6">
              {selectedMovie.videoUrl ? (
                <iframe
                  src={selectedMovie.videoUrl}
                  title={selectedMovie.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedMovie.thumbnail ? (
                <Image
                  src={selectedMovie.thumbnail}
                  alt={selectedMovie.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            
            <div className="bg-[#1f1f1f] rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedMovie.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-[#9ca3af]">
                    {selectedMovie.year && <span>{selectedMovie.year}</span>}
                    {selectedMovie.duration && <span>{selectedMovie.duration}</span>}
                    {selectedMovie.genre && <span className="px-2 py-0.5 bg-[#2a2a2a] rounded text-sm">{selectedMovie.genre}</span>}
                    {selectedMovie.rating && <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-[#ffd93d] text-[#ffd93d]" />{selectedMovie.rating}</span>}
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold text-white ${sourceInfo[selectedMovie.source]?.color || "bg-gray-600"}`}>
                  {sourceInfo[selectedMovie.source]?.name || selectedMovie.source}
                </span>
              </div>
              
              {selectedMovie.description && (
                <p className="text-[#9ca3af] mb-4">{selectedMovie.description}</p>
              )}
              
              <div className="flex flex-wrap gap-3">
                {selectedMovie.videoUrl && (
                  <a
                    href={selectedMovie.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#ff6b6b] hover:bg-[#ff5252] text-white rounded-xl font-medium transition-colors"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    Watch Now
                  </a>
                )}
                {selectedMovie.downloadUrl && (
                  <a
                    href={selectedMovie.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-xl font-medium transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}