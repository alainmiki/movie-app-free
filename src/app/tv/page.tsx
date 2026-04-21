import Link from "next/link";
import Image from "next/image";
import { getTrendingTVShows, getPopularTVShows } from "@/lib/tmdb";
import { getPosterUrl, formatRating } from "@/lib/types";
import { Play, Tv, Zap, Star } from "lucide-react";

export default async function TVPage() {
  const [trendingShows, popularData] = await Promise.all([
    getTrendingTVShows(),
    getPopularTVShows(),
  ]);

  const featuredShow = trendingShows[0];
  const popularShows = popularData.results;

  return (
    <div className="animate-fade-in">
      {featuredShow && (
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {featuredShow.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${featuredShow.backdrop_path}`}
              alt={featuredShow.name || ""}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-end">
                <div className="hidden lg:block relative w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
                  {featuredShow.poster_path && (
                    <Image
                      src={getPosterUrl(featuredShow.poster_path, "medium") || ""}
                      alt={featuredShow.name || ""}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 text-[#ff6b6b] font-medium">
                    <Tv className="w-5 h-5" />
                    TV Show
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display text-white tracking-wide">
                    {featuredShow.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 bg-[#1f1f1f]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="w-4 h-4 text-[#ffd93d] fill-[#ffd93d]" />
                      <span className="font-semibold text-white">
                        {formatRating(featuredShow.vote_average)}
                      </span>
                      <span className="text-[#9ca3af]">({featuredShow.vote_count.toLocaleString()})</span>
                    </div>
                    {featuredShow.first_air_date && (
                      <span className="text-[#9ca3af]">
                        {featuredShow.first_air_date.split("-")[0]}
                      </span>
                    )}
                  </div>

                  <p className="text-[#9ca3af] text-sm sm:text-base max-w-2xl line-clamp-3 sm:line-clamp-4">
                    {featuredShow.overview || "No overview available."}
                  </p>

                  <Link
                    href={`/tv/${featuredShow.id}`}
                    className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
              Popular TV Shows
            </h2>
            <Link
              href="/search?type=tv"
              className="text-sm text-[#ff6b6b] hover:text-white transition-colors flex items-center gap-1"
            >
              View All <Zap className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {popularShows.map((show) => {
              const posterUrl = getPosterUrl(show.poster_path, "medium");
              return (
                <Link
                  key={show.id}
                  href={`/tv/${show.id}`}
                  className="group relative block overflow-hidden rounded-xl bg-[#1f1f1f] transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#ff6b6b]/10"
                >
                  <div className="aspect-[2/3] relative">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
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
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-[#ffd93d] fill-[#ffd93d]" />
                      <span className="text-xs font-semibold text-white">
                        {formatRating(show.vote_average)}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
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
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}