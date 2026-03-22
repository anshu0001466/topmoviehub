import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/admin/AdminLayout";

const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMovieList = lazy(() => import("./pages/admin/AdminMovieList"));
const AdminMovieForm = lazy(() => import("./pages/admin/AdminMovieForm"));
const AdminCategories = lazy(() => import("./pages/admin/AdminCategories"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const TermsPage = lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.PrivacyPage })));
const DMCAPage = lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.DMCAPage })));
const ContactPage = lazy(() => import("./pages/StaticPages").then((m) => ({ default: m.ContactPage })));

const Spinner = () => (
  <div className="min-h-screen bg-[#0f0e0e] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#e8a020] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:slug" element={<MovieDetailPage />} />
        <Route path="/movie/:slug/download" element={<DownloadPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:slug" element={<CategoriesPage />} />

        {/* Legal */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/dmca" element={<DMCAPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        {/* Redirect /admin to /admin/login */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Admin Protected Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="movies" element={<AdminMovieList />} />
          <Route path="movies/new" element={<AdminMovieForm />} />
          <Route path="movies/edit/:id" element={<AdminMovieForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
