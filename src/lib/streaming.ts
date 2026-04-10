const TUBI_API = "https://tubi.io/api/tubi/";

export interface StreamingMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube" | "pluto" | "tubi" | "public";
  duration?: string;
  genre?: string;
  downloadUrl?: string;
  rating?: string;
  type: "movie" | "tv";
}

const CURATED_MOVIES: StreamingMovie[] = [
  {
    id: "pluto-1",
    title: "Dog",
    description: "A army ranger is paired with a military dog and they go on a journey to find a family.",
    year: "2021",
    thumbnail: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/dog-2021-01-01/",
    source: "pluto",
    genre: "comedy",
    duration: "1h 42m",
    rating: "PG-13",
    type: "movie",
  },
  {
    id: "pluto-2",
    title: "The Witches",
    description: "A young boy stumbles upon a coven of witches and must stop them from turning children into mice.",
    year: "1990",
    thumbnail: "https://image.tmdb.org/t/p/w500/u6FsKaR0jCPQfjF6CZ0dPE8Uysj.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/the-witches-1990-01-01/",
    source: "pluto",
    genre: "family",
    duration: "1h 46m",
    rating: "PG",
    type: "movie",
  },
  {
    id: "pluto-3",
    title: "Mortal Kombat",
    description: "A group of fighters must defeat an evil organization to save the world.",
    year: "2021",
    thumbnail: "https://image.tmdb.org/t/p/w500/pKQ0EixPXVN5mHnVKHFHDqVewsX.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/mortal-kombat-2021-01-01/",
    source: "pluto",
    genre: "action",
    duration: "1h 50m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-4",
    title: "The Last Samurai",
    description: "A veteran soldier embraces the way of the samurai after being captured in Japan.",
    year: "2003",
    thumbnail: "https://image.tmdb.org/t/p/w500/1M8UvYhI96qbc7qTCQs0pY7T7bJ.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/the-last-samurai-2003-01-01/",
    source: "pluto",
    genre: "action",
    duration: "2h 34m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-5",
    title: "Titanic",
    description: "A young couple fall in love aboard the ill-fated Titanic ship.",
    year: "1997",
    thumbnail: "https://image.tmdb.org/t/p/w500/9xk2FRJO2qDvT3Xh8hBTl2d8j1i.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/titanic-1997-01-01/",
    source: "pluto",
    genre: "drama",
    duration: "3h 14m",
    rating: "PG-13",
    type: "movie",
  },
  {
    id: "pluto-6",
    title: "The Matrix",
    description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    year: "1999",
    thumbnail: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/the-matrix-1999-01-01/",
    source: "pluto",
    genre: "sci-fi",
    duration: "2h 16m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-7",
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    year: "2010",
    thumbnail: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/inception-2010-01-01/",
    source: "pluto",
    genre: "sci-fi",
    duration: "2h 28m",
    rating: "PG-13",
    type: "movie",
  },
  {
    id: "pluto-8",
    title: "John Wick",
    description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog.",
    year: "2014",
    thumbnail: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/john-wick-2014-01-01/",
    source: "pluto",
    genre: "action",
    duration: "1h 41m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-9",
    title: "Mad Max: Fury Road",
    description: "A woman rebels against a tyrannical ruler in a post-apocalyptic wasteland.",
    year: "2015",
    thumbnail: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/mad-max-fury-road-2015-01-01/",
    source: "pluto",
    genre: "action",
    duration: "2h",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-10",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    year: "1972",
    thumbnail: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/the-godfather-1972-01-01/",
    source: "pluto",
    genre: "drama",
    duration: "2h 55m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-11",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: "1994",
    thumbnail: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/pulp-fiction-1994-01-01/",
    source: "pluto",
    genre: "crime",
    duration: "2h 34m",
    rating: "R",
    type: "movie",
  },
  {
    id: "pluto-12",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    year: "2014",
    thumbnail: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    videoUrl: "https://pluto.tv/on-demand/films/interstellar-2014-01-01/",
    source: "pluto",
    genre: "sci-fi",
    duration: "2h 49m",
    rating: "PG-13",
    type: "movie",
  },
];

