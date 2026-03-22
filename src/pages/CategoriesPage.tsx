import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovies, getCategories } from "@/lib/store";
import { Movie, Category } from "@/types/movie";
import { ChevronRight } from "lucide-react";

export default function CategoriesPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    const cats = getCategories();
    const allMovies = getMovies();
    setCategories(cats);
    setMovies(allMovies);
    if (slug) {
      const cat = cats.find((c) => c.slug === slug);
      setActiveCategory(cat || null);
    } else {
      setActiveCategory(null);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  const getMovieCount = (catName: string) =>
    movies.filter((m) => m.genres.includes(catName)).length;

  const filteredMovies = activeCategory
    ? movies.filter((m) => m.genres.includes(activeCategory.name))
    : [];

  if (activeCategory) {
    return (
      <div className="min-h-screen bg-[#0f0e0e]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          <div className="flex items-center gap-2 text-[#8a8070] text-sm mb-8">
            <Link to="/categories" className="hover:text-[#e8a020] transition-colors">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#f0ece4]">{activeCategory.name}</span>
          </div>
          <div className="flex items-center gap-4 mb-10">
            <span className="text-5xl">{activeCategory.icon}</span>
            <div>
              <h1
                className="font-display text-4xl sm:text-6xl font-black text-[#f0ece4]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {activeCategory.name}
              </h1>
              <p className="text-[#8a8070] mt-1 font-mono-grotesk">
                {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {filteredMovies.length === 0 ? (
            <div className="text-center py-24 text-[#8a8070]">No movies in this category yet.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.map((m) => (
                <MovieCard key={m.id} movie={m} size="sm" />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h1
          className="font-display text-4xl sm:text-6xl font-black text-[#f0ece4] mb-4"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Browse by Genre
        </h1>
        <p className="text-[#8a8070] mb-12 text-lg">Discover movies organized by their cinematic identity.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = getMovieCount(cat.name);
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[16/7] bg-[#1a1917] card-hover"
              >
                {cat.backdropUrl && (
                  <img
                    src={cat.backdropUrl}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: "brightness(0.4) saturate(0.7)" }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-5xl mb-3 drop-shadow-lg">{cat.icon}</div>
                  <h2
                    className="font-display text-3xl font-black text-[#f0ece4] group-hover:text-[#e8a020] transition-colors text-center"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    {cat.name}
                  </h2>
                  <span className="mt-2 px-3 py-1 bg-[#0f0e0e]/60 border border-[#2e2b27] rounded-full text-[#8a8070] text-xs font-mono-grotesk">
                    {count} movie{count !== 1 ? "s" : ""}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
