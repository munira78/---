import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import type { GalleryImage } from '../types/index';
import ImageViewer from '../components/ImageViewer';

const GalleryLabsPage: React.FC = () => {
  const { gallery, siteConfig } = useData();
  const [filter, setFilter] = useState<'all' | 'gallery' | 'labs'>('all');
  const [viewerState, setViewerState] = useState({ isOpen: false, index: 0 });
  const theme = siteConfig.theme || 'dark';

  const filteredImages = useMemo(() => {
    if (filter === 'all') {
      return gallery;
    }
    return gallery.filter(img => img.category === filter);
  }, [gallery, filter]);
  
  const openViewer = (index: number) => {
    setViewerState({ isOpen: true, index: index });
  };
  
  const closeViewer = () => {
    setViewerState({ isOpen: false, index: 0 });
  };
  
  const goToNext = () => {
    setViewerState(prevState => ({
      ...prevState,
      index: (prevState.index + 1) % filteredImages.length
    }));
  };

  const goToPrev = () => {
    setViewerState(prevState => ({
      ...prevState,
      index: (prevState.index - 1 + filteredImages.length) % filteredImages.length
    }));
  };

  const filterButtons = [
    { key: 'all', label: 'الكل' },
    { key: 'gallery', label: 'معرض الصور' },
    { key: 'labs', label: 'المعامل والورش' },
  ];

  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const inactiveBtnBg = theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 pb-4 border-b-2 ${borderColor}`} style={{ color: siteConfig.primaryColor }}>المعرض والمعامل</h1>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filterButtons.map(button => (
          <button
            key={button.key}
            onClick={() => setFilter(button.key as 'all' | 'gallery' | 'labs')}
            className={`font-semibold py-2 px-6 rounded-lg transition-all duration-300 ${
              filter === button.key
                ? 'bg-amber-500 text-slate-900 shadow-lg'
                : inactiveBtnBg
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`group relative overflow-hidden rounded-lg shadow-lg border-2 ${borderColor} cursor-pointer`}
              onClick={() => openViewer(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openViewer(index)}
              aria-label={`View image: ${image.title}`}
            >
              <img src={image.imageUrl} alt={image.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold text-center">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-center ${textColor} text-lg mt-12`}>لا توجد صور لعرضها في هذا القسم حاليًا.</p>
      )}

      {viewerState.isOpen && (
        <ImageViewer 
          images={filteredImages}
          currentIndex={viewerState.index}
          onClose={closeViewer}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};

export default GalleryLabsPage;