// FIX: Removed file boundary markers that were causing compilation errors.
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { siteConfig } = useData();
  const navigate = useNavigate();
  const theme = siteConfig.theme || 'dark';

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  }

  const navLinks = [
    { path: '/', label: 'الصفحة الرئيسية' },
    { path: '/about', label: 'نبذة عن القسم' },
    { path: '/faculty', label: 'أعضاء هيئة التدريس' },
    { path: '/curriculum', label: 'المناهج الدراسية' },
    { path: '/projects', label: 'المشاريع الطلابية' },
    { path: '/gallery', label: 'المعرض والمعامل' },
    { path: '/library', label: 'المكتبة' },
    { path: '/news', label: 'الأخبار والأنشطة' },
    { path: '/contact', label: 'تواصل معنا' },
  ];

  const activeLinkClass = 'text-amber-400 border-b-2 border-amber-400';
  const defaultLinkClass = `${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} hover:text-amber-400 transition-colors duration-300`;
  const headerBgClass = theme === 'dark' ? 'bg-slate-900/50 shadow-slate-900/50' : 'bg-white/50 shadow-gray-200/50';
  const mobileMenuBgClass = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  const mobileActiveBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const mobileDefaultText = theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';
  const logoTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <header className={`${headerBgClass} backdrop-blur-sm sticky top-0 z-50 shadow-md`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              {siteConfig.logoUrl && <img src={siteConfig.logoUrl} alt="Site Logo" className="h-10 w-10" />}
              <span className={`${logoTextColor} font-bold text-xl`}>{siteConfig.siteName}</span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {link.label}
                </NavLink>
              ))}
              {isAuthenticated ? (
                 <button onClick={handleLogout} className={`${defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>تسجيل الخروج</button>
              ) : (
                <NavLink to="/login" className={({ isActive }) => `${isActive ? activeLinkClass : defaultLinkClass} px-3 py-2 rounded-md text-sm font-medium`}>ادمن</NavLink>
              )}
            </div>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`${mobileMenuBgClass} md:hidden shadow-lg`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `${isActive ? `${mobileActiveBg} text-amber-400` : mobileDefaultText} block px-3 py-2 rounded-md text-base font-medium`}
              >
                {link.label}
              </NavLink>
            ))}
             {isAuthenticated ? (
                 <button onClick={handleLogout} className={`${mobileDefaultText} block w-full text-right px-3 py-2 rounded-md text-base font-medium`}>تسجيل الخروج</button>
              ) : (
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `${isActive ? `${mobileActiveBg} text-amber-400` : mobileDefaultText} block px-3 py-2 rounded-md text-base font-medium`}>ادمن</NavLink>
              )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
