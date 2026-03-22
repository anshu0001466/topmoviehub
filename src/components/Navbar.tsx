import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Categories", href: "/categories" },
    { label: "Search", href: "/search" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0f0e0e]/95 backdrop-blur-xl border-b border-[#2e2b27]/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 bg-[#e8a020] rounded flex items-center justify-center">
                <span className="text-[#0f0e0e] font-black text-sm" style={{ fontFamily: "Fraunces, serif" }}>T</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#c0392b] rounded-sm" />
            </div>
            <div className="hidden sm:block">
              <span
                className="block text-[#f0ece4] font-black text-lg leading-none group-hover:text-[#e8a020] transition-colors"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                TopMovies
              </span>
              <span className="block text-[#e8a020] text-[10px] font-mono-grotesk tracking-[0.2em] uppercase leading-none mt-0.5">
                Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    active ? "text-[#e8a020]" : "text-[#8a8070] hover:text-[#f0ece4]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-[#e8a020]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="p-2.5 rounded-full text-[#8a8070] hover:text-[#e8a020] hover:bg-[#e8a020]/10 transition-all"
            >
              <Search className="w-4 h-4" />
            </Link>
            <button
              className="md:hidden p-2.5 text-[#8a8070] hover:text-[#e8a020] hover:bg-[#e8a020]/10 rounded-full transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-[#1a1917] border-b border-[#2e2b27] px-4 py-6 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? "text-[#e8a020] bg-[#e8a020]/10"
                    : "text-[#f0ece4] hover:bg-[#2e2b27]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
