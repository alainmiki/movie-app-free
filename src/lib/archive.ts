const BASE_URL = "https://archive.org/advancedsearch.php";

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

export async function getFreeMovies(page: number = 1): Promise<ArchiveMovie[]> {
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
      throw new Error("Archive API Error");
    }

    const data: ArchiveSearchResponse = await response.json();
    return data.response.docs;
  } catch {
    return FALLBACK_MOVIES;
  }
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

const FALLBACK_MOVIES: ArchiveMovie[] = [
  {
    identifier: "TheGreatTrainRobbery",
    title: "The Great Train Robbery",
    description: "A classic silent western from 1903",
    date: "1903",
    runtime: "12 min",
    creator: "Edwin S. Porter",
    downloads: "{}",
  },
  {
    identifier: "Metropolis_1927",
    title: "Metropolis",
    description: "Fritz Lang's dystopian masterpiece",
    date: "1927",
    runtime: "153 min",
    creator: "Fritz Lang",
    downloads: "{}",
  },
  {
    identifier: "Nosferatu_1922",
    title: "Nosferatu",
    description: "The iconic vampire film",
    date: "1922",
    runtime: "94 min",
    creator: "F.W. Murnau",
    downloads: "{}",
  },
];