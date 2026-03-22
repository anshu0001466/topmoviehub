import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, Copy, Check, ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMovieBySlug } from "@/lib/store";
import { Movie, DownloadLink } from "@/types/movie";

const SERVER_COLORS: Record<string, string> = {
  GDrive: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Mega: "bg-red-500/20 text-red-400 border-red-500/30",
  "Server 1": "bg-green-500/20 text-green-400 border-green-500/30",
  "Server 2": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const QUALITY_ORDER = ["4K", "1080p", "720p", "480p"];

export default function DownloadPage() {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setMovie(getMovieBySlug(slug) || null);
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0f0e0e] flex items-center justify-center">
        <Navbar />
        <p className="text-[#8a8070]">Movie not found.</p>
      </div>
    );
  }

  const sortedLinks = [...movie.downloadLinks].sort(
    (a, b) => QUALITY_ORDER.indexOf(a.quality) - QUALITY_ORDER.indexOf(b.quality)
  );

  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Back */}
        <Link
          to={`/movie/${movie.slug}`}
          className="inline-flex items-center gap-2 text-[#8a8070] hover:text-[#e8a020] text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Movie
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="w-20 sm:w-28 flex-shrink-0 rounded-lg overflow-hidden shadow-xl aspect-[2/3] bg-[#1a1917]">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1
              className="font-display text-3xl sm:text-5xl font-black text-[#f0ece4] mb-2 leading-tight"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[#8a8070] text-sm font-mono-grotesk">
              <span>{movie.year}</span>
              <span className="w-1 h-1 bg-[#8a8070] rounded-full" />
              <span>{movie.duration}</span>
              <span className="w-1 h-1 bg-[#8a8070] rounded-full" />
              <span>{movie.language}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres.map((g) => (
                <span key={g} className="px-2 py-0.5 text-xs bg-[#e8a020]/20 text-[#e8a020] rounded-sm font-mono-grotesk">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Placeholder Top */}
        <div className="bg-[#1a1917] border border-dashed border-[#2e2b27] rounded-lg h-20 flex items-center justify-center mb-8">
          <p className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-widest">Advertisement</p>
        </div>

        {/* Download Table */}
        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[#2e2b27]">
            <h2 className="font-display text-xl font-bold text-[#f0ece4]"
                style={{ fontFamily: "Fraunces, serif" }}>
              Download Options
            </h2>
          </div>

          {sortedLinks.length === 0 ? (
            <div className="p-10 text-center text-[#8a8070]">
              No download links available yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2e2b27]">
                    {["Quality", "Size", "Format", "Server", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedLinks.map((link, i) => {
                    const rowId = `${i}-${link.quality}`;
                    const serverColor = SERVER_COLORS[link.server] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
                    return (
                      <tr key={i} className="border-b border-[#2e2b27] last:border-0 hover:bg-[#0f0e0e]/40 transition-colors">
                        <td className="px-4 py-4">
                          <span className={`font-mono-grotesk font-bold text-sm px-2.5 py-1 rounded-sm ${
                            link.quality === "4K" ? "bg-[#e8a020]/20 text-[#e8a020]" :
                            link.quality === "1080p" ? "bg-blue-500/20 text-blue-400" :
                            link.quality === "720p" ? "bg-green-500/20 text-green-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {link.quality}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[#f0ece4] text-sm font-mono-grotesk">{link.size}</td>
                        <td className="px-4 py-4">
                          <span className="text-[#8a8070] text-sm font-mono-grotesk bg-[#0f0e0e] px-2 py-0.5 rounded">
                            {link.format}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-mono-grotesk font-semibold px-2.5 py-1 rounded-sm border ${serverColor}`}>
                            {link.server}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 bg-[#e8a020] text-[#0f0e0e] text-xs font-bold rounded-sm hover:bg-[#f0b030] transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download
                            </a>
                            <button
                              onClick={() => handleCopy(link.url, rowId)}
                              className="p-2 rounded-sm border border-[#2e2b27] text-[#8a8070] hover:text-[#e8a020] hover:border-[#e8a020]/30 transition-colors"
                              title="Copy link"
                            >
                              {copied === rowId ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Ad Placeholder Bottom */}
        <div className="bg-[#1a1917] border border-dashed border-[#2e2b27] rounded-lg h-20 flex items-center justify-center mb-8">
          <p className="text-[#8a8070] text-xs font-mono-grotesk uppercase tracking-widest">Advertisement</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-lg p-5 flex gap-3">
          <Shield className="w-5 h-5 text-[#8a8070] flex-shrink-0 mt-0.5" />
          <p className="text-[#8a8070] text-sm leading-relaxed">
            <strong className="text-[#f0ece4]">Disclaimer:</strong> TopMoviesHub does not host any files on its servers. All download links redirect to third-party hosting services. We are not responsible for the content of those external sites. This platform is for educational and informational purposes only.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
