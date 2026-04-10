const BASE_URL = "https://archive.org/advancedsearch.php";

export interface FreeMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube";
  duration?: string;
  genre?: string;
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
    q: "mediatype:movies AND (format:Vimeo MP4 OR format:MP4)",
    fl: "identifier,title,description,date,downloads",
    sort: "downloads desc",
    rows: "30",
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
      videoUrl: `https://archive.org/embed/${movie.identifier}`,
    }));
  } catch {
    return FALLBACK_MOVIES;
  }
}

export async function searchArchiveMovies(query: string, page: number = 1): Promise<FreeMovie[]> {
  const params = new URLSearchParams({
    q: `mediatype:movies AND (title:${query} OR description:${query})`,
    fl: "identifier,title,description,date,downloads",
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
      videoUrl: `https://archive.org/embed/${movie.identifier}`,
    }));
  } catch {
    return [];
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
    title: "Night of the Living Dead",
    description: "A classic horror film about a group of people trapped in a farm house while the dead rise",
    year: "1968",
    thumbnail: "https://img.youtube.com/vi/5D2pZGv4R84/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/5D2pZGv4R84",
    source: "youtube",
    genre: "horror",
    duration: "1h 35m",
  },
  {
    id: "yt-2",
    title: "Plan 9 from Outer Space",
    description: "Aliens attempt to conquer the Earth using humans as zombies in this sci-fi classic",
    year: "1959",
    thumbnail: "https://img.youtube.com/vi/2C6zJdHZ0g0/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2C6zJdHZ0g0",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 19m",
  },
  {
    id: "yt-3",
    title: "Reefer Madness",
    description: "A cautionary tale about the dangers of marijuana use",
    year: "1936",
    thumbnail: "https://img.youtube.com/vi/4Ky5HmuSG1Q/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/4Ky5HmuSG1Q",
    source: "youtube",
    genre: "drama",
    duration: "1h 11m",
  },
  {
    id: "yt-4",
    title: "The Little Shop of Horrors",
    description: "A botanical shop becomes the scene of a monster plant's feeding frenzy",
    year: "1960",
    thumbnail: "https://img.youtube.com/vi/nCeWDbXq4c0/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/nCeWDbXq4c0",
    source: "youtube",
    genre: "horror",
    duration: "1h 12m",
  },
  {
    id: "yt-5",
    title: "Bride of the Monster",
    description: "A mad scientist attempts to create a race of superhumans",
    year: "1955",
    thumbnail: "https://img.youtube.com/vi/wLGPdKBi0h0/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/wLGPdKBi0h0",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 9m",
  },
  {
    id: "yt-6",
    title: "Voodoo Man",
    description: "A deranged doctor uses voodoo to resurrect the dead",
    year: "1944",
    thumbnail: "https://img.youtube.com/vi/LlWE9R4vWGM/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/LlWE9R4vWGM",
    source: "youtube",
    genre: "horror",
    duration: "1h 7m",
  },
  {
    id: "yt-7",
    title: "The Terror from Beyond Space",
    description: "A space crew battles a bloodthirsty monster from Mars",
    year: "1958",
    thumbnail: "https://img.youtube.com/vi/6aR0cD9oT6I/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/6aR0cD9oT6I",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 10m",
  },
  {
    id: "yt-8",
    title: "The Giant Claw",
    description: "A giant bird from another dimension attacks the world",
    year: "1957",
    thumbnail: "https://img.youtube.com/vi/4tX3p8vB6h4/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/4tX3p8vB6h4",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 12m",
  },
  {
    id: "yt-9",
    title: "The Amazing Transparent Man",
    description: "A mad scientist creates an invisible man for evil purposes",
    year: "1960",
    thumbnail: "https://img.youtube.com/vi/J4qwT8F1tYk/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/J4qwT8F1tYk",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 12m",
  },
  {
    id: "yt-10",
    title: "Teenagers from Outer Space",
    description: "Alien teenagers land on Earth and must stop a war with a rival gang",
    year: "1959",
    thumbnail: "https://img.youtube.com/vi/W7V9RvZ0zZQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/W7V9RvZ0zZQ",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 17m",
  },
  {
    id: "yt-11",
    title: "The Screaming Skull",
    description: "A couple moves into a haunted house with a terrifying history",
    year: "1958",
    thumbnail: "https://img.youtube.com/vi/yK2rS0v4T8Q/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/yK2rS0v4T8Q",
    source: "youtube",
    genre: "horror",
    duration: "1h 8m",
  },
  {
    id: "yt-12",
    title: "The Brain from Planet Arous",
    description: "An alien brain takes over a scientist's body to conquer Earth",
    year: "1957",
    thumbnail: "https://img.youtube.com/vi/pL4mX6wW1tA/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/pL4mX6wW1tA",
    source: "youtube",
    genre: "sci-fi",
    duration: "1h 11m",
  },
];