// FIX: Removed file boundary markers that were causing compilation errors.
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { 
  FacultyMember, 
  StudentProject, 
  NewsArticle, 
  GalleryImage,
  Book,
  HomePageContent,
  AboutPageContent,
  CurriculumContent,
  Course,
  ContactInfo,
  SiteConfig
} from '../types';

// --- Custom Hook for Persisted State ---
function usePersistedState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        let parsed = JSON.parse(storedValue);
        
        // Migration for logoSvg to logoUrl
        if (key === 'siteConfig' && parsed.logoSvg && !parsed.logoUrl) {
          try {
            parsed.logoUrl = `data:image/svg+xml;base64,${btoa(parsed.logoSvg)}`;
          } catch (e) {
            console.error("Failed to btoa migrate logo, using raw svg string in url", e);
            parsed.logoUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(parsed.logoSvg)}`;
          }
          delete parsed.logoSvg;
        }
        
        return { ...initialState, ...parsed };
      }
      return initialState;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, state]);

  return [state, setState];
}


// --- Initial Mock Data (for first-time load) ---
const initialFaculty: FacultyMember[] = [
  { id: '1', name: 'أ.د. محمد عبد الله', title: 'رئيس القسم', imageUrl: 'https://via.placeholder.com/400x400.png/0A192F/FFFFFF?text=Dr.+Mohamed' },
  { id: '2', name: 'د. فاطمة الزهراء', title: 'أستاذ مساعد', imageUrl: 'https://via.placeholder.com/400x400.png/0A192F/FFFFFF?text=Dr.+Fatima' },
  { id: '3', name: 'م. أحمد خالد', title: 'محاضر', imageUrl: 'https://via.placeholder.com/400x400.png/0A192F/FFFFFF?text=Eng.+Ahmed' },
];

const initialProjects: StudentProject[] = [
  { id: 'p1', title: 'تصميم مركز ثقافي متكامل', studentName: 'علي حسن', year: 2023, description: 'مشروع يهدف إلى تصميم مركز ثقافي يجمع بين الفن والتكنولوجيا الحديثة.', imageUrl: 'https://via.placeholder.com/800x600.png/22334f/FFFFFF?text=Project+1' },
  { id: 'p2', title: 'إعادة تأهيل منطقة تاريخية', studentName: 'نور صباح', year: 2023, description: 'يهدف المشروع إلى الحفاظ على الطابع التاريخي للمنطقة مع إضافة لمسات عصرية.', imageUrl: 'https://via.placeholder.com/800x600.png/22334f/FFFFFF?text=Project+2' },
];

const initialNews: NewsArticle[] = [
  { id: 'n1', title: 'ورشة عمل حول استخدام Revit في التصميم', date: '2023-10-15', summary: 'نظم القسم ورشة عمل مكثفة لتدريب الطلاب على أحدث تقنيات برنامج Revit.', imageUrl: 'https://via.placeholder.com/600x400.png/22334f/FFFFFF?text=News+1' },
  { id: 'n2', title: 'زيارة ميدانية لمشروع بوابة العراق', date: '2023-09-28', summary: 'قام طلاب المرحلة الثانية بزيارة ميدانية للاطلاع على سير العمل في أحد أكبر المشاريع المعمارية في بغداد.', imageUrl: 'https://via.placeholder.com/600x400.png/22334f/FFFFFF?text=News+2' },
];

const initialGallery: GalleryImage[] = [
  { id: 'g1', imageUrl: 'https://via.placeholder.com/600x400.png/0A192F/FFFFFF?text=Gallery+1', title: 'تصميم داخلي لمكتبة', category: 'gallery' },
  { id: 'g2', imageUrl: 'https://via.placeholder.com/600x400.png/0A192F/FFFFFF?text=Gallery+2', title: 'ماكيت لمشروع تخرج', category: 'gallery' },
  { id: 'l1', imageUrl: 'https://via.placeholder.com/600x400.png/0A192F/FFFFFF?text=Lab+1', title: 'معمل الحاسوب (AutoCAD)', category: 'labs' },
  { id: 'l2', imageUrl: 'https://via.placeholder.com/600x400.png/0A192F/FFFFFF?text=Lab+2', title: 'ورشة عمل المجسمات', category: 'labs' },
];

const initialBooks: Book[] = [
    {
        id: 'b1',
        title: 'أساسيات التصميم المعماري',
        author: 'د. خالد المناصير',
        description: 'مرجع شامل يغطي المبادئ الأساسية في التصميم المعماري، من الفكرة الأولية حتى التفاصيل التنفيذية.',
        coverImageUrl: 'https://via.placeholder.com/400x600.png/22334f/FFFFFF?text=Book+Cover+1',
        fileUrl: '#'
    },
    {
        id: 'b2',
        title: 'تاريخ العمارة عبر العصور',
        author: 'أ.د. سلوى رشيد',
        description: 'رحلة مصورة عبر تاريخ العمارة العالمية، تستعرض أبرز الطرز المعمارية وتطورها.',
        coverImageUrl: 'https://via.placeholder.com/400x600.png/22334f/FFFFFF?text=Book+Cover+2',
        fileUrl: '#'
    }
];

const initialHomePageContent: HomePageContent = {
  headline: 'مرحباً بكم في قسم <span class="text-amber-400">الرسم الهندسي المعماري</span>',
  subheadline: 'نحن ملتزمون بتقديم تعليم معماري متميز يجمع بين الإبداع الفني والدقة الهندسية، لإعداد جيل من المهندسين المعماريين القادرين على بناء المستقبل.',
  ctaButton1Text: 'اكتشف المزيد عنا',
  ctaButton2Text: 'شاهد مشاريعنا',
};

const initialAboutPageContent: AboutPageContent = {
  intro: 'تأسس قسم الرسم الهندسي المعماري في معهد السلام الفني بهدف إعداد كوادر فنية متخصصة ومؤهلة للعمل في مختلف مجالات الهندسة المعمارية والإنشاءات. يركز القسم على تزويد الطلاب بالمعرفة النظرية والمهارات العملية اللازمة لمواكبة التطورات السريعة في هذا المجال.',
  vision: 'أن نكون القسم الرائد على المستوى المحلي والإقليمي في مجال التعليم الفني المعماري، وأن نكون الخيار الأول للطلاب الراغبين في التميز والإبداع في هذا التخصص.',
  mission: 'توفير بيئة تعليمية محفزة تجمع بين الأصالة والمعاصرة، وتأهيل خريجين مزودين بالمهارات الفنية والتقنية التي تلبي احتياجات سوق العمل وتساهم في تحقيق التنمية المستدامة.',
  goals: [
    'تزويد الطلاب بأساسيات الرسم الهندسي والتصميم المعماري.',
    'تدريب الطلاب على استخدام أحدث البرامج الهندسية (مثل AutoCAD, Revit, 3ds Max).',
    'تنمية مهارات الإبداع والابتكار في التصميم.',
    'ربط الجانب النظري بالتدريب العملي من خلال المشاريع والزيارات الميدانية.',
    'إعداد خريجين قادرين على المنافصة في سوق العمل.',
  ]
};

const initialCurriculumContent: CurriculumContent = {
  intro: 'تم تصميم مناهجنا الدراسية بعناية لتزويد الطلاب بالمعرفة الشاملة والمهارات العملية التي يحتاجها المهندس المعماري الناجح. يغطي المنهج الدراسي لمدة عامين مجموعة واسعة من الموضوعات الأساسية والمتقدمة.',
  year1: [
    { id: 'c101', code: 'ARCH 101', name: 'أساسيات الرسم الهندسي', credits: 3 },
    { id: 'c102', code: 'ARCH 102', name: 'تاريخ العمارة', credits: 2 },
    { id: 'c103', code: 'MATH 101', name: 'رياضيات هندسية', credits: 3 },
    { id: 'c104', code: 'PHYS 101', name: 'فيزياء عامة', credits: 3 },
  ],
  year2: [
    { id: 'c201', code: 'ARCH 201', name: 'تصميم معماري (1)', credits: 4 },
    { id: 'c202', code: 'ARCH 202', name: 'رسم معماري بالحاسب (AutoCAD)', credits: 3 },
    { id: 'c203', code: 'CONS 201', name: 'مواد وتكنولوجيا البناء', credits: 3 },
    { id: 'c204', code: 'SURV 201', name: 'مساحة', credits: 2 },
  ],
  year3: []
};

const initialContactInfo: ContactInfo = {
  address: 'شارع السلام، بغداد، العراق',
  email: 'info@alsalam.edu.iq',
  phone: '+964 770 123 4567',
  workHours: 'الأحد - الخميس: 8:00 صباحاً - 2:00 مساءً'
};

const initialSvgLogo = `<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>`;

const initialSiteConfig: SiteConfig = {
  siteName: 'معهد السلام الفني',
  logoUrl: `data:image/svg+xml;base64,${btoa(initialSvgLogo)}`,
  homePageBackground: '',
  quickLinks: [
    { id: 'ql1', label: 'عن القسم', url: '#/about' },
    { id: 'ql2', label: 'مشاريع الطلبة', url: '#/projects' },
    { id: 'ql3', label: 'تواصل معنا', url: '#/contact' },
  ],
  socialLinks: {
    facebook: '#',
    twitter: '#',
  },
  theme: 'dark',
  curriculumCourseColor: '#fbbf24' // amber-400
};


interface DataContextType {
  faculty: FacultyMember[];
  addFaculty: (member: Omit<FacultyMember, 'id'>) => void;
  updateFaculty: (member: FacultyMember) => void;
  deleteFaculty: (id: string) => void;

  projects: StudentProject[];
  addProject: (project: Omit<StudentProject, 'id'>) => void;
  updateProject: (project: StudentProject) => void;
  deleteProject: (id: string) => void;
  
  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (article: NewsArticle) => void;
  deleteNews: (id: string) => void;

  gallery: GalleryImage[];
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;

  homePageContent: HomePageContent;
  updateHomePageContent: (content: HomePageContent) => void;

  aboutPageContent: AboutPageContent;
  updateAboutPageContent: (content: AboutPageContent) => void;

  curriculumContent: CurriculumContent;
  updateCurriculumContent: (content: CurriculumContent) => void;

  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;

  siteConfig: SiteConfig;
  updateSiteConfig: (config: SiteConfig) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [faculty, setFaculty] = usePersistedState<FacultyMember[]>('facultyData', initialFaculty);
  const [projects, setProjects] = usePersistedState<StudentProject[]>('projectsData', initialProjects);
  const [news, setNews] = usePersistedState<NewsArticle[]>('newsData', initialNews);
  const [gallery, setGallery] = usePersistedState<GalleryImage[]>('galleryData', initialGallery);
  const [books, setBooks] = usePersistedState<Book[]>('booksData', initialBooks);

  const [homePageContent, setHomePageContent] = usePersistedState<HomePageContent>('homePageContent', initialHomePageContent);
  const [aboutPageContent, setAboutPageContent] = usePersistedState<AboutPageContent>('aboutPageContent', initialAboutPageContent);
  const [curriculumContent, setCurriculumContent] = usePersistedState<CurriculumContent>('curriculumContent', initialCurriculumContent);
  const [contactInfo, setContactInfo] = usePersistedState<ContactInfo>('contactInfo', initialContactInfo);
  const [siteConfig, setSiteConfig] = usePersistedState<SiteConfig>('siteConfig', initialSiteConfig);

  // CRUD operations
  const addFaculty = (member: Omit<FacultyMember, 'id'>) => setFaculty(prev => [...prev, { ...member, id: Date.now().toString() }]);
  const updateFaculty = (updatedMember: FacultyMember) => setFaculty(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  const deleteFaculty = (id: string) => setFaculty(prev => prev.filter(m => m.id !== id));

  const addProject = (project: Omit<StudentProject, 'id'>) => setProjects(prev => [...prev, { ...project, id: Date.now().toString() }]);
  const updateProject = (updatedProject: StudentProject) => setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));
  
  const addNews = (article: Omit<NewsArticle, 'id'>) => setNews(prev => [...prev, { ...article, id: Date.now().toString() }]);
  const updateNews = (updatedArticle: NewsArticle) => setNews(prev => prev.map(n => n.id === updatedArticle.id ? updatedArticle : n));
  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => setGallery(prev => [...prev, { ...image, id: Date.now().toString() }]);
  const updateGalleryImage = (updatedImage: GalleryImage) => setGallery(prev => prev.map(i => i.id === updatedImage.id ? updatedImage : i));
  const deleteGalleryImage = (id: string) => setGallery(prev => prev.filter(i => i.id !== id));

  const addBook = (book: Omit<Book, 'id'>) => setBooks(prev => [...prev, { ...book, id: Date.now().toString() }]);
  const updateBook = (updatedBook: Book) => setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
  const deleteBook = (id: string) => setBooks(prev => prev.filter(b => b.id !== id));

  // Content update functions
  const updateHomePageContent = (content: HomePageContent) => setHomePageContent(content);
  const updateAboutPageContent = (content: AboutPageContent) => setAboutPageContent(content);
  const updateCurriculumContent = (content: CurriculumContent) => setCurriculumContent(content);
  const updateContactInfo = (info: ContactInfo) => setContactInfo(info);
  const updateSiteConfig = (config: SiteConfig) => setSiteConfig(config);
  
  const value = { 
    faculty, addFaculty, updateFaculty, deleteFaculty,
    projects, addProject, updateProject, deleteProject,
    news, addNews, updateNews, deleteNews,
    gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage,
    books, addBook, updateBook, deleteBook,
    homePageContent, updateHomePageContent,
    aboutPageContent, updateAboutPageContent,
    curriculumContent, updateCurriculumContent,
    contactInfo, updateContactInfo,
    siteConfig, updateSiteConfig,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
