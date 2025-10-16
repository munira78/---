// FIX: Removed file boundary markers that were causing compilation errors.
import React from 'react';
import type { Book } from '../types';
import { useData } from '../contexts/DataContext';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    const { siteConfig } = useData();
    const theme = siteConfig.theme || 'dark';

    const cardBg = theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200';
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const authorColor = theme === 'dark' ? 'text-amber-400' : 'text-amber-600';

    return (
        <div className={`${cardBg} rounded-lg overflow-hidden border shadow-lg flex flex-col`}>
            <img className="w-full h-64 object-cover object-center" src={book.coverImageUrl} alt={`غلاف كتاب ${book.title}`} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className={`text-xl font-bold ${titleColor}`}>{book.title}</h3>
                <p className={`text-md ${authorColor} my-1`}>{book.author}</p>
                <p className={`text-sm ${textColor} flex-grow`}>{book.description}</p>
                <a 
                  href={book.fileUrl}
                  download={`${book.title}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full text-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-400 transition-all duration-300"
                >
                  تحميل الكتاب (PDF)
                </a>
            </div>
        </div>
    );
};

const LibraryPage: React.FC = () => {
  const { books, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div>
      <h1 className={`text-4xl font-bold text-amber-400 mb-8 pb-4 border-b-2 ${borderColor}`}>المكتبة الرقمية</h1>
       <p className={`text-lg ${textColor} mb-10`}>
        مجموعة من الكتب والمراجع الهندسية والمعمارية المفيدة لطلابنا.
      </p>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className={`text-center ${textColor} text-lg`}>لا توجد كتب لعرضها حاليًا.</p>
      )}
    </div>
  );
};

export default LibraryPage;