const TUBI_MOVIES: StreamingMovie[] = [
  {
    id: "tubi-1",
    title: "Lilo & Stitch",
    description: "A young girl adopts an alien as her pet and together they learn about family and friendship.",
    year: "2002",
    thumbnail: "https://image.tmdb.org/t/p/w500/b0plSFd0kBh1mG2RQA51b4JOrTz.jpg",
    videoUrl: "https://tubi.tv/film/120468-lilo-stitch",
    source: "tubi",
    genre: "animation",
    duration: "1h 25m",
    rating: "PG",
    type: "movie",
  },
  {
    id: "tubi-2",
    title: "Mortal Kombat: Legacy",
    description: "A web series exploring the origins of the iconic MK characters.",
    year: "2012",
    thumbnail: "https://image.tmdb.org/t/p/w500/kq4VB6jT5hTZNXPB6mBTEL6SvG.jpg",
    videoUrl: "https://tubi.tv/series/mortal-kombat-legacy",
    source: "tubi",
    genre: "action",
    duration: "15m",
    rating: "TV-14",
    type: "tv",
  },
  {
    id: "tubi-3",
    title: "Aliens vs Predator: Requiem",
    description: "Predators and Aliens clash in a small town with deadly consequences.",
    year: "2007",
    thumbnail: "https://image.tmdb.org/t/p/w500/4oWOuujaZBy8FHkO3dUUStLJKrf.jpg",
    videoUrl: "https://tubi.tv/film/121153-aliens-vs-predator-requiem",
    source: "tubi",
    genre: "sci-fi",
    duration: "1h 34m",
    rating: "PG-13",
    type: "movie",
  },
  {
    id: "tubi-4",
    title: "The Texas Chainsaw Massacre",
    description: "A group of friends encounter a family of cannibals in rural Texas.",
    year: "2003",
    thumbnail: "https://image.tmdb.org/t/p/w500/hS4UJ1MmmuVI8n3h1oeh1fW3k1K.jpg",
    videoUrl: "https://tubi.tv/film/100588-the-texas-chainsaw-massacre-2003",
    source: "tubi",
    genre: "horror",
    duration: "1h 38m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-5",
    title: "Night of the Living Dead",
    description: "A group of survivors must barricade themselves against the undead.",
    year: "1968",
    thumbnail: "https://image.tmdb.org/t/p/w500/rjB4R3K54tJoPhHyKZZLK1ZGBrS.jpg",
    videoUrl: "https://tubi.tv/film/111417-night-of-the-living-dead",
    source: "tubi",
    genre: "horror",
    duration: "1h 35m",
    rating: "NR",
    type: "movie",
  },
  {
    id: "tubi-6",
    title: "The Cabin in the Woods",
    description: "A group of friends discover the horrifying truth behind their remote cabin getaway.",
    year: "2012",
    thumbnail: "https://image.tmdb.org/t/p/w500/rI8qU0QkVmh8kIsL9Y4W2t3vqTH.jpg",
    videoUrl: "https://tubi.tv/film/77345-the-cabin-in-the-woods",
    source: "tubi",
    genre: "horror",
    duration: "1h 35m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-7",
    title: "RoboCop",
    description: "A dead police officer is brought back to life as a powerful cyborg to fight crime.",
    year: "1987",
    thumbnail: "https://image.tmdb.org/t/p/w500/4L0kB0L9XTqE6V16M5c0oR3p6vT.jpg",
    videoUrl: "https://tubi.tv/film/77410-robocop-1987",
    source: "tubi",
    genre: "sci-fi",
    duration: "1h 43m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-8",
    title: "Predator",
    description: "A team of commandos battle a deadly alien hunter in the jungles of Central America.",
    year: "1987",
    thumbnail: "https://image.tmdb.org/t/p/w500/y4mV9CkobI5Vw3L8jVpe3CkbdV4.jpg",
    videoUrl: "https://tubi.tv/film/77406-predator-1987",
    source: "tubi",
    genre: "sci-fi",
    duration: "1h 47m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-9",
    title: "Tremors",
    description: "A small town becomes the hunting ground for giant subterranean worms.",
    year: "1990",
    thumbnail: "https://image.tmdb.org/t/p/w500/c6E4k4NP5EXn2X6C4jKA1L3NBM2.jpg",
    videoUrl: "https://tubi.tv/film/76857-tremors-1990",
    source: "tubi",
    genre: "comedy",
    duration: "1h 36m",
    rating: "PG-13",
    type: "movie",
  },
  {
    id: "tubi-10",
    title: "The Thing",
    description: "Researchers in Antarctica discover an alien organism that mimics other beings.",
    year: "1982",
    thumbnail: "https://image.tmdb.org/t/p/w500/tzGY49DseSE9QAKk47uuDGwnSCu.jpg",
    videoUrl: "https://tubi.tv/film/77294-the-thing-1982",
    source: "tubi",
    genre: "horror",
    duration: "1h 49m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-11",
    title: "The Conjuring",
    description: "Paranormal investigators help a family terrorized by a dark presence in their farmhouse.",
    year: "2013",
    thumbnail: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHTP1eF5.jpg",
    videoUrl: "https://tubi.tv/film/76496-the-conjuring-2013",
    source: "tubi",
    genre: "horror",
    duration: "1h 52m",
    rating: "R",
    type: "movie",
  },
  {
    id: "tubi-12",
    title: "Mad Max",
    description: "A vengeful policeman in a dystopian future pursues the biker who killed his family.",
    year: "1979",
    thumbnail: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    videoUrl: "https://tubi.tv/film/77399-mad-max-1979",
    source: "tubi",
    genre: "action",
    duration: "1h 28m",
    rating: "R",
    type: "movie",
  },
];

export async function getPlutoMovies(): Promise<StreamingMovie[]> {
  return CURATED_MOVIES;
}

export async function getTubiMovies(): Promise<StreamingMovie[]> {
  return TUBI_MOVIES;
}

export async function searchPlutoMovies(query: string): Promise<StreamingMovie[]> {
  const q = query.toLowerCase();
  return CURATED_MOVIES.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q)
  );
}

export async function searchTubiMovies(query: string): Promise<StreamingMovie[]> {
  const q = query.toLowerCase();
  return TUBI_MOVIES.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q)
  );
}

export function getSourceName(source: string): string {
  const names: Record<string, string> = {
    archive: "Internet Archive",
    youtube: "YouTube",
    pluto: "Pluto TV",
    tubi: "Tubi",
    public: "Public Domain",
  };
  return names[source] || source;
}

export function getSourceColor(source: string): string {
  const colors: Record<string, string> = {
    archive: "bg-[#ff6b6b]",
    youtube: "bg-red-600",
    pluto: "bg-indigo-600",
    tubi: "bg-green-600",
    public: "bg-orange-600",
  };
  return colors[source] || "bg-gray-600";
}