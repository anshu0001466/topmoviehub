import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/lib/store";
import { Movie } from "@/types/movie";
import { Film } from "lucide-react";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setMovies(getMovies());
    window.scrollTo(0, 0);
  }, []);

  const sorted = [...movies].sort((a, b) => {
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "year") return b.year - a.year;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-6 h-6 text-[#e8a020]" />
              <h1
                className="font-display text-4xl sm:text-6xl font-black text-[#f0ece4]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                All Movies
              </h1>
            </div>
            <p className="text-[#8a8070] font-mono-grotesk text-sm">
              <span className="text-[#e8a020] font-bold">{movies.length}</span> titles in the library
            </p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 bg-[#1a1917] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm focus:outline-none focus:border-[#e8a020] font-mono-grotesk"
          >
            <option value="newest">Newest First</option>
            <option value="az">A–Z</option>
            <option value="rating">Top Rated</option>
            <option value="year">By Year</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {sorted.map((m) => (
            <MovieCard key={m.id} movie={m} size="sm" />
          ))}
        </div>

        {movies.length === 0 && (
          <div className="text-center py-24">
            <Film className="w-12 h-12 text-[#8a8070] mx-auto mb-4" />
            <p className="text-[#8a8070]">No movies yet. Add some from the admin dashboard.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
