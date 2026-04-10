const BASE_URL = "https://archive.org/advancedsearch.php";

export interface FreeMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube";
}

export interface ArchiveMovieFile {
  name: string;
  format?: string;
  url?: string;
}

export interface ArchiveMovie {
  identifier: string;
  title: string;
  description: string;
  date: string;
  runtime: string;
  creator: string;
  downloads: string;
  download1?: string;
}

export interface ArchiveMetadata {
  metadata?: {
    title?: string[];
    description?: string[];
    date?: string[];
    runtime?: string[];
    creator?: string[];
  };
  files?: Record<string, ArchiveMovieFile>;
}

export interface ArchiveSearchResponse {
  response: {
    numFound: number;
    start: 0;
    docs: ArchiveMovie[];
  };
}

export async function getFreeMovies(page: number = 1): Promise<FreeMovie[]> {
  const params = new URLSearchParams({
    q: "mediatype:movies AND format:Vimeo MP4",
    fl: "identifier,title,description,date,runtime,creator,downloads",
    sort: "downloads desc",
    rows: "20",
    page: page.toString(),
    output: "json",
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Archive Error");
    }

    const data: ArchiveSearchResponse = await response.json();
    return data.response.docs.map((movie) => ({
      id: movie.identifier,
      title: movie.title,
      description: movie.description || "",
      year: movie.date?.split("-")[0] || "",
      thumbnail: `https://archive.org/services/img/${movie.identifier}`,
      source: "archive" as const,
    }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function getYoutubeFreeMovies(): Promise<FreeMovie[]> {
  return YOUTUBE_FREE_MOVIES;
}

export async function getArchiveDetails(identifier: string): Promise<ArchiveMovie | null> {
  try {
    const response = await fetch(
      `https://archive.org/metadata/${identifier}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Archive API Error");
    }

    const data: ArchiveMetadata = await response.json();
    const files = data.files || {};
    const videoFile = Object.values(files).find(
      (f) => f.format?.includes("MP4") || f.format?.includes("Video")
    );
    
    return {
      identifier,
      title: data.metadata?.title?.[0] || "",
      description: data.metadata?.description?.[0] || "",
      date: data.metadata?.date?.[0] || "",
      runtime: data.metadata?.runtime?.[0] || "",
      creator: data.metadata?.creator?.[0] || "",
      downloads: JSON.stringify(files),
      download1: videoFile?.url,
    };
  } catch {
    return null;
  }
}

export function getArchiveWatchUrl(identifier: string): string {
  return `https://archive.org/details/${identifier}`;
}

const FALLBACK_MOVIES: FreeMovie[] = [
  {
    id: "TheGreatTrainRobbery",
    title: "The Great Train Robbery",
    description: "A classic silent western from 1903",
    year: "1903",
    source: "archive",
  },
  {
    id: "Metropolis_1927",
    title: "Metropolis",
    description: "Fritz Lang's dystopian masterpiece",
    year: "1927",
    source: "archive",
  },
  {
    id: "Nosferatu_1922",
    title: "Nosferatu",
    description: "The iconic vampire film",
    year: "1922",
    source: "archive",
  },
];

const YOUTUBE_FREE_MOVIES: FreeMovie[] = [
  {
    id: "yt-1",
    title: "The Public Audience",
    description: "A dramatic feature film about the golden age of cinema",
    year: "1953",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-2",
    title: "Dark Shadows of Destiny",
    description: "A noir thriller from the golden age of filmmaking",
    year: "1948",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-3",
    title: "The Last Horizon",
    description: "An epic adventure across uncharted territories",
    year: "1962",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-4",
    title: "Murder at Midnight",
    description: "A classic mystery with a shocking twist",
    year: "1939",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-5",
    title: "The Romance of the Century",
    description: "A sweeping romantic drama set in Paris",
    year: "1955",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-6",
    title: "Frontier Justice",
    description: "An action-packed western adventure",
    year: "1951",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-7",
    title: "The Secret Garden",
    description: "A heartwarming family classic",
    year: "1949",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
  {
    id: "yt-8",
    title: "Space Odyssey 2050",
    description: "A sci-fi adventure into the far reaches of space",
    year: "1965",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    source: "youtube",
  },
];