import React from 'react';
import type { FacultyMember } from '../types/index';
import { useData } from '../contexts/DataContext';

const FacultyCard: React.FC<{ member: FacultyMember }> = ({ member }) => {
    const { siteConfig } = useData();
    const theme = siteConfig.theme || 'dark';

    const cardBg = theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200';
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    
    return (
        <div className={`${cardBg} rounded-lg overflow-hidden border text-center shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-amber-400/20`}>
            <img className="w-full h-56 object-cover object-center" src={member.imageUrl} alt={member.name} />
            <div className="p-6">
                <h3 className={`text-xl font-bold ${textColor}`}>{member.name}</h3>
                <p className="mt-1" style={{ color: siteConfig.primaryColor }}>{member.title}</p>
            </div>
        </div>
    );
};


const FacultyPage: React.FC = () => {
  const { faculty, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';


  return (
    <div>
      <h1 className={`text-4xl font-bold mb-8 pb-4 border-b-2 ${borderColor}`} style={{ color: siteConfig.primaryColor }}>أعضاء هيئة التدريس</h1>
      {faculty.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {faculty.map(member => (
            <FacultyCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <p className={`text-center ${textColor} text-lg`}>لا يوجد أعضاء هيئة تدريس لعرضهم حاليًا.</p>
      )}
    </div>
  );
};

export default FacultyPage;