import { getFreeMovies, getYoutubeFreeMovies } from "@/lib/archive";
import { FreeMoviesClient } from "@/components/FreeMoviesClient";

export async function generateMetadata() {
  return {
    title: "Free Movies - Cineverse",
    description: "Watch free movies from Internet Archive and YouTube",
  };
}

export default async function FreeMoviesPage() {
  const [archiveMovies, youtubeMovies] = await Promise.all([
    getFreeMovies(),
    getYoutubeFreeMovies(),
  ]);

  return (
    <FreeMoviesClient 
      archiveMovies={archiveMovies} 
      youtubeMovies={youtubeMovies} 
    />
  );
}