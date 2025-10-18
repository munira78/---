// FIX: Removed file boundary markers that were causing compilation errors.
import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  FacultyMember, 
  StudentProject, 
  NewsArticle, 
  GalleryImage,
  Book,
  HomePageContent,
  AboutPageContent,
  CurriculumContent,
  ContactInfo,
  SiteConfig,
  Course,
  QuickLink,
  ReviewableProject,
} from '../types';

const AdminPage: React.FC = () => {
  const { 
    faculty, addFaculty, updateFaculty, deleteFaculty,
    projects, addProject, updateProject, deleteProject,
    pendingProjects, approveProject, rejectProject,
    news, addNews, updateNews, deleteNews,
    gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage,
    books, addBook, updateBook, deleteBook,
    homePageContent, updateHomePageContent,
    aboutPageContent, updateAboutPageContent,
    curriculumContent, updateCurriculumContent,
    contactInfo, updateContactInfo,
    siteConfig, updateSiteConfig,
  } = useData();

  const [activeTab, setActiveTab] = useState('reviewProjects');
  const [showSuccess, setShowSuccess] = useState(false);
  // FIX: Add state for success message text and update displaySuccessMessage to accept a custom message
  const [successMessage, setSuccessMessage] = useState('تم حفظ التغييرات بنجاح!');
  
  // --- Form States ---
  const [facultyForm, setFacultyForm] = useState<Omit<FacultyMember, 'id'>>({ name: '', title: '', imageUrl: '' });
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);

  const [projectForm, setProjectForm] = useState<Omit<StudentProject, 'id'>>({ title: '', studentName: '', year: new Date().getFullYear(), description: '', imageUrl: '' });
  const [editingProject, setEditingProject] = useState<StudentProject | null>(null);

  const [newsForm, setNewsForm] = useState<Omit<NewsArticle, 'id'>>({ title: '', date: '', summary: '', imageUrl: '' });
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);

  const [galleryForm, setGalleryForm] = useState<Omit<GalleryImage, 'id'>>({ imageUrl: '', title: '', category: 'gallery' });
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null);
  
  const [bookForm, setBookForm] = useState<Omit<Book, 'id'>>({ title: '', author: '', description: '', coverImageUrl: '', fileUrl: '' });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [homeForm, setHomeForm] = useState<HomePageContent>(homePageContent);
  const [aboutForm, setAboutForm] = useState({ ...aboutPageContent, goals: aboutPageContent.goals.join('\n') });
  const [curriculumForm, setCurriculumForm] = useState<CurriculumContent>(curriculumContent);
  const [contactForm, setContactForm] = useState<ContactInfo>(contactInfo);
  const [configForm, setConfigForm] = useState<SiteConfig>(siteConfig);

  useEffect(() => { setHomeForm(homePageContent) }, [homePageContent]);
  useEffect(() => { setAboutForm({ ...aboutPageContent, goals: aboutPageContent.goals.join('\n') }) }, [aboutPageContent]);
  useEffect(() => { setCurriculumForm(curriculumContent) }, [curriculumContent]);
  useEffect(() => { setContactForm(contactInfo) }, [contactInfo]);
  useEffect(() => { setConfigForm(siteConfig) }, [siteConfig]);

  const theme = siteConfig.theme || 'dark';

  const displaySuccessMessage = (message: string = 'تم حفظ التغييرات بنجاح!') => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
    fieldName: string = 'imageUrl',
    maxSizeMB: number = 2
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`حجم الملف كبير جداً. الحد الأقصى هو ${maxSizeMB} ميجابايت.`);
        e.target.value = ''; // Reset file input
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter((prevState: any) => ({ ...prevState, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Handlers ---
  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyForm.imageUrl) {
        alert('يرجى تحميل صورة لعضو هيئة التدريس.');
        return;
    }
    if (editingFaculty) {
      updateFaculty({ ...editingFaculty, ...facultyForm });
      setEditingFaculty(null);
    } else {
      addFaculty(facultyForm);
    }
    setFacultyForm({ name: '', title: '', imageUrl: '' });
    displaySuccessMessage();
  };
  const editFaculty = (member: FacultyMember) => { setEditingFaculty(member); setFacultyForm(member); };
  const cancelEditFaculty = () => { setEditingFaculty(null); setFacultyForm({ name: '', title: '', imageUrl: '' }); };

  const handleProjectSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    if (!projectForm.imageUrl) {
        alert('يرجى تحميل صورة للمشروع.');
        return;
    }
    if (editingProject) { 
      updateProject({ ...editingProject, ...projectForm }); 
      setEditingProject(null); 
    } else { 
      addProject(projectForm); 
    } 
    setProjectForm({ title: '', studentName: '', year: new Date().getFullYear(), description: '', imageUrl: '' }); 
    displaySuccessMessage(); 
  };
  const editProject = (project: StudentProject) => { setEditingProject(project); setProjectForm(project); };
  const cancelEditProject = () => { setEditingProject(null); setProjectForm({ title: '', studentName: '', year: new Date().getFullYear(), description: '', imageUrl: '' }); };

  const handleNewsSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    const date = newsForm.date || new Date().toISOString().split('T')[0]; 
    if (editingNews) { 
      updateNews({ ...editingNews, ...newsForm, date }); 
      setEditingNews(null); 
    } else { 
      addNews({ ...newsForm, date }); 
    } 
    setNewsForm({ title: '', date: '', summary: '', imageUrl: '' }); 
    displaySuccessMessage(); 
  };
  const editNews = (article: NewsArticle) => { setEditingNews(article); setNewsForm(article); };
  const cancelEditNews = () => { setEditingNews(null); setNewsForm({ title: '', date: '', summary: '', imageUrl: '' }); };

  const handleGallerySubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!galleryForm.imageUrl) {
        alert('يرجى تحميل صورة.');
        return;
    }
    if (editingGallery) { 
      updateGalleryImage({ ...editingGallery, ...galleryForm }); 
      setEditingGallery(null); 
    } else { 
      addGalleryImage(galleryForm); 
    } 
    setGalleryForm({ imageUrl: '', title: '', category: 'gallery' }); 
    displaySuccessMessage(); 
  };
  const editGallery = (image: GalleryImage) => { setEditingGallery(image); setGalleryForm(image); };
  const cancelEditGallery = () => { setEditingGallery(null); setGalleryForm({ imageUrl: '', title: '', category: 'gallery' }); };
  
  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.coverImageUrl || !bookForm.fileUrl) {
        alert('يرجى تحميل صورة الغلاف وملف الكتاب.');
        return;
    }
    if (editingBook) {
      updateBook({ ...editingBook, ...bookForm });
      setEditingBook(null);
    } else {
      addBook(bookForm);
    }
    setBookForm({ title: '', author: '', description: '', coverImageUrl: '', fileUrl: '' });
    displaySuccessMessage();
  };
  const editBook = (book: Book) => { setEditingBook(book); setBookForm(book); };
  const cancelEditBook = () => { setEditingBook(null); setBookForm({ title: '', author: '', description: '', coverImageUrl: '', fileUrl: '' }); };

  const handleHomeSubmit = (e: React.FormEvent) => { e.preventDefault(); updateHomePageContent(homeForm); displaySuccessMessage(); };
  const handleAboutSubmit = (e: React.FormEvent) => { e.preventDefault(); updateAboutPageContent({ ...aboutForm, goals: aboutForm.goals.split('\n').filter(g => g) }); displaySuccessMessage(); };
  const handleCurriculumSubmit = (e: React.FormEvent) => { e.preventDefault(); updateCurriculumContent(curriculumForm); displaySuccessMessage(); };
  const handleContactSubmit = (e: React.FormEvent) => { e.preventDefault(); updateContactInfo(contactForm); displaySuccessMessage(); };
  const handleConfigSubmit = (e: React.FormEvent) => { e.preventDefault(); updateSiteConfig(configForm); displaySuccessMessage(); };

  // --- Curriculum Dynamic Form Handlers ---
  const handleCourseChange = (year: 'year1' | 'year2' | 'year3', index: number, field: keyof Course, value: string | number) => {
    const updatedCourses = [...curriculumForm[year]];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setCurriculumForm({ ...curriculumForm, [year]: updatedCourses });
  };
  const addCourse = (year: 'year1' | 'year2' | 'year3') => {
    const newCourse: Course = { id: Date.now().toString(), code: '', name: '', credits: 0 };
    setCurriculumForm({ ...curriculumForm, [year]: [...curriculumForm[year], newCourse] });
  };
  const removeCourse = (year: 'year1' | 'year2' | 'year3', id: string) => {
    setCurriculumForm({ ...curriculumForm, [year]: curriculumForm[year].filter(c => c.id !== id) });
  };

  // --- Quick Links Handlers ---
  const handleQuickLinkChange = (id: string, field: 'label' | 'url', value: string) => {
    setConfigForm(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map(link => link.id === id ? { ...link, [field]: value } : link)
    }));
  };
  const addQuickLink = () => {
    const newLink: QuickLink = { id: Date.now().toString(), label: '', url: '' };
    setConfigForm(prev => ({ ...prev, quickLinks: [...prev.quickLinks, newLink] }));
  };
  const removeQuickLink = (id: string) => {
    setConfigForm(prev => ({ ...prev, quickLinks: prev.quickLinks.filter(link => link.id !== id) }));
  };
  
  // --- Common Themed Classes ---
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-300';
  const headingColor = theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const textWhiteColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputClass = `w-full p-2 rounded border focus:ring-amber-500 focus:border-amber-500 ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`;
  const labelClass = `block text-sm font-medium ${textColor} mb-1`;
  const sectionClass = `p-6 rounded-lg border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'}`;
  const tabTextColor = theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800';

  // --- Render Functions ---
  const renderSiteConfigSection = () => (
    <form onSubmit={handleConfigSubmit} className="space-y-8">
      {/* General Settings */}
      <div className={`${sectionClass} space-y-4`}>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">إعدادات الهوية والتصميم</h2>
        <div>
          <label className={labelClass}>اسم الموقع (يظهر في الهيدر والفوتر)</label>
          <input value={configForm.siteName} onChange={(e) => setConfigForm({...configForm, siteName: e.target.value})} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>مظهر الموقع</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="theme" value="dark" checked={configForm.theme === 'dark'} onChange={() => setConfigForm({...configForm, theme: 'dark'})} className="form-radio text-amber-500 focus:ring-amber-500"/>
              <span className={textColor}>الوضع الليلي</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="theme" value="light" checked={configForm.theme === 'light'} onChange={() => setConfigForm({...configForm, theme: 'light'})} className="form-radio text-amber-500 focus:ring-amber-500"/>
              <span className={textColor}>الوضع النهاري</span>
            </label>
          </div>
        </div>
         <div>
          <label className={labelClass}>لون كتابة المواد الدراسية</label>
          <div className="flex items-center gap-2">
            <input type="color" value={configForm.curriculumCourseColor} onChange={(e) => setConfigForm({...configForm, curriculumCourseColor: e.target.value})} className="h-10 w-10 p-1 bg-transparent border border-gray-400 rounded-lg cursor-pointer"/>
            <span className={textColor}>{configForm.curriculumCourseColor}</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>تحميل شعار الموقع</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setConfigForm, 'logoUrl')} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {configForm.logoUrl && <img src={configForm.logoUrl} alt="Logo Preview" className={`mt-4 w-24 h-24 object-contain rounded-lg border-2 p-2 ${borderColor} ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`} />}
        </div>
        <div>
          <label className={labelClass}>صورة خلفية للصفحة الرئيسية</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setConfigForm, 'homePageBackground')} 
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {configForm.homePageBackground && <img src={configForm.homePageBackground} alt="Preview" className={`mt-4 w-48 h-32 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
      </div>
       {/* Quick Links */}
       <div className={`${sectionClass} space-y-4`}>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">روابط سريعة (Footer)</h2>
        <div className="space-y-2">
          {configForm.quickLinks.map(link => (
            <div key={link.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <input value={link.label} onChange={e => handleQuickLinkChange(link.id, 'label', e.target.value)} placeholder="النص" className={`${inputClass} sm:col-span-5`} />
              <input value={link.url} onChange={e => handleQuickLinkChange(link.id, 'url', e.target.value)} placeholder="الرابط" className={`${inputClass} sm:col-span-5`} />
              <button type="button" onClick={() => removeQuickLink(link.id)} className="sm:col-span-2 bg-red-600 text-white p-2 rounded hover:bg-red-500">حذف</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addQuickLink} className="mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">إضافة رابط</button>
      </div>

      {/* Social Links */}
      <div className={`${sectionClass} space-y-4`}>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">روابط التواصل الاجتماعي (Footer)</h2>
        <div>
          <label className={labelClass}>رابط فيسبوك</label>
          <input value={configForm.socialLinks.facebook} onChange={(e) => setConfigForm({...configForm, socialLinks: {...configForm.socialLinks, facebook: e.target.value}})} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>رابط تويتر</label>
          <input value={configForm.socialLinks.twitter} onChange={(e) => setConfigForm({...configForm, socialLinks: {...configForm.socialLinks, twitter: e.target.value}})} className={inputClass} />
        </div>
      </div>

      <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">حفظ كل التغييرات</button>
    </form>
  );

  const renderHomePageSection = () => (
    <form onSubmit={handleHomeSubmit} className={`${sectionClass} space-y-4`}>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">تعديل الصفحة الرئيسية</h2>
      <div>
        <label className={labelClass}>العنوان الرئيسي (يمكن استخدام HTML)</label>
        <textarea value={homeForm.headline} onChange={(e) => setHomeForm({...homeForm, headline: e.target.value})} rows={3} className={`${inputClass} font-mono`} />
      </div>
      <div>
        <label className={labelClass}>النص الفرعي</label>
        <textarea value={homeForm.subheadline} onChange={(e) => setHomeForm({...homeForm, subheadline: e.target.value})} rows={4} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>نص الزر الأول</label>
        <input value={homeForm.ctaButton1Text} onChange={(e) => setHomeForm({...homeForm, ctaButton1Text: e.target.value})} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>نص الزر الثاني</label>
        <input value={homeForm.ctaButton2Text} onChange={(e) => setHomeForm({...homeForm, ctaButton2Text: e.target.value})} className={inputClass} />
      </div>
      <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">حفظ التغييرات</button>
    </form>
  );

  const renderAboutPageSection = () => (
    <form onSubmit={handleAboutSubmit} className={`${sectionClass} space-y-4`}>
       <h2 className="text-2xl font-semibold text-blue-400 mb-4">تعديل نبذة عن القسم</h2>
       <div><label className={labelClass}>المقدمة</label><textarea value={aboutForm.intro} onChange={(e) => setAboutForm({...aboutForm, intro: e.target.value})} rows={5} className={inputClass} /></div>
       <div><label className={labelClass}>رؤيتنا</label><textarea value={aboutForm.vision} onChange={(e) => setAboutForm({...aboutForm, vision: e.target.value})} rows={3} className={inputClass} /></div>
       <div><label className={labelClass}>رسالتنا</label><textarea value={aboutForm.mission} onChange={(e) => setAboutForm({...aboutForm, mission: e.target.value})} rows={3} className={inputClass} /></div>
       <div><label className={labelClass}>أهدافنا (كل هدف في سطر)</label><textarea value={aboutForm.goals} onChange={(e) => setAboutForm({...aboutForm, goals: e.target.value})} rows={6} className={inputClass} /></div>
       <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">حفظ التغييرات</button>
    </form>
  );

  const renderCurriculumSection = () => (
    <form onSubmit={handleCurriculumSubmit} className={`${sectionClass} space-y-6`}>
       <h2 className="text-2xl font-semibold text-blue-400 mb-4">تعديل المناهج الدراسية</h2>
       <div><label className={labelClass}>مقدمة المناهج</label><textarea value={curriculumForm.intro} onChange={(e) => setCurriculumForm({...curriculumForm, intro: e.target.value})} rows={4} className={inputClass} /></div>
       
       { (['year1', 'year2', 'year3'] as const).map(year => {
         const yearTitle = year === 'year1' ? 'السنة الأولى' : year === 'year2' ? 'السنة الثانية' : 'السنة الثالثة';
         return (
          <div key={year}>
            <h3 className={`text-xl ${textWhiteColor} font-bold mb-3`}>{yearTitle}</h3>
            <div className="space-y-2">
            {curriculumForm[year].map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <input value={course.code} onChange={e => handleCourseChange(year, index, 'code', e.target.value)} placeholder="الرمز" className={`${inputClass} sm:col-span-2`} />
                <input value={course.name} onChange={e => handleCourseChange(year, index, 'name', e.target.value)} placeholder="اسم المادة" className={`${inputClass} sm:col-span-6`} />
                <input type="number" value={course.credits} onChange={e => handleCourseChange(year, index, 'credits', parseInt(e.target.value) || 0)} placeholder="الساعات" className={`${inputClass} sm:col-span-2`} />
                <button type="button" onClick={() => removeCourse(year, course.id)} className="sm:col-span-2 bg-red-600 text-white p-2 rounded hover:bg-red-500">حذف</button>
              </div>
            ))}
            </div>
            <button type="button" onClick={() => addCourse(year)} className="mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400">إضافة مادة لـ {yearTitle}</button>
          </div>
         )
       })}

       <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">حفظ تغييرات المنهج</button>
    </form>
  );

  const renderContactSection = () => (
     <form onSubmit={handleContactSubmit} className={`${sectionClass} space-y-4`}>
       <h2 className="text-2xl font-semibold text-blue-400 mb-4">تعديل معلومات التواصل</h2>
       <div><label className={labelClass}>العنوان</label><input value={contactForm.address} onChange={(e) => setContactForm({...contactForm, address: e.target.value})} className={inputClass} /></div>
       <div><label className={labelClass}>البريد الإلكتروني</label><input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} className={inputClass} /></div>
       <div><label className={labelClass}>الهاتف</label><input value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} className={inputClass} /></div>
       <div><label className={labelClass}>أوقات الدوام</label><input value={contactForm.workHours} onChange={(e) => setContactForm({...contactForm, workHours: e.target.value})} className={inputClass} /></div>
       <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">حفظ التغييرات</button>
    </form>
  );

  const renderFacultySection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">إدارة أعضاء هيئة التدريس</h2>
      <form onSubmit={handleFacultySubmit} className={`${sectionClass} mb-8 space-y-4`}>
        <h3 className={`text-xl ${textWhiteColor} font-bold`}>{editingFaculty ? 'تعديل عضو' : 'إضافة عضو جديد'}</h3>
        <input name="name" value={facultyForm.name} onChange={(e) => setFacultyForm({...facultyForm, name: e.target.value})} placeholder="الاسم" required className={inputClass} />
        <input name="title" value={facultyForm.title} onChange={(e) => setFacultyForm({...facultyForm, title: e.target.value})} placeholder="المنصب" required className={inputClass} />
        <div>
          <label className={labelClass}>صورة العضو</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setFacultyForm, 'imageUrl', 2)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {facultyForm.imageUrl && <img src={facultyForm.imageUrl} alt="Preview" className={`mt-4 w-32 h-32 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">{editingFaculty ? 'حفظ التغييرات' : 'إضافة'}</button>
          {editingFaculty && <button type="button" onClick={cancelEditFaculty} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400">إلغاء</button>}
        </div>
      </form>
      <div className="space-y-4">
        {faculty.map(member => (
          <div key={member.id} className={`${sectionClass} flex justify-between items-center`}>
            <div className="flex items-center gap-4">
              <img src={member.imageUrl} alt={member.name} className={`w-16 h-16 rounded-full object-cover border-2 ${borderColor}`}/>
              <div>
                <p className={`font-bold ${textWhiteColor}`}>{member.name}</p>
                <p className="text-amber-400">{member.title}</p>
              </div>
            </div>
            <div className="flex gap-2"><button onClick={() => editFaculty(member)} className="bg-blue-500 py-1 px-3 rounded text-white">تعديل</button><button onClick={() => deleteFaculty(member.id)} className="bg-red-500 py-1 px-3 rounded text-white">حذف</button></div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderProjectsSection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">إدارة المشاريع الطلابية</h2>
      <form onSubmit={handleProjectSubmit} className={`${sectionClass} mb-8 space-y-4`}>
        <h3 className={`text-xl ${textWhiteColor} font-bold`}>{editingProject ? 'تعديل مشروع' : 'إضافة مشروع جديد'}</h3>
        <input name="title" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} placeholder="عنوان المشروع" required className={inputClass} />
        <input name="studentName" value={projectForm.studentName} onChange={(e) => setProjectForm({...projectForm, studentName: e.target.value})} placeholder="اسم الطالب" required className={inputClass} />
        <input name="year" type="number" value={projectForm.year} onChange={(e) => setProjectForm({...projectForm, year: parseInt(e.target.value) || 0})} placeholder="السنة" required className={inputClass} />
        <textarea name="description" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} placeholder="وصف المشروع" required className={`${inputClass} h-24`}></textarea>
        <div>
          <label className={labelClass}>صورة المشروع</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setProjectForm, 'imageUrl', 2)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {projectForm.imageUrl && <img src={projectForm.imageUrl} alt="Preview" className={`mt-4 w-48 h-32 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
        <div className="flex gap-4"><button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">{editingProject ? 'حفظ التغييرات' : 'إضافة'}</button>{editingProject && <button type="button" onClick={cancelEditProject} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400">إلغاء</button>}</div>
      </form>
      <div className="space-y-4">{projects.map(p => (<div key={p.id} className={`${sectionClass} flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <img src={p.imageUrl} alt={p.title} className={`w-24 h-16 object-cover rounded border-2 ${borderColor}`}/>
          <div>
            <p className={`font-bold ${textWhiteColor}`}>{p.title}</p>
            <p className="text-amber-400">{p.studentName} - {p.year}</p>
          </div>
        </div>
        <div className="flex gap-2"><button onClick={() => editProject(p)} className="bg-blue-500 py-1 px-3 rounded text-white">تعديل</button><button onClick={() => deleteProject(p.id)} className="bg-red-500 py-1 px-3 rounded text-white">حذف</button></div></div>))}</div>
    </div>
  );

  const renderReviewProjectsSection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">مشاريع قيد المراجعة</h2>
      {pendingProjects.length > 0 ? (
        <div className="space-y-6">
          {pendingProjects.map((p) => (
            <div key={p.id} className={`${sectionClass}`}>
              <div className="grid md:grid-cols-4 gap-6 items-start">
                <img src={p.imageUrl} alt={p.title} className={`md:col-span-1 w-full h-40 object-cover rounded border-2 ${borderColor}`} />
                <div className="md:col-span-3">
                    <h3 className={`text-xl font-bold ${textWhiteColor}`}>{p.title} <span className="text-base font-normal text-gray-400">({p.year})</span></h3>
                    <p className="text-amber-400 my-1">{p.studentName}</p>
                    <p className={`${textColor} my-3`}>{p.description}</p>
                    <div className={`text-sm border-t ${borderColor} pt-3 mt-3`}>
                      <p className={textColor}><strong>مقدم الطلب:</strong> {p.submitterName}</p>
                      <p className={textColor}><strong>البريد الإلكتروني:</strong> {p.submitterEmail}</p>
                    </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4 pt-4 border-t border-slate-700 justify-end">
                  <button onClick={() => rejectProject(p.id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500">رفض</button>
                  <button onClick={() => { approveProject(p.id); displaySuccessMessage('تمت الموافقة على المشروع ونشره بنجاح!'); }} className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500">موافقة ونشر</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`${sectionClass} text-center ${textColor}`}>لا توجد مشاريع معلقة للمراجعة حاليًا.</p>
      )}
    </div>
  );

  const renderNewsSection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">إدارة الأخبار والأنشطة</h2>
      <form onSubmit={handleNewsSubmit} className={`${sectionClass} mb-8 space-y-4`}>
        <h3 className={`text-xl ${textWhiteColor} font-bold`}>{editingNews ? 'تعديل خبر' : 'إضافة خبر جديد'}</h3>
        <input name="title" value={newsForm.title} onChange={(e) => setNewsForm({...newsForm, title: e.target.value})} placeholder="العنوان" required className={inputClass} />
        <input name="date" type="date" value={newsForm.date} onChange={(e) => setNewsForm({...newsForm, date: e.target.value})} placeholder="التاريخ" required className={inputClass} />
        <textarea name="summary" value={newsForm.summary} onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})} placeholder="الملخص" required className={`${inputClass} h-24`}></textarea>
        <div>
          <label className={labelClass}>صورة الخبر</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setNewsForm, 'imageUrl', 2)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {newsForm.imageUrl && <img src={newsForm.imageUrl} alt="Preview" className={`mt-4 w-48 h-32 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
        <div className="flex gap-4"><button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">{editingNews ? 'حفظ التغييرات' : 'إضافة'}</button>{editingNews && <button type="button" onClick={cancelEditNews} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400">إلغاء</button>}</div>
      </form>
      <div className="space-y-4">{news.map(n => (<div key={n.id} className={`${sectionClass} flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          {n.imageUrl && <img src={n.imageUrl} alt={n.title} className={`w-24 h-16 object-cover rounded border-2 ${borderColor}`}/>}
          <div>
            <p className={`font-bold ${textWhiteColor}`}>{n.title}</p>
            <p className={textColor}>{n.date}</p>
          </div>
        </div>
        <div className="flex gap-2"><button onClick={() => editNews(n)} className="bg-blue-500 py-1 px-3 rounded text-white">تعديل</button><button onClick={() => deleteNews(n.id)} className="bg-red-500 py-1 px-3 rounded text-white">حذف</button></div></div>))}</div>
    </div>
  );

  const renderGallerySection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">إدارة المعرض والمعامل</h2>
      <form onSubmit={handleGallerySubmit} className={`${sectionClass} mb-8 space-y-4`}>
        <h3 className={`text-xl ${textWhiteColor} font-bold`}>{editingGallery ? 'تعديل صورة' : 'إضافة صورة جديدة'}</h3>
        <input name="title" value={galleryForm.title} onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} placeholder="عنوان الصورة" required className={inputClass} />
        <div>
          <label className={labelClass}>تحميل صورة</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setGalleryForm, 'imageUrl', 2)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {galleryForm.imageUrl && <img src={galleryForm.imageUrl} alt="Preview" className={`mt-4 w-48 h-32 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
        <select name="category" value={galleryForm.category} onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value as 'gallery' | 'labs'})} className={inputClass}><option value="gallery">معرض</option><option value="labs">معامل</option></select>
        <div className="flex gap-4"><button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">{editingGallery ? 'حفظ التغييرات' : 'إضافة'}</button>{editingGallery && <button type="button" onClick={cancelEditGallery} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400">إلغاء</button>}</div>
      </form>
      <div className="space-y-4">{gallery.map(i => (<div key={i.id} className={`${sectionClass} flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <img src={i.imageUrl} alt={i.title} className={`w-24 h-16 object-cover rounded border-2 ${borderColor}`}/>
          <div>
            <p className={`font-bold ${textWhiteColor}`}>{i.title}</p>
            <p className="text-amber-400">{i.category === 'gallery' ? 'معرض' : 'معمل'}</p>
          </div>
        </div>
        <div className="flex gap-2"><button onClick={() => editGallery(i)} className="bg-blue-500 py-1 px-3 rounded text-white">تعديل</button><button onClick={() => deleteGalleryImage(i.id)} className="bg-red-500 py-1 px-3 rounded text-white">حذف</button></div></div>))}</div>
    </div>
  );
  
  const renderLibrarySection = () => (
    <div>
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">إدارة المكتبة</h2>
      <form onSubmit={handleBookSubmit} className={`${sectionClass} mb-8 space-y-4`}>
        <h3 className={`text-xl ${textWhiteColor} font-bold`}>{editingBook ? 'تعديل كتاب' : 'إضافة كتاب جديد'}</h3>
        <input name="title" value={bookForm.title} onChange={(e) => setBookForm({...bookForm, title: e.target.value})} placeholder="عنوان الكتاب" required className={inputClass} />
        <input name="author" value={bookForm.author} onChange={(e) => setBookForm({...bookForm, author: e.target.value})} placeholder="اسم المؤلف" required className={inputClass} />
        <textarea name="description" value={bookForm.description} onChange={(e) => setBookForm({...bookForm, description: e.target.value})} placeholder="وصف الكتاب" required className={`${inputClass} h-24`}></textarea>
        <div>
          <label className={labelClass}>صورة غلاف الكتاب (يفضل 2MB)</label>
           <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleFileChange(e, setBookForm, 'coverImageUrl', 2)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
          />
          {bookForm.coverImageUrl && <img src={bookForm.coverImageUrl} alt="Cover Preview" className={`mt-4 w-32 h-48 object-cover rounded-lg border-2 ${borderColor}`} />}
        </div>
         <div>
          <label className={labelClass}>ملف الكتاب (PDF فقط، يفضل أقل من 10MB)</label>
           <input 
            type="file" 
            accept=".pdf" 
            onChange={(e) => handleFileChange(e, setBookForm, 'fileUrl', 10)}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {bookForm.fileUrl && <a href={bookForm.fileUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block text-blue-400 hover:underline`}>معاينة الملف المرفوع</a>}
        </div>
        <div className="flex gap-4"><button type="submit" className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded hover:bg-amber-400">{editingBook ? 'حفظ التغييرات' : 'إضافة'}</button>{editingBook && <button type="button" onClick={cancelEditBook} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-400">إلغاء</button>}</div>
      </form>
      <div className="space-y-4">{books.map(b => (<div key={b.id} className={`${sectionClass} flex justify-between items-center`}>
        <div className="flex items-center gap-4">
          <img src={b.coverImageUrl} alt={b.title} className={`w-16 h-24 object-cover rounded border-2 ${borderColor}`}/>
          <div>
            <p className={`font-bold ${textWhiteColor}`}>{b.title}</p>
            <p className="text-amber-400">{b.author}</p>
          </div>
        </div>
        <div className="flex gap-2"><button onClick={() => editBook(b)} className="bg-blue-500 py-1 px-3 rounded text-white">تعديل</button><button onClick={() => deleteBook(b.id)} className="bg-red-500 py-1 px-3 rounded text-white">حذف</button></div></div>))}</div>
    </div>
  );

  const tabs = [
    { key: 'reviewProjects', label: 'مشاريع للمراجعة', count: pendingProjects.length },
    { key: 'projects', label: 'المشاريع' },
    { key: 'faculty', label: 'هيئة التدريس' },
    { key: 'library', label: 'المكتبة' },
    { key: 'news', label: 'الأخبار' },
    { key: 'gallery', label: 'المعرض والمعامل' },
    { key: 'settings', label: 'إعدادات عامة' },
    { key: 'homepage', label: 'الصفحة الرئيسية' },
    { key: 'about', label: 'نبذة عن القسم' },
    { key: 'curriculum', label: 'المناهج' },
    { key: 'contact', label: 'معلومات التواصل' },
  ];

  return (
    <div className="relative">
      <h1 className={`${headingColor} text-4xl font-bold mb-8 pb-4 border-b-2 ${borderColor}`}>لوحة تحكم الأدمن</h1>
      
      <div className={`flex flex-wrap border-b ${borderColor} mb-8`}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 font-semibold transition-colors duration-300 relative ${activeTab === tab.key ? 'text-amber-400 border-b-2 border-amber-400' : tabTextColor}`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'reviewProjects' && renderReviewProjectsSection()}
        {activeTab === 'settings' && renderSiteConfigSection()}
        {activeTab === 'homepage' && renderHomePageSection()}
        {activeTab === 'about' && renderAboutPageSection()}
        {activeTab === 'curriculum' && renderCurriculumSection()}
        {activeTab === 'contact' && renderContactSection()}
        {activeTab === 'faculty' && renderFacultySection()}
        {activeTab === 'projects' && renderProjectsSection()}
        {activeTab === 'library' && renderLibrarySection()}
        {activeTab === 'news' && renderNewsSection()}
        {activeTab === 'gallery' && renderGallerySection()}
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg animate-bounce">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminPage;