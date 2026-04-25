
import { SendIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
// import NotLoggedInError from '@/components/NotLoggedInError';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/readux/store';
import PopUpError from './PopUpError';

interface CommentComponentsProps {
    articleId: string
}

interface intialCommentProps {
    _id?: string;
    blog?: string
    createdAt?: string
    dislikes: string[]
    likes: string[]
    text: string
    updatedAt?: string
    user: {
        fullname: string
        username: string
        _id?: string
    }
}

export interface NotloggedInDialogboxShowProp {
    notLoggedIn: boolean,
    buttonRectArea?: DOMRect
}

function CommentComponents({ articleId }: CommentComponentsProps) {
    const [comments, setComments] = useState<intialCommentProps[]>([]);
    const [intialCommentSend, setIntialCommentSend] = useState<number>(0);
    const commentInputRef = useRef<HTMLInputElement>(null);
    const { data } = useSelector((state: RootState) => state.auth);
    const [notloggedInDialogboxShow, setNotloggedInDialogboxShow] = useState<NotloggedInDialogboxShowProp | null>(null)

    useEffect(() => {
        if (intialCommentSend === 0) {
            const intialComment = async () => {
                try {
                    const response = await fetch(`/api/comment/fetchingComment?blogId=${articleId}&fetchedComment=${comments.length}`);
                    const responseJson = await response.json();
                    // console.log("responsJson:- ", responseJson);

                    if (responseJson.comment) {
                        const previousComment: intialCommentProps[] = responseJson.comment;
                        setComments((prev) => {
                            const newMap = new Map(prev.concat(previousComment).map((v,i)=> [v._id,v]))
                            return [...newMap.values()]
                        })
                    }
                    setIntialCommentSend(prev => prev + 1)
                } catch (error) {
                    console.log("Error in the time intialComment Fetching:- ", error);
                }
            }
            intialComment()
        }
    }, [articleId]);

    const commentingButton = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const buttonBox = (e.target as HTMLDivElement).getBoundingClientRect();
        if (data?._id) {
            console.log("commenting running");

            const text = commentInputRef.current?.value;
            console.log("text", text);

            if (!text) return

            const newComment = {
                articleId: articleId,
                text: text
            }

            try {
                const response = await fetch("/api/comment/newComment", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(newComment)
                });
                const responseJson = await response.json();
                console.log("responseJson:- ", responseJson);

                setComments((prev) => {
                    const copyPrev = prev;
                    const newObj: intialCommentProps = responseJson.data;
                    const newCommemt = [newObj, ...copyPrev];
                    return newCommemt
                });

            } catch (error) {
                console.log("Error in CommentingButton:- ", error);
            }

            commentInputRef.current.value = ""
        } else {
            setNotloggedInDialogboxShow({ notLoggedIn: true, buttonRectArea: buttonBox })
        }
    };

    const commentLikeButton = async (id: string) => {
        console.log("Comment:- ", id);
        if (!id || !data?._id) return;

        // i am modifying comments with the help of setComments
        setComments((prev) => {
            const newData = prev.map((comment, index) => {
                if (comment._id === id) {
                    if (comment.likes.includes(data?._id??"")) {
                        const modifiedLikes = comment.likes.filter((commentId, index) => commentId !== data?._id);
                        console.log({modifiedLikes});
                        return { ...comment, likes: modifiedLikes }
                    } else {
                        let modifiedDislikes = [] as string[];
                        if (comment.dislikes.includes(data?._id??"")) {
                            modifiedDislikes = comment.dislikes.filter((commentId, index) => commentId !== data?._id);
                        }
                        return { ...comment, likes: [...comment.likes, data?._id??""], dislikes: modifiedDislikes }
                    }
                } else {
                    return comment
                }
            })
            // this is modifed comments is being returned
            return newData
        });

        try {
            const response = await fetch("/api/comment/likesComment", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ id })
            });
            const responseJson = await response.json();
            console.log("responseJson:- ", responseJson);
        } catch (error) {
            console.log("Error in Comment-Like-Button:- ", error);
        }

    }

    const commentDisLikeButton = async (id: string) => {
        if (!id || !data?._id) return

        setComments((prev) => {
            return prev.map((comment, index) => {
                if (comment._id === id) {
                    if (comment.dislikes.includes(data._id)) {
                        const modifiedDislikes = comment.dislikes.filter((userId) => userId !== data._id);
                        return { ...comment, dislikes: modifiedDislikes }
                    } else {
                        let modifiedLikes = [] as string[];
                        if (comment.likes.includes(data._id)) {
                            modifiedLikes = comment.likes.filter((userId) => userId !== data._id)
                        }
                        return { ...comment, dislikes: [...comment.dislikes, data._id], likes: modifiedLikes }
                    }
                } else {
                    return comment
                }
            })
        });

        try {
            const response = await fetch("/api/comment/dislikesComment", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ id })
            });
            const responseJson = await response.json();
            console.log("responseJosn:- ", responseJson);
        } catch (error) {
            console.log("Error in the dislike of comment");

        }

    }

    return (
        <div role='comment holder div' className='mt-8 pt-8 border-t border-[var(--color-divider)]'>
            <h2 className='text-2xl font-bold mb-6 text-[var(--color-headline)]'>Comments ({comments.length})</h2>
            
            <div className='flex flex-col gap-6'>
                {/* Commenting Input */}
                <form onSubmit={commentingButton} className='flex gap-3 items-center bg-gray-50 dark:bg-gray-800/50 p-2 pl-4 rounded-full border border-[var(--color-divider)] focus-within:border-gray-400 transition-colors'>
                    <input 
                        ref={commentInputRef} 
                        type="text" 
                        className='w-full bg-transparent outline-none text-sm text-[var(--color-headline)] placeholder-gray-500' 
                        placeholder='Add a comment...' 
                    />
                    <button 
                        type='submit' 
                        role='use for commenting on article' 
                        aria-label='commenting button'
                        className='p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity'
                    >
                        <SendIcon size={18} />
                    </button>
                </form>

                {/* Comments List */}
                <div className='flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide'>
                    {comments.map((comment) => (
                        <div className='p-4 news-card shadow-sm hover:shadow-md transition-shadow' key={comment._id}>
                            <div className='flex items-center gap-3 mb-2'>
                                <Link href={`/u/${comment?.user?.username}`} className="shrink-0">
                                    <Image 
                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"} 
                                        width={40} 
                                        height={40} 
                                        alt='avatar' 
                                        className='w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700' 
                                    />
                                </Link>
                                <div className="flex flex-col">
                                    <Link href={`/u/${comment?.user?.username}`} className="text-sm font-bold text-[var(--color-headline)] hover:underline">
                                        {comment?.user?.fullname || comment?.user?.username}
                                    </Link>
                                    <span className="text-xs text-[var(--color-meta)]">@{comment?.user?.username}</span>
                                </div>
                            </div>
                            
                            <p className='text-sm text-[var(--color-headline)] mt-1 mb-3 leading-relaxed'>
                                {comment?.text}
                            </p>
                            
                            <div className='flex gap-4 items-center'>
                                <button 
                                    onClick={() => commentLikeButton(comment?._id as string)}
                                    className={`flex gap-1.5 items-center text-sm font-medium transition-colors ${
                                        comment?.likes.includes(data?._id ?? "") 
                                        ? "text-blue-600 dark:text-blue-500" 
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                                    }`}
                                >
                                    <ThumbsUp size={16} className={comment?.likes.includes(data?._id ?? "") ? "fill-current" : ""} />
                                    <span>{comment?.likes.length || 0}</span>
                                </button>
                                
                                <button 
                                    onClick={() => commentDisLikeButton(comment?._id as string)}
                                    className={`flex gap-1.5 items-center text-sm font-medium transition-colors ${
                                        comment?.dislikes.includes(data?._id ?? "") 
                                        ? "text-red-600 dark:text-red-500" 
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                                    }`}
                                >
                                    <ThumbsDown size={16} className={comment?.dislikes.includes(data?._id ?? "") ? "fill-current" : ""} />
                                    <span>{comment?.dislikes.length || 0}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {notloggedInDialogboxShow?.notLoggedIn && (
                    <PopUpError 
                        button={notloggedInDialogboxShow} 
                        setNotloggedInDialogboxShow={setNotloggedInDialogboxShow} 
                        btnText={"Comment on"} 
                    />
                )}
            </div>
        </div>
    )
}

export default CommentComponents