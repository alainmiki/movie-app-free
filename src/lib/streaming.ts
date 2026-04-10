import { Movie } from "@/lib/types";

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

const TMDB_IMG = "https://image.tmdb.org/t/p";

const plutoMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "Dog", "The Witches", "Mortal Kombat", "The Last Samurai", "Titanic", "The Matrix", 
    "Inception", "John Wick", "Mad Max: Fury Road", "The Godfather", "Pulp Fiction", 
    "Interstellar", "The Dark Knight", "Avatar", "Avengers: Endgame", "Frozen", 
    "Joker", "Spider-Man: No Way Home", "Black Panther", "Thor: Ragnarok",
    "Guardians of the Galaxy", "Iron Man", "Captain America", "Wonder Woman",
    "Aquaman", "Batman", "Suicide Squad", "Justice League", "X-Men",
    "Deadpool", "Logan", "Dune", "The Shawshank Redemption", "Forrest Gump",
    "The Silence of the Lambs", "Schindler's List", "Fight Club", "The Matrix Reloaded",
    "Terminator 2", "Jurassic Park", "Star Wars", "Harry Potter", "Lord of the Rings",
    "The Hobbit", "Pirates of the Caribbean", "Fast & Furious", "Mission Impossible",
    "James Bond", "Bourne Identity", "Die Hard", "Lethal Weapon", "Rocky",
    "Creed", "Rambo", "Expendables", "Transformers", "G.I. Joe",
    "Kung Fu Panda", "Shrek", "Toy Story", "Finding Nemo", "The Lion King",
    "Moana", "Coco", "Soul", "Onward", "Turning Red",
    "Encanto", "Raya", "Luca", "Elemental", "Wish",
    "The Flash", "Shazam", "Blue Beetle", "Ant-Man", "Doctor Strange",
    "Captain Marvel", "Black Widow", "Eternals", "Guardians Vol 3", "Loki",
    "WandaVision", "Falcon", "Winter Soldier", "Hawkeye", "Moon Knight",
    "The Conjuring", "Annabelle", "Insidious", "The Purge", "Get Out",
    "Us", "The Invisible Man", "A Quiet Place", "Smile", "M3GAN",
    "The Black Phone", "Barbarian", "Pearl", "X", "Megan",
    "Fall", "The Menu", "Bodies Bodies Bodies", "Glass Onion",
    "Knives Out", "Murder Mystery", "The Lost City", "Jungle Cruise", "Red Notice",
    "Free Guy", "The Adam Project", "Spider-Man: Across", "Spider-Man: Into the Spider-Verse",
    "The Batman", "The Suicide Squad", "Godzilla vs Kong", "Kong: Skull Island"
  ];
  const tmdbIds = [27205, 157336, 299536, 299534, 362058, 27233, 24428, 12477, 122917, 49026, 324857, 363088, 335984, 244786, 102899, 12445, 324552, 363098, 335984, 363099];
  const genres = ["action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "thriller", "crime", "romance"];
  const year = 2000 + Math.floor(Math.random() * 25);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const tmdbId = tmdbIds[i % tmdbIds.length] || 400;
  
  return {
    id: `pluto-${i + 1}`,
    title: titles[i % titles.length] || `Movie ${i + 1}`,
    description: `Watch ${titles[i % titles.length] || `Movie ${i + 1}`} free on Pluto TV. An exciting adventure awaits with stunning visuals and captivating storytelling.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${tmdbId * 1000 + i}`,
    videoUrl: `https://pluto.tv/on-demand/film/${1000 + i}/`,
    source: "pluto",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR"][Math.floor(Math.random() * 4)],
    type: "movie",
  };
});

const tubiMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "Lilo & Stitch", "Aliens vs Predator", "The Texas Chainsaw Massacre", "Night of the Living Dead",
    "The Cabin in the Woods", "RoboCop", "Predator", "Tremors", "The Thing", "The Conjuring",
    "Mad Max", "Hellraiser", "Evil Dead", "Halloween", "A Nightmare on Elm Street",
    "Friday the 13th", "Child's Play", "Annabelle", "Insidious", "The Purge",
    "Get Out", "Us", "The Invisible Man", "A Quiet Place", "Smile",
    "M3GAN", "The Black Phone", "Barbarian", "Pearl", "X",
    "Megan", "Fall", "The Menu", "Bodies Bodies Bodies", "Glass Onion",
    "Knives Out", "Murder Mystery", "The Lost City", "Jungle Cruise", "Red Notice",
    "Free Guy", "The Adam Project", "Doctor Strange 2", "Multiverse of Madness",
    "Spider-Man: Across", "Spider-Man: Into the Spider-Verse", "Into the Spider-Verse",
    "The Batman", "The Suicide Squad", "Zack Snyder's Justice League",
    "Godzilla vs Kong", "Kong: Skull Island", "Godzilla: King of the Monsters",
    "The Chronicles of Narnia", "Percy Jackson", "Eragon", "How to Train Your Dragon",
    "Kung Fu Panda 2", "Kung Fu Panda 3", "Madagascar", "Madagascar 2",
    "Ice Age", "Ice Age 2", "Ice Age 3", "Ice Age 4", "Ice Age 5",
    "Despicable Me", "Despicable Me 2", "Despicable Me 3", "Minions",
    "Sing", "Sing 2", "The Secret Life of Pets", "The Secret Life of Pets 2"
  ];
  const genres = ["action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "thriller", "crime"];
  const year = 1990 + Math.floor(Math.random() * 35);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  
  return {
    id: `tubi-${i + 1}`,
    title: titles[i % titles.length] || `Movie ${i + 1}`,
    description: `Stream ${titles[i % titles.length] || `Movie ${i + 1}`} free on Tubi. Premium entertainment without the subscription.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${500000000000000000 + i}`,
    videoUrl: `https://tubi.tv/film/${100000 + i}/`,
    source: "tubi",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR", "TV-14"][Math.floor(Math.random() * 5)],
    type: "movie",
  };
});

const archiveMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "The Great Train Robbery", "Metropolis", "Nosferatu", "The Cabinet of Dr. Caligari",
    "The Phantom of the Opera", "Battleship Potemkin", "The General", "Safety Last!",
    "The Kid", "The Gold Rush", "The Hunchback of Notre Dame", "The Thief of Bagdad",
    "Modern Times", "City Lights", "The Circus", "The Immigrant", "The Tramp",
    "Sunrise", "The Crowd", "Strike", "October", "Earth", "Battleship Potemkin",
    "The Last Laugh", "The Last Emperor", "Napoleon", "Intolerance", "The Birth of a Nation",
    "The Crowd", "The Lost World", "The Most Dangerous Game", "King Kong", "Mighty Joe Young",
    "The Wolf Man", "Frankenstein", "Bride of Frankenstein", "The Mummy", "The Invisible Man",
    "Dracula", "The Creature from the Black Lagoon", "The Fly", "The Thing from Another World",
    "The Day the Earth Stood Still", "Forbidden Planet", "The War of the Worlds", "Invasion of the Body Snatchers",
    "The Time Machine", "The Andromeda Strain", "Soylent Green", "Logan's Run", "Silent Running",
    "Zardoz", "The Omega Man", "THX 1138", "A Boy and His Dog", "The Last Starfighter",
    "Tron", "The Last Dragon", "Big Trouble in Little China", "The Goonies", "The Lost Boys",
    "Near Dark", "Near Dark", "Near Dark", "Fright Night", "Lost Highway",
    "Mulholland Drive", "Blue Velvet", "Inland Empire", "Donnie Darko", "Memento"
  ];
  const genres = ["drama", "horror", "sci-fi", "comedy", "action", "documentary"];
  const year = 1900 + Math.floor(Math.random() * 80);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  
  return {
    id: `archive-${i + 1}`,
    title: titles[i % titles.length] || `Classic ${i + 1}`,
    description: `A classic public domain film from the Internet Archive collection. ${titles[i % titles.length] || "A timeless masterpiece."}`,
    year: year.toString(),
    thumbnail: `https://archive.org/services/img/movie_${i}`,
    videoUrl: `https://archive.org/embed/movie_${i}`,
    downloadUrl: `https://archive.org/download/movie_${i}/movie_${i}_512kb.mp4`,
    source: "archive",
    genre,
    duration,
    rating: "NR",
    type: "movie",
  };
});

const youtubeMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "Night of the Living Dead", "Plan 9 from Outer Space", "Reefer Madness",
    "The Little Shop of Horrors", "Bride of the Monster", "Voodoo Man",
    "The Terror from Beyond Space", "The Giant Claw", "The Amazing Transparent Man",
    "Teenagers from Outer Space", "The Screaming Skull", "The Brain from Planet Arous",
    "Giant from the Unknown", "The Brain from Planet Arous", "The Man Who Fell to Earth",
    "The Last Man on Earth", "The Omega Man", "Night of the Comet", "The Last Starfighter",
    "Space Raiders", "The Last Shark", "Megalodon", "Sharknado", "Sharknado 2",
    "Sharknado 3", "Sharknado 4", "Sharknado 5", "Sharknado 6", "American Ninja",
    "American Ninja 2", "American Ninja 3", "American Ninja 4", "Bloodsport",
    "Kickboxer", "Double Dragon", "Street Fighter", "Mortal Kombat",
    "The Quest", "The Double Zero", "Force: Five", "The Mystics", "American Anthem"
  ];
  const genres = ["action", "sci-fi", "horror", "comedy", "drama", "thriller"];
  const year = 1950 + Math.floor(Math.random() * 75);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  
  return {
    id: `youtube-${i + 1}`,
    title: titles[i % titles.length] || `Film ${i + 1}`,
    description: `Watch ${titles[i % titles.length] || `Film ${i + 1}`} on YouTube. Free public domain movie.`,
    year: year.toString(),
    thumbnail: `https://img.youtube.com/vi/placeholder${i}/mqdefault.jpg`,
    videoUrl: `https://www.youtube.com/embed/placeholder${i}`,
    source: "youtube",
    genre,
    duration,
    rating: "NR",
    type: "movie",
  };
});

export async function getPlutoMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: plutoMovies.slice(start, end),
    total: plutoMovies.length,
  };
}

export async function getTubiMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: tubiMovies.slice(start, end),
    total: tubiMovies.length,
  };
}

export async function getArchiveMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: archiveMovies.slice(start, end),
    total: archiveMovies.length,
  };
}

export async function getYoutubeMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: youtubeMovies.slice(start, end),
    total: youtubeMovies.length,
  };
}

export async function searchMovies(query: string, source?: string, page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const q = query.toLowerCase();
  let allMovies = [...plutoMovies, ...tubiMovies, ...archiveMovies, ...youtubeMovies];
  
  if (source && source !== "all") {
    allMovies = allMovies.filter(m => m.source === source);
  }
  
  const filtered = allMovies.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q) ||
    m.genre?.toLowerCase().includes(q)
  );
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    movies: filtered.slice(start, end),
    total: filtered.length,
  };
}

export async function getMoviesByGenre(genre: string, source?: string, page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  let allMovies = [...plutoMovies, ...tubiMovies, ...archiveMovies, ...youtubeMovies];
  
  if (source && source !== "all") {
    allMovies = allMovies.filter(m => m.source === source);
  }
  
  const filtered = genre !== "all" ? allMovies.filter(m => m.genre === genre) : allMovies;
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    movies: filtered.slice(start, end),
    total: filtered.length,
  };
}

export function getSourceName(source: string): string {
  const names: Record<string, string> = {
    archive: "Internet Archive",
    youtube: "YouTube",
    pluto: "Pluto TV",
    tubi: "Tubi",
    public: "Public Domain",
    all: "All Sources",
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