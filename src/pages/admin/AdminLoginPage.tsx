import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Film } from "lucide-react";
import { getAdminSession, setAdminSession } from "@/lib/store";

const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getAdminSession()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAdminSession(true);
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0e] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-[#e8a020] flex items-center justify-center mx-auto mb-6">
            <Film className="w-8 h-8 text-[#0f0e0e]" />
          </div>
          <h1
            className="font-display text-4xl font-bold text-[#f0ece4] mb-2"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Admin Access
          </h1>
          <p className="text-[#8a8070] text-sm">Enter your password to access the dashboard</p>
        </div>

        <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a8070]" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020] focus:ring-1 focus:ring-[#e8a020]/30 transition-all"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8070] hover:text-[#f0ece4]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-[#c0392b] text-xs mt-2 font-mono-grotesk">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#e8a020] text-[#0f0e0e] font-bold rounded-lg hover:bg-[#f0b030] transition-all amber-glow"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-[#8a8070] text-xs mt-6 font-mono-grotesk">
            Default password: <code className="text-[#e8a020]">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
