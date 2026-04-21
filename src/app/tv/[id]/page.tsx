import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTVShowDetails, getTVShowCredits, getSimilarTVShows } from "@/lib/tmdb";
import { getBackdropUrl, getPosterUrl, formatRating } from "@/lib/types";
import { Star, Clock, Calendar, ArrowLeft, Play, Tv } from "lucide-react";
import { CastList } from "@/components/CastList";
import { MovieGrid } from "@/components/MovieGrid";

interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TVShowPageProps) {
  const { id } = await params;
  try {
    const show = await getTVShowDetails(id);
    if (!show) return { title: "TV Show Not Found - Cineverse" };
    return {
      title: `${show.name} - Cineverse`,
      description: show.overview,
    };
  } catch {
    return { title: "TV Show Not Found - Cineverse" };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const { id } = await params;

  let show, credits, similarData;
  try {
    [show, credits, similarData] = await Promise.all([
      getTVShowDetails(id),
      getTVShowCredits(id),
      getSimilarTVShows(id),
    ]);
  } catch {
    notFound();
  }

  if (!show) notFound();

  const backdropUrl = getBackdropUrl(show.backdrop_path, "large");
  const posterUrl = getPosterUrl(show.poster_path, "medium");

  return (
    <div className="animate-fade-in">
      <div className="relative h-[50vh] min-h-[400px]">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={show.name}
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
            href="/tv"
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
                  alt={show.name}
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
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-[#ff6b6b] text-lg italic">&ldquo;{show.tagline}&rdquo;</p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 bg-[#1f1f1f]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-[#ffd93d] fill-[#ffd93d]" />
                <span className="font-semibold text-white">
                  {formatRating(show.vote_average)}
                </span>
                <span className="text-[#9ca3af] text-sm">({show.vote_count.toLocaleString()})</span>
              </div>

              {show.first_air_date && (
                <div className="flex items-center gap-1.5 text-[#9ca3af]">
                  <Calendar className="w-4 h-4" />
                  <span>{show.first_air_date.split("-")[0]}</span>
                </div>
              )}

              {show.number_of_episodes && (
                <div className="flex items-center gap-1.5 text-[#9ca3af]">
                  <Clock className="w-4 h-4" />
                  <span>{show.number_of_episodes} episodes</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
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
              <p className="text-[#9ca3af] leading-relaxed">{show.overview}</p>
            </div>

            {show.seasons && show.seasons.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Seasons</h2>
                <div className="flex flex-wrap gap-3">
                  {show.seasons.filter(s => s.season_number > 0).slice(0, 8).map((season) => (
                    <Link
                      key={season.season_number}
                      href={`/tv/${id}/season/${season.season_number}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg transition-colors"
                    >
                      {season.poster_path && (
                        <Image
                          src={getPosterUrl(season.poster_path, "small") || ""}
                          alt={season.name}
                          width={32}
                          height={48}
                          className="rounded"
                        />
                      )}
                      <div>
                        <span className="text-sm font-medium text-white">{season.name}</span>
                        <span className="text-xs text-[#9ca3af] block">{season.episode_count} eps</span>
                      </div>
                    </Link>
                  ))}
                </div>
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
              Similar TV Shows
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {similarData.results.slice(0, 10).map((show) => (
                <Link
                  key={show.id}
                  href={`/tv/${show.id}`}
                  className="group relative block overflow-hidden rounded-xl bg-[#1f1f1f] transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ff6b6b]/10"
                >
                  <div className="aspect-[2/3] relative">
                    {show.poster_path ? (
                      <Image
                        src={getPosterUrl(show.poster_path, "medium") || ""}
                        alt={show.name || ""}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#1f1f1f] flex items-center justify-center">
                        <Tv className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
                      <span className="text-xs text-white font-medium">
                        {show.first_air_date?.split("-")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#ff6b6b] transition-colors">
                      {show.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}