import React from 'react';
import { useData } from '../contexts/DataContext';

const AboutPage: React.FC = () => {
  const { aboutPageContent, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const cardBgColor = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50';
  const accentColor = siteConfig.pageAccentColors?.about || '#3b82f6';

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-8 pb-4 border-b-2 ${borderColor}`} style={{ color: siteConfig.primaryColor }}>نبذة عن القسم</h1>
      <div className={`space-y-6 text-lg ${textColor} leading-relaxed`}>
        <p>
          {aboutPageContent.intro}
        </p>
        
        <div className={`${cardBgColor} p-6 rounded-lg border ${borderColor}`}>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>رؤيتنا</h2>
            <p>
                {aboutPageContent.vision}
            </p>
        </div>

        <div className={`${cardBgColor} p-6 rounded-lg border ${borderColor}`}>
            <h2 className="text-2xl font-semibold mb-3" style={{ color: accentColor }}>رسالتنا</h2>
            <p>
                {aboutPageContent.mission}
            </p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: accentColor }}>أهدافنا</h2>
            <ul className="list-disc list-inside space-y-2 pr-4">
              {aboutPageContent.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;