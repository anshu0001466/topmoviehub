import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import { getCategories, saveCategories } from "@/lib/store";
import { Category } from "@/types/movie";

const ICONS = ["⚡", "🎭", "🔪", "👻", "🚀", "😂", "✨", "🎬", "🌊", "🏆", "💥", "🎯", "🌙", "🔥", "❤️", "🎪"];

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newCat, setNewCat] = useState({ name: "", slug: "", icon: "🎬", backdropUrl: "" });
  const [editCat, setEditCat] = useState({ name: "", slug: "", icon: "", backdropUrl: "" });

  const load = () => setCategories(getCategories());
  useEffect(() => { load(); }, []);

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleAdd = () => {
    if (!newCat.name.trim()) return;
    const cat: Category = {
      id: Date.now().toString(),
      name: newCat.name.trim(),
      slug: newCat.slug || slugify(newCat.name),
      icon: newCat.icon,
      backdropUrl: newCat.backdropUrl || undefined,
    };
    const updated = [...categories, cat];
    saveCategories(updated);
    setCategories(updated);
    setNewCat({ name: "", slug: "", icon: "🎬", backdropUrl: "" });
    setAdding(false);
  };

  const handleEdit = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const updated = categories.map((c) =>
      c.id === id ? { ...c, name: editCat.name, slug: editCat.slug, icon: editCat.icon, backdropUrl: editCat.backdropUrl || undefined } : c
    );
    saveCategories(updated);
    setCategories(updated);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);
    setCategories(updated);
    setDeleteConfirm(null);
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditCat({ name: cat.name, slug: cat.slug, icon: cat.icon, backdropUrl: cat.backdropUrl || "" });
  };

  const inputCls = "px-3 py-2 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020] transition-all";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#f0ece4]"
              style={{ fontFamily: "Fraunces, serif" }}>
            Categories
          </h1>
          <p className="text-[#8a8070] text-sm">{categories.length} genres configured</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm rounded-sm hover:bg-[#f0b030] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="bg-[#1a1917] border-t-2 border-[#e8a020] border-x border-b border-x-[#2e2b27] border-b-[#2e2b27] rounded-xl p-6">
          <h2 className="font-display text-lg font-bold text-[#f0ece4] mb-4"
              style={{ fontFamily: "Fraunces, serif" }}>
            New Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              value={newCat.name}
              onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value, slug: slugify(e.target.value) }))}
              className={inputCls}
              placeholder="Category name"
            />
            <input
              value={newCat.slug}
              onChange={(e) => setNewCat((p) => ({ ...p, slug: e.target.value }))}
              className={inputCls}
              placeholder="category-slug"
            />
            <input
              value={newCat.backdropUrl}
              onChange={(e) => setNewCat((p) => ({ ...p, backdropUrl: e.target.value }))}
              className={`${inputCls} sm:col-span-2`}
              placeholder="Backdrop image URL (optional)"
            />
          </div>
          <div className="mb-4">
            <p className="text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">Icon</p>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setNewCat((p) => ({ ...p, icon }))}
                  className={`w-10 h-10 text-xl rounded-lg transition-all ${
                    newCat.icon === icon
                      ? "bg-[#e8a020]/20 border-2 border-[#e8a020] scale-110"
                      : "bg-[#0f0e0e] border border-[#2e2b27] hover:border-[#e8a020]/40"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAdding(false)} className="px-4 py-2 border border-[#2e2b27] text-[#8a8070] text-sm rounded-sm hover:border-[#8a8070] transition-colors">
              Cancel
            </button>
            <button onClick={handleAdd} className="px-6 py-2 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm rounded-sm hover:bg-[#f0b030] transition-colors">
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-[#1a1917] border border-[#2e2b27] rounded-xl overflow-hidden">
        <div className="divide-y divide-[#2e2b27]">
          {categories.map((cat) => (
            <div key={cat.id} className="px-5 py-4">
              {editingId === cat.id ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    value={editCat.name}
                    onChange={(e) => setEditCat((p) => ({ ...p, name: e.target.value }))}
                    className={inputCls}
                    placeholder="Name"
                  />
                  <input
                    value={editCat.slug}
                    onChange={(e) => setEditCat((p) => ({ ...p, slug: e.target.value }))}
                    className={inputCls}
                    placeholder="Slug"
                  />
                  <input
                    value={editCat.backdropUrl}
                    onChange={(e) => setEditCat((p) => ({ ...p, backdropUrl: e.target.value }))}
                    className={inputCls}
                    placeholder="Backdrop URL"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(cat.id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm rounded-sm">
                      <Check className="w-3.5 h-3.5" /> Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 border border-[#2e2b27] text-[#8a8070] rounded-sm hover:border-[#8a8070]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1">
                    <p className="text-[#f0ece4] font-medium">{cat.name}</p>
                    <p className="text-[#8a8070] text-xs font-mono-grotesk">/{cat.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(cat)} className="p-1.5 text-[#8a8070] hover:text-[#e8a020] hover:bg-[#e8a020]/10 rounded transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(cat.id)} className="p-1.5 text-[#8a8070] hover:text-[#c0392b] hover:bg-[#c0392b]/10 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Delete modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1e1c19] border border-[#2e2b27] rounded-xl p-8 max-w-sm w-full">
            <h3 className="font-display text-xl font-bold text-[#f0ece4] text-center mb-2"
                style={{ fontFamily: "Fraunces, serif" }}>
              Delete Category?
            </h3>
            <p className="text-[#8a8070] text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-[#2e2b27] text-[#f0ece4] text-sm rounded-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-[#c0392b] text-white text-sm font-bold rounded-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
