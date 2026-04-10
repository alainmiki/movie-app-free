import { getFreeMovies } from "@/lib/archive";
import { ArchiveCard } from "@/components/FreeMoviePlayer";

export async function generateMetadata() {
  return {
    title: "Free Movies - Cineverse",
    description: "Watch free movies from Internet Archive",
  };
}

export default async function FreeMoviesPage() {
  const movies = await getFreeMovies();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-wide mb-2">
          Free Movies
        </h1>
        <p className="text-[#9ca3af]">
          Public domain films from Internet Archive - completely free to watch
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="px-3 py-1 bg-[#ff6b6b] rounded text-sm font-semibold text-white">
            Internet Archive
          </div>
          <span className="text-sm text-[#9ca3af]">Public Domain</span>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <ArchiveCard key={movie.identifier} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[#9ca3af] text-lg">Loading free movies...</p>
          </div>
        )}
      </section>

      <section className="border-t border-[#2a2a2a] pt-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="px-3 py-1 bg-red-600 rounded text-sm font-semibold text-white">
            YouTube
          </div>
          <span className="text-sm text-[#9ca3af]">Ad-supported Free Movies</span>
        </div>

        <div className="bg-[#1f1f1f] rounded-xl p-8 text-center">
          <p className="text-[#9ca3af] mb-4">
            YouTube's free movie library is available via embedded links on movie detail pages.
          </p>
          <p className="text-sm text-[#9ca3af]">
            Browse popular movies and look for "Watch Free" buttons on eligible titles.
          </p>
        </div>
      </section>
    </div>
  );
}