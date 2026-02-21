import Image from 'next/image'
import React from 'react'
import { dateformate, slugChangeIntoTitle } from '@/lib/utils';
import Link from 'next/link';
import DateComponets from './DateComponets';
import CategoryButton from './CategoryButton';
import { SingleArticleLinkPage } from './SideContainer';

interface BigContainerProps {
    blogImageUrl: string;
    category: string;
    title: string;
    description: string;
    createdAt: string;
    className: string;
    slug: string;
    _id: string;
}

function BigContainer({className = "", blogImageUrl, category, title, description, slug, _id, createdAt }: BigContainerProps) {    

    return (
        <section className={`w-full h-full ${className}`}>
            <section className={`w-full lg:w-full h-full rounded-md overflow-hidden relative shortCardHover`}>
                <SingleArticleLinkPage createdAt={createdAt} slug={slug} title={title}>
                    <Image
                        src={
                            blogImageUrl
                                ? blogImageUrl
                                : 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg'
                        }
                        alt="Short blog image"
                        width={700}
                        height={393}
                        quality={65}
                        loading='lazy'
                        fetchPriority='high'
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="w-full h-[100%] object-cover object-top hoverScale"
                        style={{ aspectRatio: '16/9' }}
                    />
                </SingleArticleLinkPage>


                <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog bg-black/5 h-full' />
                        
                <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog h-full flex justify-between px-2 items-center gap-2 font-extrabold text-white max-sm:text-xs'>
                    <DateComponets blogDate={createdAt ?? ""} />
                    <CategoryButton category={category} />
                </div>

                <div className='absolute text-white font-bold w-full right-0 bottom-0 p-2'>
                    <SingleArticleLinkPage createdAt={createdAt} slug={slug} title={title}>
                        <h1 className='text-4xl min-md:text-6xl max-sm:text-lg max-sm:leading-5 max-[325px]:text-[18px] line-clamp-3'>{title ?? "No title"}</h1>
                        {/* <p className='line-clamp-1 text-xl max-sm:text-sm max-[325px]:text-[12px] max-[325px]:leading-5'>{description && description}</p> */}
                    </SingleArticleLinkPage>
                </div>

            </section>
        </section>

    )
}

export default BigContainer



/*
<Image src={ShowImage? ShowImage:`https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg`} alt='shortBlog Image' width={1000} height={1000} 
                unoptimized
                layout="responsive" 
                priority
                quality={100} className='w-full h-full object-cover object-top hoverScale' style={{aspectRatio:"16/9"}} />         
*/

