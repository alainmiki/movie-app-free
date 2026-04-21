import Link from "next/link";
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getNowPlayingMovies } from "@/lib/tmdb";
import { HeroSection } from "@/components/HeroSection";
import { MovieGrid } from "@/components/MovieGrid";
import { Play, Tv, Zap } from "lucide-react";

export default async function Home() {
  const [trendingMovies, popularData, topRatedData, nowPlayingData] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);

  const featuredMovie = trendingMovies[0];
  const popularMovies = popularData.results;
  const topRatedMovies = topRatedData.results;
  const nowPlayingMovies = nowPlayingData.results;

  return (
    <div className="animate-fade-in">
      <HeroSection movie={featuredMovie} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
              Now Playing
            </h2>
            <Link
              href="/search"
              className="text-sm text-[#ff6b6b] hover:text-white transition-colors flex items-center gap-1"
            >
              View All <Zap className="w-4 h-4" />
            </Link>
          </div>
          <MovieGrid movies={nowPlayingMovies.slice(0, 5)} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
              Popular Movies
            </h2>
            <Link
              href="/search"
              className="text-sm text-[#ff6b6b] hover:text-white transition-colors flex items-center gap-1"
            >
              View All <Zap className="w-4 h-4" />
            </Link>
          </div>
          <MovieGrid movies={popularMovies} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
              Top Rated
            </h2>
            <Link
              href="/search"
              className="text-sm text-[#ff6b6b] hover:text-white transition-colors flex items-center gap-1"
            >
              View All <Zap className="w-4 h-4" />
            </Link>
          </div>
          <MovieGrid movies={topRatedMovies} />
        </section>

        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/streaming"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0a0a0a] p-8 hover:scale-[1.02] transition-transform"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%2002060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#ff6b6b] flex items-center justify-center shadow-lg shadow-[#ff6b6b]/30">
                  <Tv className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff6b6b] transition-colors">
                    Stream Free Movies
                  </h3>
                  <p className="text-[#9ca3af] text-sm">
                    Pluto TV, Tubi, Archive & more
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/free"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2d1a1a] via-[#2e1616] to-[#0a0a0a] p-8 hover:scale-[1.02] transition-transform"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%2002060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    Free Movies Library
                  </h3>
                  <p className="text-[#9ca3af] text-sm">
                    Internet Archive & YouTube
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
