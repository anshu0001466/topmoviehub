export interface CastMember {
  name: string;
  role: string;
  photo?: string;
}

export interface DownloadLink {
  quality: string;
  size: string;
  format: string;
  server: string;
  url: string;
}

export interface Movie {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagline?: string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  year: number;
  duration: string;
  language: string;
  rating: number;
  genres: string[];
  cast: CastMember[];
  screenshots: string[];
  tags: string[];
  featured: boolean;
  hero: boolean;
  downloadLinks: DownloadLink[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  backdropUrl?: string;
  movieCount?: number;
}

export interface SiteSettings {
  siteTitle: string;
  metaDescription: string;
  featuredMovieId: string;
  heroMovieId: string;
}
