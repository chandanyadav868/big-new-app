import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { NotloggedInDialogboxShowProp } from './CommentComponents';
import { Lock } from 'lucide-react';

interface NotLoggedInErrorProps {
    btnText: string;
    setNotloggedInDialogboxShow: React.Dispatch<React.SetStateAction<NotloggedInDialogboxShowProp | null>>
    button?: {
        notLoggedIn: boolean,
        buttonRectArea?: DOMRect
    } | null
}

function PopUpError({ btnText, setNotloggedInDialogboxShow }: NotLoggedInErrorProps) {
    const dialogBox = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    function handleBackdropClick(e: React.MouseEvent) {
        if (dialogBox.current && !dialogBox.current.contains(e.target as Node)) {
            setNotloggedInDialogboxShow(null);
        }
    }

    return (
        <div 
            role='dialog'
            aria-modal='true'
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div 
                ref={dialogBox} 
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
            >
                {/* Header / Icon */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-col items-center justify-center border-b border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-4">
                        <Lock size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                        Authentication Required
                    </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                        You must be signed in to <strong className="text-gray-900 dark:text-white font-semibold">{btnText.toLowerCase()}</strong> this article. Join our community to interact!
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Link 
                            href="/auth/login"
                            className="w-full flex justify-center py-2.5 px-4 rounded-xl font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 transition-opacity"
                        >
                            Sign In
                        </Link>
                        <button 
                            onClick={() => setNotloggedInDialogboxShow(null)}
                            className="w-full py-2.5 px-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Not Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpError