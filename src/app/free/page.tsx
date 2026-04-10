import { getFreeMovies, searchArchiveMovies, getYoutubeFreeMovies } from "@/lib/archive";
import { FreeMoviesClient } from "@/components/FreeMoviesClient";

interface FreePageProps {
  searchParams: Promise<{ tab?: string; query?: string }>;
}

export async function generateMetadata() {
  return {
    title: "Free Movies - Cineverse",
    description: "Watch free movies from Internet Archive and YouTube",
  };
}

export default async function FreeMoviesPage({ searchParams }: FreePageProps) {
  const { tab, query } = await searchParams;
  const activeTab = tab === "youtube" ? "youtube" : "archive";

  let archiveMovies = await getFreeMovies();
  let youtubeMovies = await getYoutubeFreeMovies();

  if (query && activeTab === "youtube") {
    youtubeMovies = youtubeMovies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (query && activeTab === "archive") {
    archiveMovies = await searchArchiveMovies(query);
  }

  return (
    <FreeMoviesClient 
      initialTab={activeTab}
      initialQuery={query || ""}
      archiveMovies={archiveMovies} 
      youtubeMovies={youtubeMovies} 
    />
  );
}