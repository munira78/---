import React from 'react';
import type { NewsArticle } from '../types/index';
import { useData } from '../contexts/DataContext';

const NewsPage: React.FC = () => {
  const { news, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const cardBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const summaryColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const dateColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const accentColor = siteConfig.pageAccentColors?.news || '#3b82f6';

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-8 pb-4 border-b-2 ${borderColor}`} style={{ color: siteConfig.primaryColor }}>الأخبار والأنشطة</h1>
      {news.length > 0 ? (
        <div className="space-y-8">
          {news.map((article) => (
            <div 
              key={article.id} 
              className={`${cardBg} p-6 rounded-lg border-l-4 shadow-lg hover:border-amber-400 transition-colors duration-300 border ${borderColor}`}
              style={{ borderLeftColor: accentColor }}
            >
              {article.imageUrl ? (
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1">
                    <img src={article.imageUrl} alt={article.title} className="rounded-md w-full h-40 object-cover shadow-lg" />
                  </div>
                  <div className="md:col-span-2">
                    <span className={`text-sm ${dateColor}`}>{article.date}</span>
                    <h2 className={`text-2xl font-semibold ${titleColor} mt-2 mb-3`}>{article.title}</h2>
                    <p className={summaryColor}>{article.summary}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <span className={`text-sm ${dateColor}`}>{article.date}</span>
                  <h2 className={`text-2xl font-semibold ${titleColor} mt-2 mb-3`}>{article.title}</h2>
                  <p className={summaryColor}>{article.summary}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-center ${dateColor} text-lg`}>لا توجد أخبار أو أنشطة لعرضها حاليًا.</p>
      )}
    </div>
  );
};

export default NewsPage;