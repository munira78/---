import React from 'react';
import { useData } from '../contexts/DataContext';

const CurriculumPage: React.FC = () => {
  const { curriculumContent, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const introColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const tableContainerBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const tableHeaderBg = theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100';
  const tableHeaderText = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const tableRowBg = theme === 'dark' ? 'bg-slate-800/30' : 'bg-gray-50';
  const tableCellText = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const accentColor = siteConfig.pageAccentColors?.curriculum || '#3b82f6';

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-8 pb-4 border-b-2 ${borderColor}`} style={{ color: siteConfig.primaryColor }}>المناهج الدراسية</h1>
      <p className={`text-lg ${introColor} mb-10`}>
        {curriculumContent.intro}
      </p>

      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: accentColor }}>السنة الأولى</h2>
          <div className={`overflow-x-auto ${tableContainerBg} rounded-lg border ${borderColor}`}>
            <table className="w-full text-right">
              <thead className={tableHeaderBg}>
                <tr>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>رمز المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>اسم المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>عدد الساعات</th>
                </tr>
              </thead>
              <tbody>
                {curriculumContent.year1.map((course, index) => (
                  <tr key={course.id} className={`border-t ${borderColor} ${index % 2 === 0 ? tableRowBg : ''}`}>
                    <td className={`p-4 ${tableCellText}`}>{course.code}</td>
                    <td className="p-4 font-semibold" style={{ color: siteConfig.primaryColor }}>{course.name}</td>
                    <td className={`p-4 ${tableCellText}`}>{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: accentColor }}>السنة الثانية</h2>
           <div className={`overflow-x-auto ${tableContainerBg} rounded-lg border ${borderColor}`}>
            <table className="w-full text-right">
              <thead className={tableHeaderBg}>
                <tr>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>رمز المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>اسم المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>عدد الساعات</th>
                </tr>
              </thead>
              <tbody>
                {curriculumContent.year2.map((course, index) => (
                   <tr key={course.id} className={`border-t ${borderColor} ${index % 2 === 0 ? tableRowBg : ''}`}>
                    <td className={`p-4 ${tableCellText}`}>{course.code}</td>
                    <td className="p-4 font-semibold" style={{ color: siteConfig.primaryColor }}>{course.name}</td>
                    <td className={`p-4 ${tableCellText}`}>{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: accentColor }}>السنة الثالثة</h2>
           <div className={`overflow-x-auto ${tableContainerBg} rounded-lg border ${borderColor}`}>
            <table className="w-full text-right">
              <thead className={tableHeaderBg}>
                <tr>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>رمز المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>اسم المادة</th>
                  <th className={`p-4 font-semibold ${tableHeaderText}`}>عدد الساعات</th>
                </tr>
              </thead>
              <tbody>
                {curriculumContent.year3.length > 0 ? curriculumContent.year3.map((course, index) => (
                   <tr key={course.id} className={`border-t ${borderColor} ${index % 2 === 0 ? tableRowBg : ''}`}>
                    <td className={`p-4 ${tableCellText}`}>{course.code}</td>
                    <td className="p-4 font-semibold" style={{ color: siteConfig.primaryColor }}>{course.name}</td>
                    <td className={`p-4 ${tableCellText}`}>{course.credits}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className={`p-4 text-center ${introColor}`}>لا توجد مواد دراسية لهذه السنة حاليًا.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CurriculumPage;