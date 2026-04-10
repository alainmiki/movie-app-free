import { searchMovies } from "@/lib/tmdb";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { SkeletonCard } from "@/components/Skeleton";
import { Movie } from "@/lib/types";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q} - Cineverse` : "Search Movies - Cineverse",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  let movies: Movie[] = [];
  let loading = false;
  let totalResults = 0;

  if (query) {
    loading = true;
    try {
      const data = await searchMovies(query, currentPage);
      movies = data.results;
      totalResults = data.total_results;
    } catch (error) {
      console.error("Search error:", error);
    }
    loading = false;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-8 tracking-wide">
        Search Movies
      </h1>

      <SearchBar initialQuery={query || ""} />

      {query && (
        <div className="mt-8">
          <p className="text-[#9ca3af] mb-6">
            {loading ? "Searching..." : `${totalResults} results for "${query}"`}
          </p>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <MovieGrid movies={movies} />
          )}
        </div>
      )}

      {!query && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[#9ca3af] text-lg">Search for your favorite movies</p>
        </div>
      )}
    </div>
  );
}