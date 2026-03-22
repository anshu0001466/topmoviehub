import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Film, LayoutDashboard, List, PlusCircle, FolderOpen, Settings, LogOut, Menu, X,
} from "lucide-react";
import { getAdminSession, setAdminSession } from "@/lib/store";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: List, label: "Movies", href: "/admin/movies" },
  { icon: PlusCircle, label: "Add Movie", href: "/admin/movies/new" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!getAdminSession()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    setAdminSession(false);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#1e1c19] border-r border-[#2e2b27] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-[#2e2b27]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-[#e8a020] flex items-center justify-center">
              <Film className="w-4 h-4 text-[#0f0e0e]" />
            </div>
            <div>
              <p className="font-display font-bold text-[#f0ece4] text-sm leading-tight"
                 style={{ fontFamily: "Fraunces, serif" }}>
                TopMoviesHub
              </p>
              <p className="text-[#8a8070] text-xs font-mono-grotesk">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-[#e8a020]/15 text-[#e8a020] border-l-2 border-[#e8a020]"
                    : "text-[#8a8070] hover:text-[#f0ece4] hover:bg-[#2e2b27]/50"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-[#2e2b27]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#8a8070] hover:text-[#c0392b] hover:bg-[#c0392b]/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#1e1c19]/90 backdrop-blur-sm border-b border-[#2e2b27] px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#8a8070] hover:text-[#f0ece4]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-[#8a8070] text-sm">
            <span className="font-mono-grotesk">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-[#8a8070] text-xs font-mono-grotesk">Logged in</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[#8a8070] text-xs hover:text-[#c0392b] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
