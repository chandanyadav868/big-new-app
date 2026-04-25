"use client"

import { addingNewArticle } from '@/lib/readux/profileFetching';
import { AppDispatch, RootState } from '@/lib/readux/store';
import { useParams,useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from './ui/ArticleCard';
import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';

export function ChannelPageComp() {
    const [moreArticlesFetching, setMoreArticleFetching] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { profile, section } = useParams();
    const secCategory = typeof section === "string" ? decodeURIComponent(section) : decodeURIComponent(section?.[0]??"")

    const { error, intialProfile, loading } = useSelector((state: RootState) => state.profileFetching);

    console.log({intialProfile});
    console.log({secCategory});
    
    

    const dataFetching = intialProfile.arrayOfArticles?.find((v,i)=> v._id === secCategory);

    console.log({dataFetching});
    


    const deleteArticle = async (id: string) => {
        try {
            console.log("deleting articleId:- ", id);
            const response = await fetch(`/api/articleDelete?deleteId=${id}`,{
                method:"GET"
            });
            const responseJson = await response.json();
            console.log("responseJson:- ", responseJson);
        } catch (error) {
            console.log("Error in the deleteArticle");
        }
    };

    // collect category
    const category = useMemo(() => {
        let category = intialProfile.arrayOfArticles?.map((v, i) => v._id) ?? []
        return category
    }, [intialProfile?._id]);

    // more article and adding that in the readux
    const moreArticle = async () => {
        try {
            setMoreArticleFetching(true)
            const totalArticle = dataFetching?.articles.length
            const response = await fetch(`/api/moreArticle?category=${secCategory ?? ""}&totalArticle=${totalArticle}`);
            const responseJson = await response.json();
            // console.log("responseJson:- ", responseJson);

            dispatch(addingNewArticle({ section: secCategory ?? "", data: responseJson.data }));
            setMoreArticleFetching(false)

        } catch (error) {
            console.log("Error in the moreArticle:- ", error);
            setMoreArticleFetching(false)
        }
    }

    return (
        <div className="mt-6">
            {/* category tabs */}
            <div className='flex gap-6 overflow-x-auto border-b border-[var(--color-divider)] scrollbar-hide mb-6'>
                {category?.map((data, index) => (
                    <div 
                        onClick={() => router.push(`/u/${profile}/${data}`)}
                        className={`pb-3 cursor-pointer whitespace-nowrap font-semibold transition-colors text-sm ${
                            secCategory === data 
                            ? "text-red-600 border-b-2 border-red-600" 
                            : "text-[var(--color-meta)] hover:text-[var(--color-headline)]"
                        }`} 
                        key={data}
                    >
                        {data.toUpperCase()}
                    </div>
                ))}
            </div>
            
            {/* Articles Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {dataFetching && dataFetching?.articles.map((data, index) => (
                    <div className='relative flex flex-col news-card h-full transition-shadow hover:shadow-md' key={index}>
                        <div className="flex-1 p-3 pb-0">
                            <ArticleCard variant="featured" {...data} key={data._id} />
                        </div>
                        
                        {intialProfile.isYouOwner && (
                            <div className='flex justify-end gap-3 px-4 pb-4 mt-auto border-t border-[var(--color-divider)] pt-3'>
                                <Link 
                                    href={`/edit/${data._id}`}
                                    className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
                                >
                                    <FilePenLine size={18} />
                                </Link>
                                <button 
                                    onClick={() => deleteArticle(data?._id)}
                                    className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Load more button */}
            {secCategory &&
                ((dataFetching?.totalSizeOfArticles ?? 0) > (dataFetching?.articles?.length ?? 0)) &&
                <div className='flex justify-center mt-8'>
                    <button 
                        onClick={() => moreArticle()} 
                        disabled={moreArticlesFetching}
                        className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-[var(--color-headline)] hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold rounded-full transition-colors disabled:opacity-50"
                    >
                        {moreArticlesFetching ? "Loading..." : "Load More Articles"}
                    </button>
                </div>}
        </div>
    )
}