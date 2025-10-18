import React from 'react';
import { Link } from 'react-router-dom';
import type { StudentProject } from '../types';
import ImageSlider from '../components/ImageSlider';
import { useData } from '../contexts/DataContext';

const ProjectsPage: React.FC = () => {
  const { projects, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';
  const sliderImages = projects.map(p => ({ imageUrl: p.imageUrl, title: `${p.title} - ${p.studentName} (${p.year})` }));
  
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const cardTitleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div>
      <h1 className={`text-4xl font-bold text-amber-400 mb-4 pb-4 border-b-2 ${borderColor}`}>المشاريع الطلابية</h1>
      <p className={`text-lg ${textColor} mb-8`}>نظرة على إبداعات طلابنا ومشاريع تخرجهم المتميزة.</p>
      
      <div className="my-8 text-center">
        <Link 
            to="/submit-project" 
            className="inline-block bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
            هل لديك مشروع؟ قدمه الآن للمراجعة
        </Link>
      </div>

      {projects.length > 0 ? (
        <>
          <ImageSlider images={sliderImages} />

          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-blue-400 mb-6">قائمة المشاريع</h2>
            <div className="space-y-6">
                {projects.map((project) => (
                    <div key={project.id} className={`${cardBg} p-6 rounded-lg border ${borderColor} grid md:grid-cols-3 gap-6 items-center`}>
                        <div className="md:col-span-1">
                            <img src={project.imageUrl} alt={project.title} className="rounded-md w-full h-40 object-cover shadow-lg" />
                        </div>
                        <div className="md:col-span-2">
                            <h3 className={`text-xl font-bold ${cardTitleColor}`}>{project.title}</h3>
                            <p className="text-amber-400 my-1">{project.studentName} - {project.year}</p>
                            <p className={textColor}>{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <p className={`text-center ${textColor} text-lg`}>لا توجد مشاريع لعرضها حاليًا.</p>
      )}
    </div>
  );
};

export default ProjectsPage;
