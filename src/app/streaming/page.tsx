import { getPlutoMovies, getTubiMovies, getArchiveMovies, getYoutubeMovies, searchMovies, getMoviesByGenre, StreamingMovie } from "@/lib/streaming";
import { StreamingClient } from "@/components/StreamingClient";

interface StreamingPageProps {
  searchParams: Promise<{ tab?: string; query?: string; genre?: string; page?: string }>;
}

export async function generateMetadata() {
  return {
    title: "Watch Free Movies & TV Shows - Cineverse",
    description: "Stream free movies and TV shows from Pluto TV, Tubi, Internet Archive and YouTube",
  };
}

export default async function StreamingPage({ searchParams }: StreamingPageProps) {
  const { tab, query, genre, page } = await searchParams;
  const activeTab = tab || "all";
  const filterGenre = genre || "all";
  const currentPage = parseInt(page || "1", 10);
  const limit = 20;

  let movies: StreamingMovie[] = [];
  let total = 0;

  if (query) {
    const result = await searchMovies(query, activeTab, currentPage, limit);
    movies = result.movies;
    total = result.total;
  } else if (filterGenre !== "all") {
    const result = await getMoviesByGenre(filterGenre, activeTab, currentPage, limit);
    movies = result.movies;
    total = result.total;
  } else {
    const [pluto, tubi, archive, youtube] = await Promise.all([
      getPlutoMovies(currentPage, limit),
      getTubiMovies(currentPage, limit),
      getArchiveMovies(currentPage, limit),
      getYoutubeMovies(currentPage, limit),
    ]);

    let allMovies: StreamingMovie[] = [];
    
    if (activeTab === "all") {
      allMovies = [...pluto.movies, ...tubi.movies, ...archive.movies, ...youtube.movies];
      total = pluto.total + tubi.total + archive.total + youtube.total;
    } else if (activeTab === "pluto") {
      allMovies = pluto.movies;
      total = pluto.total;
    } else if (activeTab === "tubi") {
      allMovies = tubi.movies;
      total = tubi.total;
    } else if (activeTab === "archive") {
      allMovies = archive.movies;
      total = archive.total;
    } else if (activeTab === "youtube") {
      allMovies = youtube.movies;
      total = youtube.total;
    }
    
    movies = allMovies;
  }

  const totalPluto = 400;
  const totalTubi = 400;
  const totalArchive = 400;
  const totalYoutube = 400;
  const totalAll = totalPluto + totalTubi + totalArchive + totalYoutube;

  return (
    <StreamingClient 
      initialTab={activeTab}
      initialQuery={query || ""}
      initialGenre={filterGenre}
      initialPage={currentPage}
      movies={movies}
      totalMovies={total}
      totalPages={Math.ceil(total / limit)}
      allMoviesCount={{
        all: totalAll,
        archive: totalArchive,
        youtube: totalYoutube,
        pluto: totalPluto,
        tubi: totalTubi,
      }}
    />
  );
}