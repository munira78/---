import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

const ProjectSubmissionPage: React.FC = () => {
  const { addPendingProject, siteConfig } = useData();
  const [formData, setFormData] = useState({
    title: '',
    studentName: '',
    year: new Date().getFullYear(),
    description: '',
    imageUrl: '',
    submitterName: '',
    submitterEmail: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const theme = siteConfig.theme || 'dark';

  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const formBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const inputBg = theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300';
  const inputText = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const labelClass = `block text-sm font-medium ${textColor} mb-1`;
  const submitButtonClass = "w-full bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('حجم الصورة كبير جداً. الحد الأقصى هو 2 ميجابايت.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.studentName || !formData.description || !formData.imageUrl || !formData.submitterName || !formData.submitterEmail) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        addPendingProject(formData);
        setIsLoading(false);
        setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className={`${formBg} p-8 rounded-lg border ${borderColor} text-center max-w-2xl mx-auto`}>
        <h1 className="text-3xl font-bold text-amber-400 mb-4">تم استلام مشروعك!</h1>
        <p className={`${textColor} text-lg`}>
          شكراً لك على تقديم مشروعك. سيقوم فريقنا بمراجعته وسيتم إضافته إلى الموقع بعد الموافقة عليه.
        </p>
        <Link to="/projects" className={`mt-8 inline-block ${submitButtonClass} w-auto`}>
          العودة إلى صفحة المشاريع
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className={`text-4xl font-bold text-amber-400 mb-8 pb-4 border-b-2 ${borderColor}`}>تقديم مشروع جديد</h1>
      <div className={`${formBg} p-8 rounded-lg border ${borderColor} max-w-3xl mx-auto`}>
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="submitterName" className={labelClass}>اسمك الكامل (مقدم الطلب)</label>
                    <input type="text" name="submitterName" id="submitterName" required value={formData.submitterName} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
                </div>
                 <div>
                    <label htmlFor="submitterEmail" className={labelClass}>بريدك الإلكتروني (للتواصل)</label>
                    <input type="email" name="submitterEmail" id="submitterEmail" required value={formData.submitterEmail} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
                </div>
              </div>

              <hr className={borderColor} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="title" className={labelClass}>عنوان المشروع</label>
                    <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
                </div>
                <div>
                    <label htmlFor="studentName" className={labelClass}>اسم الطالب/الطلاب</label>
                    <input type="text" name="studentName" id="studentName" required value={formData.studentName} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
                </div>
              </div>
              
              <div>
                <label htmlFor="year" className={labelClass}>سنة المشروع</label>
                <input type="number" name="year" id="year" required value={formData.year} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
              </div>

              <div>
                <label htmlFor="description" className={labelClass}>وصف المشروع</label>
                <textarea name="description" id="description" rows={5} required value={formData.description} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`}></textarea>
              </div>

              <div>
                <label className={labelClass}>صورة المشروع</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  required
                  onChange={handleFileChange} 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
                />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Project Preview" className={`mt-4 w-full max-w-xs h-auto object-cover rounded-lg border-2 ${borderColor}`} />}
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <button type="submit" disabled={isLoading} className={submitButtonClass}>
                  {isLoading ? 'جار الإرسال...' : 'إرسال المشروع للمراجعة'}
              </button>
          </form>
      </div>
    </div>
  );
};

export default ProjectSubmissionPage;
