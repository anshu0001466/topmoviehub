import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Play, Download, TrendingUp, Flame, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovies, getCategories, getSettings } from "@/lib/store";
import { Movie, Category } from "@/types/movie";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const allMovies = getMovies();
    const cats = getCategories();
    const settings = getSettings();
    setMovies(allMovies);
    setCategories(cats);
    const hero =
      allMovies.find((m) => m.id === settings.heroMovieId) ||
      allMovies.find((m) => m.hero) ||
      allMovies[0];
    setHeroMovie(hero || null);
    setTimeout(() => setHeroLoaded(true), 150);
  }, []);

  const trendingMovies = movies.filter((m) => m.rating >= 8.0).slice(0, 10);
  const featuredMovies = movies.filter((m) => m.featured);
  const recentMovies = [...movies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 9);

  const genreRows = categories.slice(0, 5).map((cat) => ({
    category: cat,
    movies: movies.filter((m) => m.genres.includes(cat.name)).slice(0, 8),
  })).filter((row) => row.movies.length > 0);

  // Cycle hero movies among featured ones
  const heroPool = movies.filter((m) => m.hero || m.featured).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO SPOTLIGHT — Full bleed cinematic
      ═══════════════════════════════════════════ */}
      {heroMovie && (
        <section className="relative min-h-screen flex items-end overflow-hidden">
          {/* Backdrop */}
          <div className="absolute inset-0">
            <img
              src={heroMovie.backdropUrl}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.45) saturate(0.7)" }}
            />
            {/* Multi-layer cinematic gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0e] via-[#0f0e0e]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-transparent to-[#0f0e0e]/20" />
            {/* Film grain */}
            <div
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px",
              }}
            />
          </div>

          {/* Vertical amber line accent */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#e8a020]/40 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-24 pt-32 w-full">
            <div className="max-w-2xl">
              {/* Label */}
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8a020]/15 border border-[#e8a020]/30 rounded-sm">
                  <Flame className="w-3.5 h-3.5 text-[#e8a020]" />
                  <span className="text-[#e8a020] text-[10px] font-mono-grotesk font-bold tracking-widest uppercase">Featured Film</span>
                </div>
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-[#e8a020]/40 to-transparent" />
              </div>

              {/* Genre badges */}
              <div
                className={`flex flex-wrap gap-2 mb-5 transition-all duration-700 delay-100 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {heroMovie.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-[11px] font-mono-grotesk font-bold tracking-wider uppercase border border-[#f0ece4]/20 text-[#f0ece4]/70 rounded-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                className={`font-black text-[clamp(48px,8vw,96px)] text-[#f0ece4] leading-[0.9] mb-4 transition-all duration-700 delay-150 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "Fraunces, serif", textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
              >
                {heroMovie.title}
              </h1>

              {/* Tagline */}
              {heroMovie.tagline && (
                <p
                  className={`text-[#e8a020] text-base sm:text-lg italic mb-5 transition-all duration-700 delay-200 ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  "{heroMovie.tagline}"
                </p>
              )}

              {/* Meta row */}
              <div
                className={`flex items-center gap-4 mb-5 transition-all duration-700 delay-250 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-1.5 bg-[#e8a020] px-2.5 py-1 rounded-sm">
                  <Star className="w-3 h-3 text-[#0f0e0e] fill-[#0f0e0e]" />
                  <span className="text-[#0f0e0e] text-xs font-black font-mono-grotesk">{heroMovie.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#8a8070] text-sm font-mono-grotesk">{heroMovie.year}</span>
                <span className="text-[#2e2b27]">|</span>
                <span className="text-[#8a8070] text-sm font-mono-grotesk">{heroMovie.duration}</span>
                <span className="text-[#2e2b27]">|</span>
                <span className="text-[#8a8070] text-sm font-mono-grotesk">{heroMovie.language}</span>
              </div>

              {/* Description */}
              <p
                className={`text-[#8a8070] text-sm sm:text-base leading-relaxed mb-8 max-w-lg line-clamp-2 transition-all duration-700 delay-300 ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {heroMovie.description}
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-wrap gap-3 transition-all duration-700 delay-[400ms] ${
                  heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  to={`/movie/${heroMovie.slug}`}
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm tracking-wide hover:bg-[#f0b030] transition-all hover:shadow-[0_0_25px_rgba(232,160,32,0.4)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Details
                </Link>
                <Link
                  to={`/movie/${heroMovie.slug}/download`}
                  className="flex items-center gap-2.5 px-7 py-3.5 border border-[#f0ece4]/20 text-[#f0ece4] font-semibold text-sm tracking-wide hover:border-[#e8a020]/60 hover:text-[#e8a020] transition-all backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Link>
              </div>
            </div>

            {/* Hero selector dots */}
            {heroPool.length > 1 && (
              <div className="absolute bottom-10 right-8 hidden lg:flex flex-col gap-2">
                {heroPool.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setHeroMovie(heroPool[i])}
                    className={`transition-all ${
                      m.id === heroMovie.id
                        ? "w-1.5 h-6 bg-[#e8a020] rounded-full"
                        : "w-1.5 h-1.5 bg-[#2e2b27] rounded-full hover:bg-[#8a8070]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#8a8070]/50" />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          TRENDING STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeader
            icon={<TrendingUp className="w-4 h-4" />}
            title="Trending Now"
            subtitle="Top rated this season"
          />
          <HorizontalScrollRow>
            {trendingMovies.map((m) => (
              <MovieCard key={m.id} movie={m} size="md" />
            ))}
          </HorizontalScrollRow>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RECENTLY ADDED — Asymmetric masonry grid
      ═══════════════════════════════════════════ */}
      <section className="py-14 border-t border-[#2e2b27]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeader
            icon={<Clock className="w-4 h-4" />}
            title="Recently Added"
            subtitle="Fresh to the collection"
            link={{ href: "/movies", label: "View all" }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {/* First item — large feature card */}
            {recentMovies[0] && (
              <Link
                to={`/movie/${recentMovies[0].slug}`}
                className="col-span-2 row-span-2 group relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-auto sm:h-full min-h-[200px]"
              >
                <img
                  src={recentMovies[0].backdropUrl}
                  alt={recentMovies[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-[#0f0e0e]/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#e8a020] text-[#0f0e0e] text-[10px] font-black font-mono-grotesk px-2 py-0.5 rounded-sm uppercase tracking-widest">
                    New
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {recentMovies[0].genres.slice(0, 2).map((g) => (
                      <span key={g} className="text-[10px] px-2 py-0.5 bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] font-mono-grotesk rounded-sm uppercase">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-[#f0ece4] font-black text-xl sm:text-2xl group-hover:text-[#e8a020] transition-colors" style={{ fontFamily: "Fraunces, serif" }}>
                    {recentMovies[0].title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs font-mono-grotesk">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#e8a020] fill-[#e8a020]" />
                      <span className="text-[#e8a020] font-bold">{recentMovies[0].rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[#8a8070]">{recentMovies[0].year}</span>
                    <span className="text-[#8a8070]">{recentMovies[0].language}</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Remaining poster cards */}
            {recentMovies.slice(1).map((m) => (
              <Link
                key={m.id}
                to={`/movie/${m.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[2/3]"
              >
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0f0e0e] to-transparent" />
                <div className="absolute top-2 right-2 bg-[#e8a020] text-[#0f0e0e] text-[9px] font-black font-mono-grotesk px-1.5 py-0.5 rounded-sm">
                  {m.year}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-[#f0ece4] text-xs font-semibold line-clamp-1 group-hover:text-[#e8a020] transition-colors leading-tight">
                    {m.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-2.5 h-2.5 text-[#e8a020] fill-[#e8a020]" />
                    <span className="text-[#e8a020] text-[10px] font-bold font-mono-grotesk">{m.rating.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GENRE SHELF ROWS
      ═══════════════════════════════════════════ */}
      {genreRows.map(({ category, movies: catMovies }) => (
        <section key={category.id} className="py-10 border-t border-[#2e2b27]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <SectionHeader
              icon={<span className="text-base">{category.icon}</span>}
              title={category.name}
              link={{ href: `/categories/${category.slug}`, label: "See all →" }}
            />
            <HorizontalScrollRow>
              {catMovies.map((m) => (
                <MovieCard key={m.id} movie={m} size="md" />
              ))}
            </HorizontalScrollRow>
          </div>
        </section>
      ))}

      {/* ═══════════════════════════════════════════
          EDITOR'S PICKS — Cinematic backdrop grid
      ═══════════════════════════════════════════ */}
      {featuredMovies.length > 0 && (
        <section className="py-14 border-t border-[#2e2b27]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <SectionHeader
              icon={<Flame className="w-4 h-4 text-[#c0392b]" />}
              title="Editor's Picks"
              subtitle="Handpicked for cinephiles"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredMovies.slice(0, 6).map((m, idx) => (
                <Link
                  key={m.id}
                  to={`/movie/${m.slug}`}
                  className={`group relative rounded-xl overflow-hidden ${idx === 0 ? "sm:col-span-2 aspect-[21/9]" : "aspect-video"}`}
                >
                  <img
                    src={m.backdropUrl}
                    alt={m.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-[#0f0e0e]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {m.genres.slice(0, 2).map((g) => (
                        <span key={g} className="text-[9px] px-2 py-0.5 bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] rounded-sm font-mono-grotesk uppercase tracking-wide">
                          {g}
                        </span>
                      ))}
                    </div>
                    <h3
                      className={`text-[#f0ece4] font-black group-hover:text-[#e8a020] transition-colors leading-tight ${idx === 0 ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {m.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs font-mono-grotesk">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#e8a020] fill-[#e8a020]" />
                        <span className="text-[#e8a020] font-bold">{m.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-[#8a8070]">{m.year}</span>
                      <span className="text-[#8a8070]">{m.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          BROWSE CATEGORIES CTA STRIP
      ═══════════════════════════════════════════ */}
      <section className="py-14 border-t border-[#2e2b27]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-[#1a1917] border border-[#2e2b27]">
            {/* Background texture */}
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #e8a020 0, #e8a020 1px, transparent 0, transparent 50%)`,
                backgroundSize: "20px 20px"
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10">
              <div>
                <h2 className="font-black text-3xl sm:text-4xl text-[#f0ece4] mb-2" style={{ fontFamily: "Fraunces, serif" }}>
                  Browse by Genre
                </h2>
                <p className="text-[#8a8070] text-sm">
                  {categories.length} curated genre collections · {movies.length} films total
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0f0e0e] border border-[#2e2b27] text-[#8a8070] text-sm font-medium rounded-lg hover:border-[#e8a020]/50 hover:text-[#e8a020] transition-all"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
                <Link
                  to="/categories"
                  className="px-4 py-2 bg-[#e8a020] text-[#0f0e0e] text-sm font-bold rounded-lg hover:bg-[#f0b030] transition-all"
                >
                  All Genres →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
  link,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-[#e8a020]/10 border border-[#e8a020]/20 flex items-center justify-center text-[#e8a020]">
            {icon}
          </div>
        )}
        <div>
          <h2
            className="font-black text-2xl sm:text-3xl text-[#f0ece4] leading-none"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-[#8a8070] text-xs font-mono-grotesk mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {link && (
        <Link
          to={link.href}
          className="text-[#8a8070] text-sm font-medium hover:text-[#e8a020] transition-colors flex items-center gap-1 font-mono-grotesk"
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}

function HorizontalScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/row -mx-2">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-9 h-9 rounded-full bg-[#1a1917] border border-[#2e2b27] flex items-center justify-center text-[#f0ece4] hover:bg-[#e8a020] hover:text-[#0f0e0e] hover:border-[#e8a020] transition-all opacity-0 group-hover/row:opacity-100 shadow-xl"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 px-2"
      >
        {children}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-9 h-9 rounded-full bg-[#1a1917] border border-[#2e2b27] flex items-center justify-center text-[#f0ece4] hover:bg-[#e8a020] hover:text-[#0f0e0e] hover:border-[#e8a020] transition-all opacity-0 group-hover/row:opacity-100 shadow-xl"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
