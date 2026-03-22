import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Edit2, Trash2, Star, Search } from "lucide-react";
import { getMovies, deleteMovie } from "@/lib/store";
import { Movie } from "@/types/movie";

export default function AdminMovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => setMovies(getMovies());
  useEffect(() => { load(); }, []);

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteMovie(id);
    setDeleteConfirm(null);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#f0ece4]"
              style={{ fontFamily: "Fraunces, serif" }}>
            Movies
          </h1>
          <p className="text-[#8a8070] text-sm">{movies.length} total movies</p>
        </div>
        <Link
          to="/admin/movies/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm rounded-sm hover:bg-[#f0b030] transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Movie
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8070]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="w-full pl-11 pr-4 py-3 bg-[#1a1917] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020]"
        />
      </div>

      {/* Table */}
      <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2e2b27]">
                {["Movie", "Year", "Genre", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-[#2e2b27] last:border-0 hover:bg-[#0f0e0e]/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-12 rounded overflow-hidden bg-[#0f0e0e] flex-shrink-0">
                        <img src={m.posterUrl} alt={m.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[#f0ece4] text-sm font-medium line-clamp-1">{m.title}</p>
                        <p className="text-[#8a8070] text-xs font-mono-grotesk">/{m.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#8a8070] text-sm font-mono-grotesk">{m.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {m.genres.slice(0, 2).map((g) => (
                        <span key={g} className="text-[10px] px-2 py-0.5 bg-[#e8a020]/10 text-[#e8a020] rounded font-mono-grotesk">
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[#e8a020] font-mono-grotesk font-bold text-sm">
                      <Star className="w-3 h-3 fill-current" />
                      {m.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {m.featured && (
                        <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded font-mono-grotesk w-fit">
                          Featured
                        </span>
                      )}
                      {m.hero && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#e8a020]/20 text-[#e8a020] rounded font-mono-grotesk w-fit">
                          Hero
                        </span>
                      )}
                      {!m.featured && !m.hero && (
                        <span className="text-[10px] px-2 py-0.5 bg-[#2e2b27] text-[#8a8070] rounded font-mono-grotesk w-fit">
                          Normal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/movies/edit/${m.id}`)}
                        className="p-1.5 rounded text-[#8a8070] hover:text-[#e8a020] hover:bg-[#e8a020]/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(m.id)}
                        className="p-1.5 rounded text-[#8a8070] hover:text-[#c0392b] hover:bg-[#c0392b]/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-[#8a8070] text-sm">
                    No movies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1e1c19] border border-[#2e2b27] rounded-xl p-8 max-w-sm w-full animate-[scale-in_0.2s_ease-out]">
            <div className="w-12 h-12 rounded-full bg-[#c0392b]/15 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-[#c0392b]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#f0ece4] text-center mb-2"
                style={{ fontFamily: "Fraunces, serif" }}>
              Delete Movie?
            </h3>
            <p className="text-[#8a8070] text-sm text-center mb-6">
              This action cannot be undone. The movie will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 border border-[#2e2b27] text-[#f0ece4] text-sm rounded-sm hover:border-[#8a8070] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-[#c0392b] text-white text-sm font-bold rounded-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
