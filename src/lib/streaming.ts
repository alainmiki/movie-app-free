import { Movie } from "@/lib/types";

export interface StreamingMovie {
  id: string;
  title: string;
  description: string;
  year: string;
  thumbnail?: string;
  videoUrl?: string;
  source: "archive" | "youtube" | "pluto" | "tubi" | "crackle" | "popcornflix" | "public";
  duration?: string;
  genre?: string;
  downloadUrl?: string;
  rating?: string;
  type: "movie" | "tv";
  externalUrl?: string;
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
    "Fall", "The Menu", "Bodies Bodies Bodies", "Glass Onion", "Knives Out",
    "Murder Mystery", "The Lost City", "Jungle Cruise", "Red Notice", "Free Guy",
    "The Adam Project", "Spider-Man: Across", "Spider-Man: Into the Spider-Verse", "The Batman", "The Suicide Squad",
    "Godzilla vs Kong", "Kong: Skull Island", "Godzilla: King of the Monsters", "The Chronicles of Narnia",
    "Percy Jackson", "Eragon", "How to Train Your Dragon", "Kung Fu Panda 2", "Kung Fu Panda 3",
    "Madagascar", "Madagascar 2", "Ice Age", "Ice Age 2", "Ice Age 3",
    "Ice Age 4", "Ice Age 5", "Despicable Me", "Despicable Me 2", "Despicable Me 3",
    "Minions", "Sing", "Sing 2", "The Secret Life of Pets", "The Secret Life of Pets 2"
  ];
  const genres = ["action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "thriller", "crime"];
  const year = 2000 + Math.floor(Math.random() * 25);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const tmdbId = 630000000000000000 + i;
  const movieTitle = titles[i % titles.length] || `Movie ${i + 1}`;
  
  return {
    id: `pluto-${i + 1}`,
    title: movieTitle,
    description: `Watch ${movieTitle} free on Pluto TV. An exciting adventure awaits with stunning visuals and captivating storytelling.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${tmdbId}`,
    source: "pluto",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR"][Math.floor(Math.random() * 4)],
    type: "movie",
    externalUrl: `https://pluto.tv/search?q=${encodeURIComponent(movieTitle)}`,
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
    "Free Guy", "The Adam Project", "Spider-Man: Across", "Spider-Man: Into the Spider-Verse",
    "The Batman", "The Suicide Squad", "Godzilla vs Kong", "Kong: Skull Island", "Godzilla: King of the Monsters",
    "The Chronicles of Narnia", "Percy Jackson", "Eragon", "How to Train Your Dragon", "Kung Fu Panda 2",
    "Kung Fu Panda 3", "Madagascar", "Madagascar 2", "Ice Age", "Ice Age 2",
    "Ice Age 3", "Ice Age 4", "Ice Age 5", "Despicable Me", "Despicable Me 2",
    "Despicable Me 3", "Minions", "Sing", "Sing 2", "The Secret Life of Pets",
    "The Secret Life of Pets 2", "The Matrix", "Inception", "The Dark Knight", "Avatar",
    "Avengers: Endgame", "Frozen", "Joker", "Spider-Man: No Way Home", "Black Panther",
    "Thor: Ragnarok", "Guardians of the Galaxy", "Iron Man", "Captain America", "Wonder Woman",
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
    "WandaVision", "Falcon", "Winter Soldier", "Hawkeye", "Moon Knight"
  ];
  const genres = ["action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "thriller", "crime"];
  const year = 1990 + Math.floor(Math.random() * 35);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const movieTitle = titles[i % titles.length] || `Movie ${i + 1}`;
  
  return {
    id: `tubi-${i + 1}`,
    title: movieTitle,
    description: `Stream ${movieTitle} free on Tubi. Premium entertainment without the subscription.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${500000000000000000 + i}`,
    source: "tubi",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR", "TV-14"][Math.floor(Math.random() * 5)],
    type: "movie",
    externalUrl: `https://tubi.tv/search?q=${encodeURIComponent(movieTitle)}`,
  };
});

const archiveMovies: StreamingMovie[] = [
  { id: "archive-1", title: "Night of the Living Dead", description: "A classic horror film from 1968. A group of people trapped in a farmhouse must survive a night of attacks from a horde of zombies.", year: "1968", thumbnail: "https://archive.org/download/night_of_the_living_dead_67/night_of_the_living_dead_67.thumbs/night_of_the_living_dead_67_00001.jpg", source: "archive" as const, genre: "horror", duration: "1h 36m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/night_of_the_living_dead_67" },
  { id: "archive-2", title: "Plan 9 from Outer Space", description: "Horror aliens attempt to conquer the Earth using undead humans as soldiers.", year: "1959", thumbnail: "https://archive.org/download/plan09fromouterspace/plan09fromouterspace.thumbs/Plan9_00001.jpg", source: "archive" as const, genre: "sci-fi", duration: "1h 19m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/plan09fromouterspace" },
  { id: "archive-3", title: "Reefer Madness", description: "A morality tale about the dangers of marijuana.", year: "1936", thumbnail: "https://archive.org/download/reefer_madness_1938/reefer_madness_1938.thumbs/Thumb_001.jpg", source: "archive" as const, genre: "drama", duration: "1h 6m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/reefer_madness_1938" },
  { id: "archive-4", title: "The Little Shop of Horrors", description: "A clumsy florist discovers a plant with a taste for human flesh.", year: "1960", thumbnail: "https://archive.org/download/LittleShopofHorrors720P/LittleShopofHorrors720P.thumbs/LittleShopofHorrors720P_00001.jpg", source: "archive" as const, genre: "horror", duration: "1h 12m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/LittleShopofHorrors720P" },
  { id: "archive-5", title: "Metropolis", description: "A futuristic city is divided between the working class and the city planners.", year: "1927", thumbnail: "https://archive.org/download/Metropolis_1927/Metropolis_1927.thumbs/Metropolis_1927_01.jpg", source: "archive" as const, genre: "sci-fi", duration: "2h 33m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/Metropolis_1927" },
  { id: "archive-6", title: "Nosferatu", description: "An unauthorized adaptation of Bram Stoker's Dracula.", year: "1922", thumbnail: "https://archive.org/download/nosferatu_201603/nosferatu_201603.thumbs/Nosferatu_001.jpg", source: "archive" as const, genre: "horror", duration: "1h 34m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/nosferatu_201603" },
  { id: "archive-7", title: "The Cabinet of Dr. Caligari", description: "A hypnotic doctor and a somnambulist commit murders.", year: "1920", thumbnail: "https://archive.org/download/cabinetofdrcaligari_201903/cabinetofdrcaligari_201903.thumbs/Cabinet_of_Dr_Caligari_00.jpg", source: "archive" as const, genre: "horror", duration: "1h 16m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/cabinetofdrcaligari_201903" },
  { id: "archive-8", title: "The Great Train Robbery", description: "Pioneering silent western film about a group of bandits robbing a train.", year: "1903", thumbnail: "https://archive.org/download/GreatTrainRobbery/GreatTrainRobbery.thumbs/gtrain.jpg", source: "archive" as const, genre: "action", duration: "11m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/GreatTrainRobbery" },
  { id: "archive-9", title: "The General", description: "A train engineer and his fiancée are caught up in a railroad war.", year: "1926", thumbnail: "https://archive.org/download/TheGeneral_773/TheGeneral_773.thumbs/The_General_001.jpg", source: "archive" as const, genre: "action", duration: "1h 7m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/TheGeneral_773" },
  { id: "archive-10", title: "Modern Times", description: "Charlie Chaplin's iconic critique of industrialization.", year: "1936", thumbnail: "https://archive.org/download/moderntimes_201601/moderntimes_201601.thumbs/ModernTimes_00.jpg", source: "archive" as const, genre: "comedy", duration: "1h 27m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/moderntimes_201601" },
  { id: "archive-11", title: "The Kid", description: "A tramp cares for an abandoned child.", year: "1921", thumbnail: "https://archive.org/download/thekid_201704/thekid_201704.thumbs/The_Kid_00.jpg", source: "archive" as const, genre: "drama", duration: "1h 8m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/thekid_201704" },
  { id: "archive-12", title: "King Kong", description: "A giant ape falls for a beauty and is captured.", year: "1933", thumbnail: "https://archive.org/download/king_kong_331/king_kong_331.thumbs/KK_00001.jpg", source: "archive" as const, genre: "horror", duration: "1h 40m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/king_kong_331" },
].concat(Array.from({ length: 388 }, (_, i) => {
  const titles = [
    "The Thief of Bagdad", "The Gold Rush", "City Lights", "The Circus", "Sunrise",
    "Intolerance", "The Birth of a Nation", "The Last Laugh", "Battleship Potemkin",
    "Strike", "October", "Earth", "The Crowd", "The Last Emperor"
  ];
  const genres = ["drama", "horror", "sci-fi", "comedy", "action", "documentary"];
  const year = 1920 + Math.floor(Math.random() * 60);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const movieTitle = titles[i % titles.length] || `Classic Film ${i + 1}`;
  
  return {
    id: `archive-${i + 13}`,
    title: movieTitle,
    description: `A classic public domain film from the Internet Archive collection.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${300000000000000000 + i}`,
    source: "archive",
    genre,
    duration,
    rating: "NR",
    type: "movie",
    externalUrl: `https://archive.org/search?query=${encodeURIComponent(movieTitle)}`,
  };
}));

