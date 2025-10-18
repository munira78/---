import React from 'react';
import { useData } from '../contexts/DataContext';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  if (!isOpen) {
    return null;
  }

  const dialogBg = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300';
  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const messageColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={onClose}
    >
      <div 
        className={`${dialogBg} rounded-lg shadow-xl border w-full max-w-md p-6 animate-fadeIn`}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
            @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
            }
            .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
            }
        `}</style>
        <h2 id="dialog-title" className={`text-2xl font-bold ${titleColor}`}>{title}</h2>
        <p className={`mt-4 ${messageColor}`}>{message}</p>
        <div className="mt-6 flex justify-end space-x-4 rtl:space-x-reverse">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-400 transition-colors"
          >
            إلغاء
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-500 transition-colors"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
