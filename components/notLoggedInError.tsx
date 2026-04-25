import Link from 'next/link';
import React, { useEffect } from 'react';
import { X, Lock } from 'lucide-react';
import { NotloggedInDialogboxShowProp } from './CommentComponents';

interface NotLoggedInErrorProps {
  btnText: string;
  setNotloggedInDialogboxShow: React.Dispatch<React.SetStateAction<NotloggedInDialogboxShowProp | null>>;
  button?: any; // Kept for backwards compatibility with props passed, though no longer used for positioning
}

function NotLoggedInError({ btnText, setNotloggedInDialogboxShow }: NotLoggedInErrorProps) {
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click away backdrop to close */}
      <div 
        className="absolute inset-0" 
        onClick={() => setNotloggedInDialogboxShow(null)}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 text-center animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
        
        {/* Close Button */}
        <button 
          onClick={() => setNotloggedInDialogboxShow(null)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-4">
          <Lock size={24} />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Sign in to {btnText.toLowerCase()}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          You need an account to interact with articles. Join the conversation and share your thoughts!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link 
            href="/auth/login"
            onClick={() => setNotloggedInDialogboxShow(null)}
            className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Sign In
          </Link>
          <button 
            onClick={() => setNotloggedInDialogboxShow(null)}
            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors"
          >
            Not Now
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default NotLoggedInError;