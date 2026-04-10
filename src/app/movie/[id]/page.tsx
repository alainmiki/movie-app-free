import { notFound } from "next/navigation";
import Image from "next/image";
import { getMovieDetails, getMovieCredits, getSimilarMovies } from "@/lib/tmdb";
import { getBackdropUrl, getPosterUrl, formatRating } from "@/lib/types";
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MovieGrid } from "@/components/MovieGrid";
import { CastList } from "@/components/CastList";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(id);
    return {
      title: `${movie.title} - Cineverse`,
      description: movie.overview,
    };
  } catch {
    return {
      title: "Movie Not Found - Cineverse",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  let movie, credits, similarData;
  try {
    [movie, credits, similarData] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getSimilarMovies(id),
    ]);
  } catch {
    notFound();
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, "large");
  const posterUrl = getPosterUrl(movie.poster_path, "medium");
  const director = credits.crew.find((c) => c.job === "Director");

  return (
    <div className="animate-fade-in">
      <div className="relative h-[50vh] min-h-[400px]">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1f1f1f]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />

        <div className="absolute top-20 left-4 sm:left-8 lg:left-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-48 sm:w-56 lg:w-64 rounded-xl overflow-hidden shadow-2xl mx-auto lg:mx-0">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              ) : (
                <div className="aspect-[2/3] bg-[#1f1f1f]" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-wide">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-[#ff6b6b] text-lg italic">&ldquo;{movie.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 bg-[#1f1f1f]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-[#ffd93d] fill-[#ffd93d]" />
                <span className="font-semibold text-white">
                  {formatRating(movie.vote_average)}
                </span>
                <span className="text-[#9ca3af] text-sm">({movie.vote_count.toLocaleString()})</span>
              </div>

              {movie.runtime && (
                <div className="flex items-center gap-1.5 text-[#9ca3af]">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                </div>
              )}

              {movie.release_date && (
                <div className="flex items-center gap-1.5 text-[#9ca3af]">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.release_date.split("-")[0]}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#ff6b6b]/20 text-[#ff6b6b] rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Overview</h2>
              <p className="text-[#9ca3af] leading-relaxed">{movie.overview}</p>
            </div>

            {director && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Director</h2>
                <p className="text-[#9ca3af]">{director.name}</p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6 tracking-wide">
            Cast
          </h2>
          <CastList credits={credits} />
        </section>

        {similarData.results.length > 0 && (
          <section className="mt-16 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6 tracking-wide">
              Similar Movies
            </h2>
            <MovieGrid movies={similarData.results.slice(0, 10)} />
          </section>
        )}
      </div>
    </div>
  );
}