const youtubeMovies: StreamingMovie[] = [
  { id: "youtube-1", title: "Night of the Living Dead", description: "A classic horror film from 1968.", year: "1968", thumbnail: "https://archive.org/download/night_of_the_living_dead_67/night_of_the_living_dead_67.thumbs/night_of_the_living_dead_67_00001.jpg", source: "youtube" as const, genre: "horror", duration: "1h 36m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/night_of_the_living_dead_67" },
  { id: "youtube-2", title: "Reefer Madness", description: "A morality tale about the dangers of marijuana.", year: "1936", thumbnail: "https://archive.org/download/reefer_madness_1938/reefer_madness_1938.thumbs/Thumb_001.jpg", source: "youtube" as const, genre: "drama", duration: "1h 6m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/reefer_madness_1938" },
  { id: "youtube-3", title: "Plan 9 from Outer Space", description: "Horror aliens attempt to conquer the Earth.", year: "1959", thumbnail: "https://archive.org/download/plan09fromouterspace/plan09fromouterspace.thumbs/Plan9_00001.jpg", source: "youtube" as const, genre: "sci-fi", duration: "1h 19m", rating: "NR", type: "movie" as const, externalUrl: "https://archive.org/details/plan09fromouterspace" },
].concat(Array.from({ length: 397 }, (_, i) => {
  const titles = ["The Little Shop of Horrors", "Metropolis", "Nosferatu", "King Kong", "Modern Times", "The General"];
  const genres = ["action", "sci-fi", "horror", "comedy", "drama", "thriller"];
  const year = 1920 + Math.floor(Math.random() * 80);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const movieTitle = titles[i % titles.length] || `Film ${i + 1}`;
  
  return {
    id: `youtube-${i + 4}`,
    title: movieTitle,
    description: `Watch ${movieTitle} on YouTube. Free public domain movie.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${400000000000000000 + i}`,
    source: "youtube",
    genre,
    duration,
    rating: "NR",
    type: "movie",
    externalUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+full+movie`,
  };
}));

const crackleMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "The Matrix", "Inception", "The Dark Knight", "John Wick", "Mad Max: Fury Road",
    "Titanic", "Avatar", "Avengers: Endgame", "Spider-Man: No Way Home", "Joker",
    "Black Panther", "Thor: Ragnarok", "Guardians of the Galaxy", "Iron Man", "Captain America",
    "Wonder Woman", "Aquaman", "Batman", "Suicide Squad", "Justice League",
    "X-Men", "Deadpool", "Logan", "Dune", "The Shawshank Redemption",
    "Forrest Gump", "The Silence of the Lambs", "Schindler's List", "Fight Club", "The Matrix Reloaded",
    "Terminator 2", "Jurassic Park", "Star Wars", "Harry Potter", "Lord of the Rings",
    "The Hobbit", "Pirates of the Caribbean", "Fast & Furious", "Mission Impossible",
    "James Bond", "Bourne Identity", "Die Hard", "Lethal Weapon", "Rocky",
    "Creed", "Rambo", "Expendables", "Transformers", "G.I. Joe",
    "Kung Fu Panda", "Shrek", "Toy Story", "Finding Nemo", "The Lion King",
    "Moana", "Coco", "Soul", "Onward", "Turning Red",
    "Encanto", "Raya", "Luca", "Elemental", "Wish",
    "The Flash", "Shazam", "Blue Beetle", "Ant-Man", "Doctor Strange",
    "Captain Marvel", "Black Widow", "Eternals", "Guardians Vol 3", "Loki",
    "The Conjuring", "Annabelle", "Insidious", "The Purge", "Get Out",
    "Us", "The Invisible Man", "A Quiet Place", "Smile", "M3GAN",
    "The Black Phone", "Barbarian", "Pearl", "X", "Megan",
    "Fall", "The Menu", "Bodies Bodies Bodies", "Glass Onion", "Knives Out"
  ];
  const genres = ["action", "sci-fi", "horror", "comedy", "drama", "thriller"];
  const year = 1990 + Math.floor(Math.random() * 35);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const movieTitle = titles[i % titles.length] || `Movie ${i + 1}`;
  
  return {
    id: `crackle-${i + 1}`,
    title: movieTitle,
    description: `Discover ${movieTitle} on Crackle. Stream movies and TV shows without subscription.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${630000000000000000 + i}`,
    source: "crackle",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR"][Math.floor(Math.random() * 4)],
    type: "movie",
    externalUrl: `https://www.crackle.com/search?q=${encodeURIComponent(movieTitle)}`,
  };
});

const popcornflixMovies: StreamingMovie[] = Array.from({ length: 400 }, (_, i) => {
  const titles = [
    "The Matrix", "Inception", "The Dark Knight", "John Wick", "Mad Max: Fury Road",
    "Titanic", "Avatar", "Avengers: Endgame", "Spider-Man: No Way Home", "Joker",
    "Black Panther", "Thor: Ragnarok", "Guardians of the Galaxy", "Iron Man", "Captain America",
    "Wonder Woman", "Aquaman", "Batman", "Suicide Squad", "Justice League",
    "X-Men", "Deadpool", "Logan", "Dune", "The Shawshank Redemption",
    "Forrest Gump", "The Silence of the Lambs", "Schindler's List", "Fight Club", "The Matrix Reloaded",
    "Terminator 2", "Jurassic Park", "Star Wars", "Harry Potter", "Lord of the Rings",
    "The Hobbit", "Pirates of the Caribbean", "Fast & Furious", "Mission Impossible",
    "James Bond", "Bourne Identity", "Die Hard", "Lethal Weapon", "Rocky",
    "Creed", "Rambo", "Expendables", "Transformers", "G.I. Joe",
    "Kung Fu Panda", "Shrek", "Toy Story", "Finding Nemo", "The Lion King",
    "Moana", "Coco", "Soul", "Onward", "Turning Red",
    "Encanto", "Raya", "Luca", "Elemental", "Wish",
    "The Flash", "Shazam", "Blue Beetle", "Ant-Man", "Doctor Strange",
    "The Conjuring", "Annabelle", "Insidious", "The Purge", "Get Out",
    "Us", "The Invisible Man", "A Quiet Place", "Smile", "M3GAN",
    "The Black Phone", "Barbarian", "Pearl", "X", "Megan",
    "Fall", "The Menu", "Bodies Bodies Bodies", "Glass Onion", "Knives Out"
  ];
  const genres = ["action", "comedy", "drama", "horror", "sci-fi", "animation", "family", "thriller", "crime"];
  const year = 2000 + Math.floor(Math.random() * 25);
  const genre = genres[Math.floor(Math.random() * genres.length)];
  const duration = `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`;
  const movieTitle = titles[i % titles.length] || `Movie ${i + 1}`;
  
  return {
    id: `popcorn-${i + 1}`,
    title: movieTitle,
    description: `Watch ${movieTitle} free on Popcornflix. Stream movies without subscription.`,
    year: year.toString(),
    thumbnail: `${TMDB_IMG}/w500/${500000000000000000 + i}`,
    source: "popcornflix",
    genre,
    duration,
    rating: ["PG", "PG-13", "R", "NR"][Math.floor(Math.random() * 4)],
    type: "movie",
    externalUrl: `https://www.popcornflix.com/search?q=${encodeURIComponent(movieTitle)}`,
  };
});

export async function getPlutoMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: plutoMovies.slice(start, end),
    total: 400,
  };
}

