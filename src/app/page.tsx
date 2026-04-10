import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from "@/lib/tmdb";
import { HeroSection } from "@/components/HeroSection";
import { MovieGrid } from "@/components/MovieGrid";

export default async function Home() {
  const [trendingMovies, popularData, topRatedData] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const featuredMovie = trendingMovies[0];
  const popularMovies = popularData.results;
  const topRatedMovies = topRatedData.results;

  return (
    <div className="animate-fade-in">
      <HeroSection movie={featuredMovie} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6 tracking-wide">
            Popular Movies
          </h2>
          <MovieGrid movies={popularMovies} />
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6 tracking-wide">
            Top Rated
          </h2>
          <MovieGrid movies={topRatedMovies} />
        </section>
      </div>
    </div>
  );
}
