"use client"

import { addingNewArticle } from '@/lib/readux/profileFetching';
import { AppDispatch, RootState } from '@/lib/readux/store';
import { useParams,useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BlogContainer from './BlogContainer';
import Link from 'next/link';
import { FilePenLine, Trash2 } from 'lucide-react';

export function ChannelPageComp() {
    const [moreArticlesFetching, setMoreArticleFetching] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { profile, section } = useParams();
    const secCategory = typeof section === "string" ? section : section?.[0]

    const { error, intialProfile, loading } = useSelector((state: RootState) => state.profileFetching);

    const dataFetching = intialProfile.arrayOfArticles?.find((v,i)=> v._id === secCategory);


    const deleteArticle = useCallback(async (id: string) => {
        try {
            console.log("deleting articleId:- ", id);
            const response = await fetch(`/api/articleDelete?deleteId=${id}`);
            const responseJson = await response.json();
            console.log("responseJson:- ", responseJson);
        } catch (error) {
            console.log("Error in the deleteArticle");
        }
    }, []);

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
        <>
            {/* category scrollbar */}
            <div className='bg-gray-900 text-white flex p-2 gap-2 overflow-x-auto rounded-md'>
                {category?.map((data, index) => (
                    <div onClick={() => {
                        router.push(`/u/${profile}/${data}`)
                    }}
                        className={`inline px-4 py-1.5 rounded-md shadow-md cursor-pointer hover:bg-red-500 whitespace-nowrap ${secCategory === data ? "bg-red-900" : "bg-red-400"}`} key={data}>{data}</div>
                ))}
            </div>
            {/* category below part */}
            <div className='grid grid-cols-2 max-[444px]:grid-cols-1 gap-4'>
                {dataFetching && dataFetching?.articles.map((data, index) => (
                    <div className='relative flex flex-col p-1 shadow-md rounded-md' key={index}>
                        <BlogContainer {...data} key={data._id} className='' />
                        {
                            intialProfile.isYouOwner &&

                            <div className='flex justify-end gap-4'>
                                <span className='cursor-pointer'>
                                    <Link href={`/edit/${data._id}`}>
                                        <FilePenLine className='hover:text-blue-500' />
                                    </Link>
                                </span>
                                <span className='cursor-pointer' onClick={() => deleteArticle(data?._id)}><Trash2 className='hover:text-red-500' /></span>
                            </div>
                        }
                    </div>
                ))}
            </div>
            {/* more article */}
            {secCategory &&
                ((dataFetching?.totalSizeOfArticles ?? 0) > (dataFetching?.articles?.length ?? 0)) &&
                <div className='text-center p-2 mt-4'>
                    <span onClick={() => moreArticle()} className='text-white bg-black p-2 rounded-md mt-4 cursor-pointer '>
                        {moreArticlesFetching?"Loading...":"More Article"}
                        </span>
                </div>}
        </>
    )
}