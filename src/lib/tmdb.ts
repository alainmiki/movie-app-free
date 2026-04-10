import { Movie, MovieDetails, Credits, MoviesResponse, SearchResponse } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Sample Movie",
    poster_path: null,
    backdrop_path: null,
    overview: "This is a sample movie description for build purposes.",
    release_date: "2024-01-01",
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [28, 12, 878],
    adult: false,
    original_language: "en",
    original_title: "Sample Movie",
    popularity: 100,
  },
];

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error("TMDB API Error: 401");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }

  return response.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const data = await fetchTMDB<MoviesResponse>("/trending/movie/week", { language: "en-US" });
    return data.results;
  } catch {
    return MOCK_MOVIES;
  }
}

export async function getPopularMovies(page: number = 1): Promise<MoviesResponse> {
  try {
    return await fetchTMDB<MoviesResponse>("/movie/popular", {
      language: "en-US",
      page: page.toString(),
    });
  } catch {
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: 1,
    };
  }
}

export async function getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
  try {
    return await fetchTMDB<MoviesResponse>("/movie/top_rated", {
      language: "en-US",
      page: page.toString(),
    });
  } catch {
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: 1,
    };
  }
}

export async function getNowPlayingMovies(): Promise<MoviesResponse> {
  try {
    return await fetchTMDB<MoviesResponse>("/movie/now_playing", {
      language: "en-US",
    });
  } catch {
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: 1,
    };
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  try {
    return await fetchTMDB<MovieDetails>(`/movie/${id}`, { language: "en-US" });
  } catch {
    return {
      ...MOCK_MOVIES[0],
      runtime: 120,
      genres: [{ id: 28, name: "Action" }],
      budget: 100000000,
      revenue: 300000000,
      status: "Released",
      tagline: "Sample tagline",
      homepage: null,
      production_companies: [],
    };
  }
}

export async function getMovieCredits(id: string): Promise<Credits> {
  try {
    return await fetchTMDB<Credits>(`/movie/${id}/credits`, { language: "en-US" });
  } catch {
    return {
      id: parseInt(id),
      cast: [
        { id: 1, name: "Actor One", character: "Hero", profile_path: null, order: 0 },
        { id: 2, name: "Actor Two", character: "Villain", profile_path: null, order: 1 },
      ],
      crew: [
        { id: 3, name: "Director Name", job: "Director", department: "Directing", profile_path: null },
      ],
    };
  }
}

export async function getSimilarMovies(id: string): Promise<MoviesResponse> {
  try {
    return await fetchTMDB<MoviesResponse>(`/movie/${id}/similar`, { language: "en-US" });
  } catch {
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: 1,
    };
  }
}

export async function searchMovies(query: string, page: number = 1): Promise<SearchResponse> {
  try {
    return await fetchTMDB<SearchResponse>("/search/movie", {
      language: "en-US",
      query,
      page: page.toString(),
    });
  } catch {
    return {
      page: 1,
      results: query ? MOCK_MOVIES : [],
      total_pages: 1,
      total_results: query ? 1 : 0,
    };
  }
}