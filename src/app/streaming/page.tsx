import { getFreeMovies, getYoutubeFreeMovies } from "@/lib/archive";
import { getPlutoMovies, getTubiMovies, StreamingMovie } from "@/lib/streaming";
import { StreamingClient } from "@/components/StreamingClient";

interface StreamingPageProps {
  searchParams: Promise<{ tab?: string; query?: string; genre?: string }>;
}

export async function generateMetadata() {
  return {
    title: "Watch Free Movies & TV Shows - Cineverse",
    description: "Stream free movies and TV shows from Pluto TV, Tubi, Internet Archive and YouTube",
  };
}

export default async function StreamingPage({ searchParams }: StreamingPageProps) {
  const { tab, query, genre } = await searchParams;
  const activeTab = tab || "all";
  const filterGenre = genre || "all";

  const [archiveMovies, youtubeMovies, plutoMovies, tubiMovies] = await Promise.all([
    getFreeMovies(),
    getYoutubeFreeMovies(),
    getPlutoMovies(),
    getTubiMovies(),
  ]);

  const allMovies: StreamingMovie[] = [
    ...archiveMovies.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      year: m.year,
      thumbnail: m.thumbnail,
      videoUrl: m.videoUrl,
      source: "archive" as const,
      duration: m.duration,
      genre: m.genre,
      downloadUrl: m.downloadUrl,
      type: "movie" as const,
    })),
    ...youtubeMovies.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      year: m.year,
      thumbnail: m.thumbnail,
      videoUrl: m.videoUrl,
      source: "youtube" as const,
      duration: m.duration,
      genre: m.genre,
      type: "movie" as const,
    })),
    ...plutoMovies,
    ...tubiMovies,
  ];

  let filteredMovies = allMovies;
  
  if (activeTab !== "all") {
    filteredMovies = allMovies.filter(m => m.source === activeTab);
  }

  if (query) {
    const q = query.toLowerCase();
    filteredMovies = filteredMovies.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.description.toLowerCase().includes(q)
    );
  }

  if (filterGenre !== "all") {
    filteredMovies = filteredMovies.filter(m => m.genre === filterGenre);
  }

  return (
    <StreamingClient 
      initialTab={activeTab}
      initialQuery={query || ""}
      initialGenre={filterGenre}
      movies={filteredMovies}
      allMoviesCount={{
        all: allMovies.length,
        archive: archiveMovies.length,
        youtube: youtubeMovies.length,
        pluto: plutoMovies.length,
        tubi: tubiMovies.length,
      }}
    />
  );
}