
import React, { useState } from 'react';

interface Image {
  imageUrl: string;
  title: string;
}

interface ImageSliderProps {
  images: Image[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!images || images.length === 0) {
    return <div>لا توجد صور لعرضها.</div>;
  }

  return (
    <div className="relative h-64 sm:h-80 lg:h-96 w-full max-w-4xl mx-auto" dir="ltr">
      <div className="w-full h-full rounded-lg overflow-hidden relative shadow-lg shadow-black/30 border-2 border-slate-700">
        {images.map((image, index) => (
          <div
            key={image.imageUrl}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center">
                <p className="font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-3 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-3 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  );
};

export default ImageSlider;