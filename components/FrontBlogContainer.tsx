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
      <Image src={blogImageUrl} fetchPriority='high' alt='shortBlog Image' width={800} height={800} className='w-full h-full object-cover object-top hoverScale' loading='lazy' quality={85} />

      <div className='absolute right-0 bottom-0  w-full gradient-overlap-shortBlog h-full flex justify-between items-center px-2 font-medium min-sm:text-sm text-white max-sm:text-xs'>
        <DateComponets blogDate={createdAt??""}/>
        <CategoryButton category={category}/>
      </div>

      <div className='absolute text-white font-bold w-full h-full right-0 bottom-0 p-2 content-end' style={{backgroundImage: "linear-gradient(358deg, black , transparent, transparent 40%)"}}>
        <SingleArticleLinkPage slug={slug} createdAt={createdAt} title={title}>
          <h1 className='text-xl cursor-pointer hover:underline hover:underline-offset-2 line-clamp-2 max-md:text-3xl max-sm:text-lg max-sm:leading-5'>{title ?
            title : "Popular admin template you can use for your business."}</h1>
          <p className='line-clamp-1 text-xl leading-snug max-sm:text-[12px]'>{description && description}</p>
        </SingleArticleLinkPage>
      </div>

    </div>
  )
}

export default FrontBlogContainer