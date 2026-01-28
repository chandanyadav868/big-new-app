
import { SendIcon, ThumbsDown, ThumbsUp } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import NotLoggedInError from './NotLoggedInError';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/readux/store';

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
        <div className='p-4 bg-gray-700'>
            <h1 className='text-2xl font-bold text-center  text-white p-2'>Comments</h1>
            <div>
                <div className='h-[444px] shadow-inner overflow-y-auto comment_overflow'>
                    {comments.map((comment, index) => (
                        <div className='p-2 bg-black text-white mb-2 rounded-md' key={index}>
                            <div className='flex gap-2 items-center'>
                                <Link href={`/${comment?.user?.username}`}>
                                    <span>
                                        <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"} width={100} height={100} alt='avatar image' className='w-8 h-8 rounded-full object-cover' />
                                    </span>
                                    <span>@{comment?.user?.username}</span>
                                </Link>
                            </div>
                            <h1 className='font-bold text-xl mb-2'>{comment?.text}</h1>
                            <div className='flex gap-2 items-center'>
                                <span className='flex gap-2 items-center justify-center'>
                                    <ThumbsUp 
                                    color={comment?.likes.includes(data?._id??"")?"blue":"white"}
                                    onClick={() => commentLikeButton(comment?._id as string)} 
                                    className={`hover:text-blue-600 cursor-pointer`}/>
                                    <span className='font-bold text-blue-500'>{comment?.likes.length}</span>
                                </span>
                                <span className='flex gap-2 items-center justify-center'>
                                    <ThumbsDown 
                                    color={comment?.dislikes.includes(data?._id??"")?"red":"white"}
                                    onClick={() => commentDisLikeButton(comment?._id as string)} 
                                    className={`hover:text-red-600 cursor-pointer `} 
                                    />
                                    <span className='font-bold text-red-500 mb-2'>{comment?.dislikes.length}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {/* commenting input */}
                <form onSubmit={(e) => commentingButton(e)} className='flex gap-2 mt-2'>
                    <input ref={commentInputRef} type="text" className='w-full shadow-md px-4 py-4 rounded-md outline-none' placeholder='message...' />
                    <button type='submit'>
                        <SendIcon color='white' />
                    </button>
                </form>
                {notloggedInDialogboxShow?.notLoggedIn && <NotLoggedInError button={notloggedInDialogboxShow} setNotloggedInDialogboxShow={setNotloggedInDialogboxShow} btnText={"Comment on"} />}
            </div>
        </div>
    )
}

export default CommentComponents