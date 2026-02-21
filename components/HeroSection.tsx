"use client"
import Image from 'next/image'
import React from 'react'
import FrontBlogContainer from './FrontBlogContainer'
// import BlogContainer from './BlogContainer'
import BigContainer from './BigContainer'
import { CreatedAuthor } from '@/lib/readux/articleFetchSlice'

export interface HeroSectionProps {
    createdAt: string;
    updatedAt: string;
    createdBy: CreatedAuthor;
    blogImageUrl: string;
    featuredImagealt: string;
    title: string;
    description: string;
    category: string;
    views?: number;
    likes?: number[];
    dislikes?: number[];
    public?: boolean;
    slug: string;
    content?: string;
    _id: string;
}


const HeroSection = ({ newArticle }: { newArticle: HeroSectionProps[] }) => {
    return (

        <section className='gap-2 grid grid-cols-2 max-lg:grid-cols-1'>

            {newArticle[0] && <BigContainer {...newArticle[0]} _id={newArticle[0]._id} className='' />}

            <div className='shrink-0 grid max-lg:grid-cols-2 max-md:grid-cols-1 gap-2 max-lg:w-[100%]'>
                {newArticle.length > 1 && (newArticle.slice(1, 3).map((elem, index) =>
                    <FrontBlogContainer key={index} width='100px' height='240px' {...elem} />
                ))}
            </div>

        </section>

    )
}

export default HeroSection












{/* <FrontBlogContainer width='100' height='240px' src='https://mannatthemes.com/blogloo/default/assets/images/blogs/s-1.jpg' />
<FrontBlogContainer width='100' height='240px' src='https://mannatthemes.com/blogloo/default/assets/images/blogs/s-2.jpg' /> */}