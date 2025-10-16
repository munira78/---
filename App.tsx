// FIX: Removed file boundary markers that were causing compilation errors.
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FacultyPage from './pages/FacultyPage';
import CurriculumPage from './pages/CurriculumPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryLabsPage from './pages/GalleryLabsPage';
import LibraryPage from './pages/LibraryPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider, useData } from './contexts/DataContext';
import ProtectedRoute from './components/ProtectedRoute';

const ThemedApp: React.FC = () => {
  const { siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  const lightBgPattern = "bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]";
  const darkBgPattern = "bg-[radial-gradient(#22334f_1px,transparent_1px)] [background-size:24px_24px]";

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0A192F] text-gray-300' : 'bg-gray-50 text-gray-800'} min-h-screen flex flex-col relative overflow-hidden`}>
      <div className={`absolute inset-0 ${theme === 'dark' ? darkBgPattern : lightBgPattern} opacity-50`}></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryLabsPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <ThemedApp />
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
