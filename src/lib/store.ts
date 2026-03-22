import { Movie, Category, SiteSettings } from "@/types/movie";

const MOVIES_KEY = "topmovies_movies";
const CATEGORIES_KEY = "topmovies_categories";
const SETTINGS_KEY = "topmovies_settings";

const defaultCategories: Category[] = [
  { id: "1", name: "Action", slug: "action", icon: "⚡", backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80" },
  { id: "2", name: "Drama", slug: "drama", icon: "🎭", backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80" },
  { id: "3", name: "Thriller", slug: "thriller", icon: "🔪", backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80" },
  { id: "4", name: "Horror", slug: "horror", icon: "👻", backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80" },
  { id: "5", name: "Sci-Fi", slug: "sci-fi", icon: "🚀", backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80" },
  { id: "6", name: "Comedy", slug: "comedy", icon: "😂", backdropUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80" },
  { id: "7", name: "Animation", slug: "animation", icon: "✨", backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80" },
];

const defaultMovies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    slug: "interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth becomes uninhabitable, Cooper must leave his family behind to lead a crew of astronauts through a newly discovered wormhole.",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80",
    trailerUrl: "",
    year: 2014,
    duration: "2h 49m",
    language: "English",
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    cast: [
      { name: "Matthew McConaughey", role: "Cooper" },
      { name: "Anne Hathaway", role: "Brand" },
      { name: "Jessica Chastain", role: "Murph" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    ],
    tags: ["space", "time-travel", "family", "christopher-nolan"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "4K", size: "18.5 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.2 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "1.8 GB", format: "MP4", server: "Mega", url: "#" },
      { quality: "480p", size: "750 MB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Dark Knight",
    slug: "the-dark-knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tagline: "Why So Serious?",
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&q=80",
    year: 2008,
    duration: "2h 32m",
    language: "English",
    rating: 9.0,
    genres: ["Action", "Thriller"],
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne" },
      { name: "Heath Ledger", role: "Joker" },
      { name: "Aaron Eckhart", role: "Harvey Dent" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    ],
    tags: ["batman", "dc", "superhero", "christopher-nolan"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "3.8 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.6 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Parasite",
    slug: "parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. A darkly comic thriller about social inequality.",
    tagline: "Act like you own the place.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    year: 2019,
    duration: "2h 12m",
    language: "Korean",
    rating: 8.5,
    genres: ["Drama", "Thriller"],
    cast: [
      { name: "Song Kang-ho", role: "Ki-taek" },
      { name: "Lee Sun-kyun", role: "Mr. Park" },
    ],
    screenshots: [],
    tags: ["korean", "bong-joon-ho", "class-war", "oscar-winner"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.9 GB", format: "MKV", server: "Mega", url: "#" },
      { quality: "720p", size: "1.3 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Blade Runner 2049",
    slug: "blade-runner-2049",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    tagline: "The key to the future is finally unearthed.",
    posterUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1920&q=80",
    year: 2017,
    duration: "2h 44m",
    language: "English",
    rating: 8.0,
    genres: ["Sci-Fi", "Drama"],
    cast: [
      { name: "Ryan Gosling", role: "K" },
      { name: "Harrison Ford", role: "Rick Deckard" },
      { name: "Ana de Armas", role: "Joi" },
    ],
    screenshots: [],
    tags: ["cyberpunk", "dystopia", "sequel", "villeneuve"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "22 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "5.1 GB", format: "MKV", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Midsommar",
    slug: "midsommar",
    description: "A couple travel to Sweden to visit a rural hometown's midsummer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition.",
    tagline: "Let the festivities begin.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80",
    year: 2019,
    duration: "2h 28m",
    language: "English",
    rating: 7.1,
    genres: ["Horror", "Drama"],
    cast: [
      { name: "Florence Pugh", role: "Dani" },
      { name: "Jack Reynor", role: "Christian" },
    ],
    screenshots: [],
    tags: ["folk-horror", "ari-aster", "cult", "sweden"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "3.5 GB", format: "MKV", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "The Grand Budapest Hotel",
    slug: "the-grand-budapest-hotel",
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    tagline: "A comedy film.",
    posterUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1920&q=80",
    year: 2014,
    duration: "1h 39m",
    language: "English",
    rating: 8.1,
    genres: ["Comedy", "Drama"],
    cast: [
      { name: "Ralph Fiennes", role: "Gustave H" },
      { name: "Tony Revolori", role: "Zero" },
    ],
    screenshots: [],
    tags: ["wes-anderson", "comedy", "europe", "hotel"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.4 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.1 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Spirited Away",
    slug: "spirited-away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    tagline: "The tunnel leads to a magical place.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=80",
    year: 2001,
    duration: "2h 5m",
    language: "Japanese",
    rating: 8.6,
    genres: ["Animation", "Drama"],
    cast: [
      { name: "Daveigh Chase", role: "Chihiro (English dub)" },
      { name: "Suzanne Pleshette", role: "Yubaba (English dub)" },
    ],
    screenshots: [],
    tags: ["studio-ghibli", "miyazaki", "anime", "fantasy"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.8 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "1.2 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Dune",
    slug: "dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    tagline: "Beyond fear, destiny awaits.",
    posterUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80",
    year: 2021,
    duration: "2h 35m",
    language: "English",
    rating: 8.0,
    genres: ["Sci-Fi", "Action"],
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides" },
      { name: "Zendaya", role: "Chani" },
      { name: "Oscar Isaac", role: "Duke Leto" },
    ],
    screenshots: [],
    tags: ["dune", "frank-herbert", "villeneuve", "space-opera"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "20 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.5 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
];

const defaultSettings: SiteSettings = {
  siteTitle: "TopMoviesHub",
  metaDescription: "Your ultimate destination for discovering and downloading the best movies.",
  featuredMovieId: "1",
  heroMovieId: "1",
};

function initStore() {
  if (!localStorage.getItem(MOVIES_KEY)) {
    localStorage.setItem(MOVIES_KEY, JSON.stringify(defaultMovies));
  }
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  }
}

export function getMovies(): Movie[] {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(MOVIES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMovies(movies: Movie[]) {
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

export function getMovieBySlug(slug: string): Movie | undefined {
  return getMovies().find((m) => m.slug === slug);
}

export function getMovieById(id: string): Movie | undefined {
  return getMovies().find((m) => m.id === id);
}

export function addMovie(movie: Omit<Movie, "id" | "createdAt">): Movie {
  const movies = getMovies();
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  movies.unshift(newMovie);
  saveMovies(movies);
  return newMovie;
}

export function updateMovie(id: string, updates: Partial<Movie>): Movie | null {
  const movies = getMovies();
  const idx = movies.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  movies[idx] = { ...movies[idx], ...updates };
  saveMovies(movies);
  return movies[idx];
}

export function deleteMovie(id: string) {
  const movies = getMovies().filter((m) => m.id !== id);
  saveMovies(movies);
}

export function getCategories(): Category[] {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCategories(categories: Category[]) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getSettings(): SiteSettings {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getAdminSession(): boolean {
  return localStorage.getItem("topmovies_admin_session") === "true";
}

export function setAdminSession(value: boolean) {
  if (value) {
    localStorage.setItem("topmovies_admin_session", "true");
  } else {
    localStorage.removeItem("topmovies_admin_session");
  }
}