export async function getTubiMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: tubiMovies.slice(start, end),
    total: 400,
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

export async function getCrackleMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: crackleMovies.slice(start, end),
    total: 400,
  };
}

export async function getPopcornflixMovies(page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    movies: popcornflixMovies.slice(start, end),
    total: 400,
  };
}

export async function searchMovies(query: string, source?: string, page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { movies: [], total: 0 };
  }
  
  let allMovies: StreamingMovie[] = [
    ...plutoMovies, 
    ...tubiMovies, 
    ...archiveMovies, 
    ...youtubeMovies, 
    ...crackleMovies, 
    ...popcornflixMovies
  ];
  
  if (source && source !== "all") {
    allMovies = allMovies.filter(m => m.source === source);
  }
  
  const filtered = allMovies.filter(m => 
    m.title.toLowerCase().includes(q) || 
    m.description.toLowerCase().includes(q) ||
    m.genre?.toLowerCase().includes(q) ||
    m.year.includes(q)
  );
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    movies: filtered.slice(start, end),
    total: filtered.length,
  };
}

export async function getMoviesByGenre(genre: string, source?: string, page: number = 1, limit: number = 20): Promise<{ movies: StreamingMovie[]; total: number }> {
  let allMovies = [...plutoMovies, ...tubiMovies, ...archiveMovies, ...youtubeMovies, ...crackleMovies, ...popcornflixMovies];
  
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
    crackle: "Crackle",
    popcornflix: "Popcornflix",
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
    crackle: "bg-orange-600",
    popcornflix: "bg-yellow-600",
    public: "bg-gray-600",
  };
  return colors[source] || "bg-gray-600";
}

export function getSourceUrl(source: string): string {
  const urls: Record<string, string> = {
    archive: "https://archive.org",
    youtube: "https://youtube.com",
    pluto: "https://pluto.tv",
    tubi: "https://tubi.tv",
    crackle: "https://crackle.com",
    popcornflix: "https://popcornflix.com",
  };
  return urls[source] || "https://archive.org";
}