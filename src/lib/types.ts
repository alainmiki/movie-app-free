export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  media_type?: "movie" | "tv";
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  media_type?: "movie" | "tv";
}

export interface TVShowDetails extends TVShow {
  runtime: number | null;
  genres: { id: number; name: string }[];
  episode_run_time: number[];
  status: string;
  tagline: string | null;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: {
    season_number: number;
    name: string;
    overview: string;
    poster_path: string | null;
    episode_count: number;
    air_date: string;
  }[];
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: { id: number; name: string }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface Credits {
  id: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }[];
}

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVShowsResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface WatchProviders {
  id: number;
  results: {
    [country: string]: {
      link: string;
      flatrate?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
      rent?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
        buy?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
      }[];
      buy?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
    };
  };
}

export interface MovieVideos {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: "Trailer" | "Teaser" | "Clip" | "Behind the Scenes" | "Featurette";
    official: boolean;
  }[];
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const POSTER_SIZES = {
  small: "w185",
  medium: "w342",
  large: "w500",
  original: "original",
};
export const BACKDROP_SIZES = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original",
};

export function getPosterUrl(path: string | null, size: keyof typeof POSTER_SIZES = "medium"): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${POSTER_SIZES[size]}${path}`;
}

export function getBackdropUrl(path: string | null, size: keyof typeof BACKDROP_SIZES = "large"): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${BACKDROP_SIZES[size]}${path}`;
}

export function getYear(dateString: string): string {
  if (!dateString) return "";
  return dateString.split("-")[0];
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
