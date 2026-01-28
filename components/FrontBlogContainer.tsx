import Image from 'next/image'
import React from 'react'
import { HeroSectionProps } from './HeroSection';
import { dateformate } from '@/lib/utils';
import Link from 'next/link';
import DateComponets from './DateComponets';
import CategoryButton from './CategoryButton';
import { SingleArticleLinkPage } from './SideContainer';

interface FrontBlogContainer extends HeroSectionProps {
  width: string,
  height: string,
}

const FrontBlogContainer = ({ width = "100px", height = "240px", blogImageUrl, createdAt, category, slug, title, description, _id }: FrontBlogContainer) => {

  // const {blogImageUrl} = data

  return (
    <div className={` lg:w-[${width}%] h-[${height}] rounded-md overflow-hidden relative shortCardHover `}>
      <Image src={blogImageUrl} fetchPriority='high' alt='shortBlog Image' width={350} height={200} className='w-full h-full object-cover object-top hoverScale' loading='lazy' quality={65} />

      <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog bg-black/5 h-full' />

      <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog h-full'>
        <DateComponets blogDate={createdAt??""}/>
        <CategoryButton category={category}/>
      </div>

      <div className='absolute text-white font-bold w-full right-0 bottom-0 p-2'>
        <SingleArticleLinkPage slug={slug} createdAt={createdAt} title={title}>
          <h1 className='text-xl cursor-pointer hover:underline hover:underline-offset-2 line-clamp-2'>{title ?
            title : "Popular admin template you can use for your business."}</h1>
          <p className='line-clamp-1   leading-snug'>{description && description}</p>
        </SingleArticleLinkPage>
      </div>

    </div>
  )
}

export default FrontBlogContainer