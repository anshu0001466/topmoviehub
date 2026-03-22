import { Link } from "react-router-dom";
import { Movie } from "@/types/movie";
import { Star, Download } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  size?: "sm" | "md" | "lg";
}

export default function MovieCard({ movie, size = "md" }: MovieCardProps) {
  const widthClass = {
    sm: "w-36 sm:w-40",
    md: "w-44 sm:w-52",
    lg: "w-52 sm:w-64",
  }[size];

  return (
    <Link
      to={`/movie/${movie.slug}`}
      className={`${widthClass} flex-shrink-0 group block`}
    >
      <div className="relative rounded-xl overflow-hidden bg-[#1a1917] aspect-[2/3] shadow-lg">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Always-visible gradient at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f0e0e] to-transparent" />

        {/* Hover full overlay */}
        <div className="absolute inset-0 bg-[#0f0e0e]/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
          <div className="flex justify-end">
            <div className="flex items-center gap-1 bg-[#e8a020] rounded-sm px-2 py-0.5">
              <Star className="w-2.5 h-2.5 text-[#0f0e0e] fill-[#0f0e0e]" />
              <span className="text-[#0f0e0e] text-[10px] font-black font-mono-grotesk">
                {movie.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {movie.genres.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="text-[9px] px-1.5 py-0.5 rounded-sm bg-[#e8a020]/20 border border-[#e8a020]/30 text-[#e8a020] font-mono-grotesk uppercase tracking-wide"
                >
                  {g}
                </span>
              ))}
            </div>
            <p className="text-[#f0ece4] text-xs font-semibold line-clamp-2 leading-tight mb-2">
              {movie.title}
            </p>
            <div className="flex items-center gap-1.5 text-[#8a8070] text-[10px] font-mono-grotesk">
              <span>{movie.year}</span>
              <span>·</span>
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>

        {/* Year badge - always visible */}
        <div className="absolute top-2 left-2 bg-[#0f0e0e]/80 backdrop-blur-sm text-[#8a8070] text-[10px] px-1.5 py-0.5 rounded font-mono-grotesk">
          {movie.year}
        </div>

        {/* Download icon on hover */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/movie/${movie.slug}/download`}
            onClick={(e) => e.stopPropagation()}
            className="w-7 h-7 bg-[#e8a020] rounded-sm flex items-center justify-center hover:bg-[#f0b030] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#0f0e0e]" />
          </Link>
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="text-[#f0ece4] text-xs sm:text-sm font-semibold line-clamp-1 group-hover:text-[#e8a020] transition-colors leading-tight">
          {movie.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Star className="w-2.5 h-2.5 text-[#e8a020] fill-[#e8a020]" />
          <span className="text-[#e8a020] text-[10px] font-bold font-mono-grotesk">{movie.rating.toFixed(1)}</span>
          <span className="text-[#8a8070] text-[10px]">{movie.genres[0]}</span>
        </div>
      </div>
    </Link>
  );
}
