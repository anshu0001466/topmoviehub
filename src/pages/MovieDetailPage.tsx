import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, Globe, Calendar, Download, Play, X, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMovieBySlug, getMovies } from "@/lib/store";
import { Movie } from "@/types/movie";

export default function MovieDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [related, setRelated] = useState<Movie[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const m = getMovieBySlug(slug);
    setMovie(m || null);
    if (m) {
      const all = getMovies();
      const rel = all
        .filter((x) => x.id !== m.id && x.genres.some((g) => m.genres.includes(g)))
        .slice(0, 4);
      setRelated(rel);
    }
    setTimeout(() => setLoaded(true), 80);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0f0e0e] flex items-center justify-center">
        <Navbar />
        <p className="text-[#8a8070]">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />

      {/* Cinematic Banner */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.45) saturate(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0e] via-[#0f0e0e]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0e0e]/60 to-transparent" />
          <div className="absolute inset-0 film-grain" />
        </div>
        <div
          className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-32 w-full transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-[#8a8070] hover:text-[#e8a020] text-sm mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Movies
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((g) => (
              <span key={g} className="px-3 py-1 text-xs font-mono-grotesk font-semibold tracking-widest uppercase bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] rounded-sm">
                {g}
              </span>
            ))}
          </div>
          <h1
            className="font-display text-5xl sm:text-7xl font-black text-[#f0ece4] leading-none mb-3"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-[#e8a020] text-lg italic font-display mb-4"
               style={{ fontFamily: "Fraunces, serif" }}>
              "{movie.tagline}"
            </p>
          )}
        </div>
      </section>

      {/* Info Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-10">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="rounded-lg overflow-hidden shadow-2xl aspect-[2/3] bg-[#1a1917]">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <Link
              to={`/movie/${movie.slug}/download`}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#e8a020] text-[#0f0e0e] font-bold rounded-sm hover:bg-[#f0b030] transition-all amber-glow"
            >
              <Download className="w-4 h-4" />
              Download Movie
            </Link>
          </div>

          {/* Details */}
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1a1917] border border-[#2e2b27] rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-4 h-4 text-[#e8a020]" />
                  <span className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-wider">Rating</span>
                </div>
                <p className="text-[#e8a020] text-2xl font-bold font-mono-grotesk">{movie.rating.toFixed(1)}</p>
              </div>
              <div className="bg-[#1a1917] border border-[#2e2b27] rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-4 h-4 text-[#8a8070]" />
                  <span className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-wider">Year</span>
                </div>
                <p className="text-[#f0ece4] text-xl font-semibold font-mono-grotesk">{movie.year}</p>
              </div>
              <div className="bg-[#1a1917] border border-[#2e2b27] rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-[#8a8070]" />
                  <span className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-[#f0ece4] text-xl font-semibold font-mono-grotesk">{movie.duration}</p>
              </div>
              <div className="bg-[#1a1917] border border-[#2e2b27] rounded-lg p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Globe className="w-4 h-4 text-[#8a8070]" />
                  <span className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-wider">Language</span>
                </div>
                <p className="text-[#f0ece4] text-xl font-semibold font-mono-grotesk">{movie.language}</p>
              </div>
            </div>

            {/* Description */}
            <h3 className="text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-3">Synopsis</h3>
            <p className="text-[#f0ece4] leading-relaxed text-base mb-6">{movie.description}</p>

            {/* Tags */}
            {movie.tags.length > 0 && (
              <div>
                <h3 className="text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#1a1917] border border-[#2e2b27] text-[#8a8070] text-xs rounded-sm font-mono-grotesk hover:text-[#e8a020] hover:border-[#e8a020]/30 transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cast Strip */}
      {movie.cast.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-[#2e2b27]">
          <h2 className="font-display text-2xl font-bold text-[#f0ece4] mb-6"
              style={{ fontFamily: "Fraunces, serif" }}>
            Cast & Crew
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {movie.cast.map((c, i) => (
              <div key={i} className="flex-shrink-0 w-32 sm:w-36">
                <div className="w-20 h-20 rounded-full bg-[#1a1917] border-2 border-[#2e2b27] overflow-hidden mx-auto mb-2">
                  {c.photo ? (
                    <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#e8a020] text-xl font-display"
                         style={{ fontFamily: "Fraunces, serif" }}>
                      {c.name[0]}
                    </div>
                  )}
                </div>
                <p className="text-[#f0ece4] text-xs font-semibold text-center line-clamp-1">{c.name}</p>
                <p className="text-[#8a8070] text-[11px] text-center line-clamp-1 font-mono-grotesk">{c.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots Gallery */}
      {movie.screenshots.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-[#2e2b27]">
          <h2 className="font-display text-2xl font-bold text-[#f0ece4] mb-6"
              style={{ fontFamily: "Fraunces, serif" }}>
            Screenshots
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {movie.screenshots.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(src)}
                className="flex-shrink-0 w-64 sm:w-80 rounded-lg overflow-hidden aspect-video bg-[#1a1917] hover:ring-2 hover:ring-[#e8a020] transition-all card-hover"
              >
                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Download CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-[#2e2b27]">
        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-[#f0ece4] mb-2"
                style={{ fontFamily: "Fraunces, serif" }}>
              Ready to watch?
            </h2>
            <p className="text-[#8a8070] text-sm">
              Download {movie.title} in multiple quality options — 480p, 720p, 1080p, and 4K.
            </p>
          </div>
          <Link
            to={`/movie/${movie.slug}/download`}
            className="flex items-center gap-2 px-8 py-4 bg-[#e8a020] text-[#0f0e0e] font-bold rounded-sm hover:bg-[#f0b030] transition-all amber-glow text-lg"
          >
            <Download className="w-5 h-5" />
            View Download Options
          </Link>
        </div>
      </section>

      {/* Trailer */}
      {movie.trailerUrl && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-[#2e2b27]">
          <h2 className="font-display text-2xl font-bold text-[#f0ece4] mb-6"
              style={{ fontFamily: "Fraunces, serif" }}>
            Trailer
          </h2>
          <div className="rounded-xl overflow-hidden aspect-video bg-[#1a1917]">
            <iframe
              src={movie.trailerUrl}
              className="w-full h-full"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </section>
      )}

      {/* Related Movies */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-[#2e2b27]">
          <h2 className="font-display text-2xl font-bold text-[#f0ece4] mb-6"
              style={{ fontFamily: "Fraunces, serif" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((m) => (
              <MovieCard key={m.id} movie={m} size="sm" />
            ))}
          </div>
        </section>
      )}

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1a1917] border border-[#2e2b27] flex items-center justify-center text-[#f0ece4] hover:text-[#e8a020] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightbox}
            alt="Screenshot"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
