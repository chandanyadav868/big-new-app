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
    width: string;
    height: string;
    className: string;
    slug: string;
    _id: string;
}

function BigContainer({ width = "", height = "", className = "", blogImageUrl, category, title, description, slug, _id, createdAt }: BigContainerProps) {    

    return (
        <section className={`w-full lg:w-[${width}] h-[${height}] ${className}`}>
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
                        
                <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog h-[50%]'>
                    <DateComponets blogDate={createdAt ?? ""} />
                    <CategoryButton category={category} />
                </div>

                <div className='absolute text-white font-bold w-full right-0 bottom-0 p-2'>
                    <SingleArticleLinkPage createdAt={createdAt} slug={slug} title={title}>
                        <h1 className='text-4xl cursor-pointer hover:underline hover:underline-offset-2 line-clamp-2 leading-[50px] max-md:text-xl max-md:leading-[25px] max-md:line-clamp-1'>{title ? slugChangeIntoTitle(title) : "Popular admin template you can use for your business."}</h1>
                        <p className='text-xl line-clamp-1   leading-snug max-md:text-[12px]'>{description && description}</p>
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

