import { useEffect, useState, useRef } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovies, getCategories } from "@/lib/store";
import { Movie } from "@/types/movie";

const LANGUAGES = ["English", "Korean", "Japanese", "French", "Spanish", "Hindi"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "az", label: "A–Z" },
  { value: "rating", label: "Top Rated" },
  { value: "year_desc", label: "Year (Newest)" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()]);
  const [language, setLanguage] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const allMovies = getMovies();
    const cats = getCategories();
    setMovies(allMovies);
    setGenres(cats.map((c) => c.name));
    inputRef.current?.focus();
  }, []);

  const filtered = movies
    .filter((m) => {
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q));
      const matchGenre =
        selectedGenres.length === 0 || selectedGenres.some((g) => m.genres.includes(g));
      const matchYear = m.year >= yearRange[0] && m.year <= yearRange[1];
      const matchLang = !language || m.language === language;
      const matchRating = m.rating >= minRating;
      return matchQuery && matchGenre && matchYear && matchLang && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year_desc") return b.year - a.year;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedGenres([]);
    setYearRange([1990, new Date().getFullYear()]);
    setLanguage("");
    setMinRating(0);
    setSortBy("newest");
  };

  const hasFilters =
    query ||
    selectedGenres.length > 0 ||
    language ||
    minRating > 0 ||
    sortBy !== "newest";

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Header */}
        <h1
          className="font-display text-4xl sm:text-6xl font-black text-[#f0ece4] mb-8"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Search Movies
        </h1>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8a8070]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, genre, tag..."
            className="w-full pl-14 pr-14 py-5 bg-[#1a1917] border border-[#2e2b27] rounded-xl text-[#f0ece4] text-lg placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020] focus:ring-1 focus:ring-[#e8a020]/30 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8a8070] hover:text-[#f0ece4]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreToggle={toggleGenre}
              yearRange={yearRange}
              onYearRange={setYearRange}
              language={language}
              onLanguage={setLanguage}
              minRating={minRating}
              onMinRating={setMinRating}
              sortBy={sortBy}
              onSortBy={setSortBy}
              onClear={clearFilters}
              hasFilters={!!hasFilters}
            />
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#8a8070] text-sm font-mono-grotesk">
                <span className="text-[#e8a020] font-bold">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""} found
              </p>
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1a1917] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm hover:border-[#e8a020]/30"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasFilters && (
                  <span className="w-2 h-2 bg-[#e8a020] rounded-full" />
                )}
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🎬</div>
                <h3
                  className="font-display text-2xl font-bold text-[#f0ece4] mb-3"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  No Results Found
                </h3>
                <p className="text-[#8a8070] mb-6">Try a different search term or adjust your filters.</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-[#e8a020] text-[#0f0e0e] font-semibold rounded-sm hover:bg-[#f0b030] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((m) => (
                  <MovieCard key={m.id} movie={m} size="sm" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#1a1917] border-l border-[#2e2b27] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#f0ece4] font-bold text-lg">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="text-[#8a8070] hover:text-[#f0ece4]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanel
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreToggle={toggleGenre}
              yearRange={yearRange}
              onYearRange={setYearRange}
              language={language}
              onLanguage={setLanguage}
              minRating={minRating}
              onMinRating={setMinRating}
              sortBy={sortBy}
              onSortBy={setSortBy}
              onClear={clearFilters}
              hasFilters={!!hasFilters}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

interface FilterPanelProps {
  genres: string[];
  selectedGenres: string[];
  onGenreToggle: (g: string) => void;
  yearRange: [number, number];
  onYearRange: (r: [number, number]) => void;
  language: string;
  onLanguage: (l: string) => void;
  minRating: number;
  onMinRating: (r: number) => void;
  sortBy: string;
  onSortBy: (s: string) => void;
  onClear: () => void;
  hasFilters: boolean;
}

function FilterPanel({
  genres, selectedGenres, onGenreToggle,
  yearRange, onYearRange,
  language, onLanguage,
  minRating, onMinRating,
  sortBy, onSortBy,
  onClear, hasFilters,
}: FilterPanelProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button
          onClick={onClear}
          className="w-full px-4 py-2 border border-[#c0392b]/30 text-[#c0392b] text-sm rounded-sm hover:bg-[#c0392b]/10 transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Sort */}
      <div>
        <h3 className="text-[#f0ece4] text-sm font-semibold mb-3 uppercase tracking-widest font-mono-grotesk">Sort By</h3>
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortBy(opt.value)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                sortBy === opt.value
                  ? "bg-[#e8a020]/20 text-[#e8a020]"
                  : "text-[#8a8070] hover:text-[#f0ece4] hover:bg-[#0f0e0e]/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genres */}
      <div>
        <h3 className="text-[#f0ece4] text-sm font-semibold mb-3 uppercase tracking-widest font-mono-grotesk">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => onGenreToggle(g)}
              className={`px-3 py-1.5 text-xs rounded-sm border transition-colors font-mono-grotesk ${
                selectedGenres.includes(g)
                  ? "bg-[#e8a020] text-[#0f0e0e] border-[#e8a020] font-bold"
                  : "border-[#2e2b27] text-[#8a8070] hover:border-[#e8a020]/30 hover:text-[#e8a020]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div>
        <h3 className="text-[#f0ece4] text-sm font-semibold mb-3 uppercase tracking-widest font-mono-grotesk">Year Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            min={1900}
            max={yearRange[1]}
            value={yearRange[0]}
            onChange={(e) => onYearRange([parseInt(e.target.value), yearRange[1]])}
            className="w-full px-3 py-2 bg-[#0f0e0e] border border-[#2e2b27] rounded text-[#f0ece4] text-sm focus:outline-none focus:border-[#e8a020]"
          />
          <span className="text-[#8a8070] self-center">–</span>
          <input
            type="number"
            min={yearRange[0]}
            max={currentYear}
            value={yearRange[1]}
            onChange={(e) => onYearRange([yearRange[0], parseInt(e.target.value)])}
            className="w-full px-3 py-2 bg-[#0f0e0e] border border-[#2e2b27] rounded text-[#f0ece4] text-sm focus:outline-none focus:border-[#e8a020]"
          />
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-[#f0ece4] text-sm font-semibold mb-3 uppercase tracking-widest font-mono-grotesk">Language</h3>
        <select
          value={language}
          onChange={(e) => onLanguage(e.target.value)}
          className="w-full px-3 py-2.5 bg-[#0f0e0e] border border-[#2e2b27] rounded text-[#f0ece4] text-sm focus:outline-none focus:border-[#e8a020]"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {/* Min Rating */}
      <div>
        <h3 className="text-[#f0ece4] text-sm font-semibold mb-3 uppercase tracking-widest font-mono-grotesk">
          Min Rating: <span className="text-[#e8a020]">{minRating.toFixed(1)}+</span>
        </h3>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={minRating}
          onChange={(e) => onMinRating(parseFloat(e.target.value))}
          className="w-full accent-[#e8a020]"
        />
        <div className="flex justify-between text-[#8a8070] text-xs mt-1 font-mono-grotesk">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
