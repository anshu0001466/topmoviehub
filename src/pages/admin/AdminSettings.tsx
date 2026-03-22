import { useEffect, useState } from "react";
import { Save, Check } from "lucide-react";
import { getSettings, saveSettings, getMovies } from "@/lib/store";
import { SiteSettings } from "@/types/movie";

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: "",
    metaDescription: "",
    featuredMovieId: "",
    heroMovieId: "",
  });
  const [movies, setMovies] = useState<{ id: string; title: string }[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    setMovies(getMovies().map((m) => ({ id: m.id, title: m.title })));
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full px-4 py-3 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020] focus:ring-1 focus:ring-[#e8a020]/20 transition-all";
  const labelCls = "block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#f0ece4]"
            style={{ fontFamily: "Fraunces, serif" }}>
          Settings
        </h1>
        <p className="text-[#8a8070] text-sm">Configure your site-wide settings and featured content.</p>
      </div>

      {/* Site Settings */}
      <div className="bg-[#1a1917] border-t-2 border-[#e8a020] border-x border-b border-x-[#2e2b27] border-b-[#2e2b27] rounded-xl p-6 space-y-5">
        <h2 className="font-display text-lg font-bold text-[#f0ece4]"
            style={{ fontFamily: "Fraunces, serif" }}>
          Site Identity
        </h2>
        <div>
          <label className={labelCls}>Site Title</label>
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => setSettings((p) => ({ ...p, siteTitle: e.target.value }))}
            className={inputCls}
            placeholder="TopMoviesHub"
          />
        </div>
        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea
            value={settings.metaDescription}
            onChange={(e) => setSettings((p) => ({ ...p, metaDescription: e.target.value }))}
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="Your site meta description for SEO..."
          />
        </div>
      </div>

      {/* Featured Content */}
      <div className="bg-[#1a1917] border-t-2 border-[#e8a020] border-x border-b border-x-[#2e2b27] border-b-[#2e2b27] rounded-xl p-6 space-y-5">
        <h2 className="font-display text-lg font-bold text-[#f0ece4]"
            style={{ fontFamily: "Fraunces, serif" }}>
          Featured Content
        </h2>
        <div>
          <label className={labelCls}>Hero Movie (Homepage Spotlight)</label>
          <select
            value={settings.heroMovieId}
            onChange={(e) => setSettings((p) => ({ ...p, heroMovieId: e.target.value }))}
            className={`${inputCls}`}
          >
            <option value="">Select a movie...</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Featured Movie (Spotlight Section)</label>
          <select
            value={settings.featuredMovieId}
            onChange={(e) => setSettings((p) => ({ ...p, featuredMovieId: e.target.value }))}
            className={`${inputCls}`}
          >
            <option value="">Select a movie...</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-8 py-3.5 font-bold text-sm rounded-sm transition-all ${
          saved
            ? "bg-green-500 text-white"
            : "bg-[#e8a020] text-[#0f0e0e] hover:bg-[#f0b030] amber-glow"
        }`}
      >
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? "Settings Saved!" : "Save Settings"}
      </button>
    </div>
  );
}
