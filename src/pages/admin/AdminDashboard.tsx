import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Film, FolderOpen, PlusCircle, Clock, Star, TrendingUp } from "lucide-react";
import { getMovies, getCategories } from "@/lib/store";
import { Movie } from "@/types/movie";

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [catCount, setCatCount] = useState(0);

  useEffect(() => {
    setMovies(getMovies());
    setCatCount(getCategories().length);
  }, []);

  const recent = [...movies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const stats = [
    { label: "Total Movies", value: movies.length, icon: Film, color: "text-[#e8a020]", bg: "bg-[#e8a020]/10" },
    { label: "Categories", value: catCount, icon: FolderOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Featured", value: movies.filter((m) => m.featured).length, icon: Star, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Recently Added", value: recent.length, icon: Clock, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#f0ece4] mb-1"
            style={{ fontFamily: "Fraunces, serif" }}>
          Dashboard
        </h1>
        <p className="text-[#8a8070] text-sm font-mono-grotesk">Welcome back. Here's your site overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#1a1917] border border-[#2e2b27] rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className={`text-3xl font-bold ${s.color} font-mono-grotesk`}>{s.value}</p>
            <p className="text-[#8a8070] text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/movies/new"
          className="flex items-center gap-4 p-5 bg-[#1a1917] border border-[#e8a020]/30 rounded-xl hover:border-[#e8a020] transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#e8a020]/15 flex items-center justify-center group-hover:bg-[#e8a020]/25 transition-colors">
            <PlusCircle className="w-6 h-6 text-[#e8a020]" />
          </div>
          <div>
            <p className="text-[#f0ece4] font-semibold">Add New Movie</p>
            <p className="text-[#8a8070] text-sm">Add a new movie to the platform</p>
          </div>
        </Link>
        <Link
          to="/admin/movies"
          className="flex items-center gap-4 p-5 bg-[#1a1917] border border-[#2e2b27] rounded-xl hover:border-[#e8a020]/30 transition-colors group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-[#f0ece4] font-semibold">Manage Movies</p>
            <p className="text-[#8a8070] text-sm">Edit, delete, and organize movies</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recently Added */}
        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#2e2b27] flex items-center justify-between">
            <h2 className="text-[#f0ece4] font-semibold">Recently Added</h2>
            <Link to="/admin/movies" className="text-[#8a8070] text-xs hover:text-[#e8a020] transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#2e2b27]">
            {recent.map((m) => (
              <Link
                key={m.id}
                to={`/admin/movies/edit/${m.id}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-[#0f0e0e]/40 transition-colors"
              >
                <div className="w-10 h-14 rounded overflow-hidden bg-[#0f0e0e] flex-shrink-0">
                  <img src={m.posterUrl} alt={m.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f0ece4] text-sm font-medium truncate">{m.title}</p>
                  <p className="text-[#8a8070] text-xs font-mono-grotesk">{m.year} · {m.genres[0]}</p>
                </div>
                <div className="flex items-center gap-1 text-[#e8a020] text-xs font-mono-grotesk">
                  <Star className="w-3 h-3 fill-current" />
                  {m.rating}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#2e2b27]">
            <h2 className="text-[#f0ece4] font-semibold">Top Rated</h2>
          </div>
          <div className="divide-y divide-[#2e2b27]">
            {topRated.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                <span className="text-[#8a8070] text-sm font-mono-grotesk w-5 text-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f0ece4] text-sm font-medium truncate">{m.title}</p>
                  <p className="text-[#8a8070] text-xs font-mono-grotesk">{m.year}</p>
                </div>
                <div className="flex items-center gap-1 text-[#e8a020] text-sm font-bold font-mono-grotesk">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {m.rating.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
