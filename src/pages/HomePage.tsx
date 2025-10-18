import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const HomePage: React.FC = () => {
  const { homePageContent, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';
  
  const headlineColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subheadlineColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const cta2Bg = theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300';
  const cta2Text = theme === 'dark' ? 'text-white' : 'text-gray-800';

  const finalHeadline = homePageContent.headline.replace(
    'class="text-amber-400"', 
    `style="color: ${siteConfig.primaryColor}"`
  );

  return (
    <div className="text-center">
      <div 
        className="absolute inset-0 -z-10 h-full w-full"
        style={siteConfig.homePageBackground ? { 
          backgroundImage: `url(${siteConfig.homePageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        } : {}}
      >
        {siteConfig.homePageBackground && <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/40'}`}></div>}
      </div>
      <main className="relative z-10">
          <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
              <h1 
                className={`text-5xl md:text-6xl font-extrabold ${headlineColor} leading-tight`}
                dangerouslySetInnerHTML={{ __html: finalHeadline }}
              >
              </h1>
              <p className={`mt-6 text-xl ${subheadlineColor} max-w-2xl mx-auto`}>
                  {homePageContent.subheadline}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link to="/about" className="bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {homePageContent.ctaButton1Text}
                  </Link>
                  <Link to="/projects" className={`${cta2Bg} ${cta2Text} font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}>
                      {homePageContent.ctaButton2Text}
                  </Link>
              </div>
          </div>
      </main>
    </div>
  );
};

export default HomePage;