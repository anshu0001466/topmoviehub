import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0f0e0e] border-t border-[#2e2b27]/60 mt-8">
      {/* Top amber line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#e8a020]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link to="/" className="group inline-block mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#e8a020] rounded flex items-center justify-center">
                    <span className="text-[#0f0e0e] font-black text-base" style={{ fontFamily: "Fraunces, serif" }}>T</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#c0392b] rounded-sm" />
                </div>
                <div>
                  <span className="block text-[#f0ece4] font-black text-xl leading-none group-hover:text-[#e8a020] transition-colors" style={{ fontFamily: "Fraunces, serif" }}>
                    TopMoviesHub
                  </span>
                  <span className="block text-[#8a8070] text-[11px] font-mono-grotesk tracking-widest uppercase mt-0.5">
                    Cinema. Curated.
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-[#8a8070] text-sm leading-relaxed max-w-xs">
              A curated collection of cinematic excellence. Discover, explore, and download the films that define culture.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#f0ece4] font-bold text-xs uppercase tracking-widest mb-5 font-mono-grotesk">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "All Movies", href: "/movies" },
                { label: "Categories", href: "/categories" },
                { label: "Search", href: "/search" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[#8a8070] text-sm hover:text-[#e8a020] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[#2e2b27] rounded-full group-hover:bg-[#e8a020] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#f0ece4] font-bold text-xs uppercase tracking-widest mb-5 font-mono-grotesk">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "DMCA Notice", href: "/dmca" },
                { label: "Contact Us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-[#8a8070] text-sm hover:text-[#e8a020] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[#2e2b27] rounded-full group-hover:bg-[#e8a020] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2e2b27]/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8a8070] text-xs font-mono-grotesk">
            © {new Date().getFullYear()} TopMoviesHub. All rights reserved.
          </p>
          <p className="text-[#8a8070] text-xs font-mono-grotesk text-center">
            For educational purposes only. No files are hosted on this server.
          </p>
        </div>
      </div>
    </footer>
  );
}
