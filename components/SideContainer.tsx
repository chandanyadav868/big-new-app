import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HeroSectionProps } from './HeroSection'
import { articleSlug } from '@/lib/utils'
import { CreatedAuthor } from '@/lib/readux/articleFetchSlice'

interface FrontBlogContainer extends HeroSectionProps {
    width?: string,
    height?: string,
    className: string
}

const SideContainer = ({ className = "", blogImageUrl, category, description, title, createdAt, slug, _id, createdBy }: FrontBlogContainer) => {
    return (
        <SingleArticleLinkPage createdAt={createdAt} slug={slug}>
            <section className={` grid grid-cols-2 max-sm:grid-cols-1 gap-4 rounded-md shadow-md p-2${className}`}>
                <div className={`mx-auto shrink-1 overflow-hidden rounded-md h-[150px] w-full`}>
                    <Image src={blogImageUrl ? blogImageUrl : "https://mannatthemes.com/blogloo/default/assets/images/widgets/sm-3.jpg"} alt='blog image' width={500} height={500} className='h-full object-cover w-full object-top  hoverScale' />
                </div>
                <div className='shrink-1 flex flex-col flex-1 relative leading-5'>
                    <h2 className='font-bold text-2xl max-sm:text-xl line-clamp-2'>{title??"No title"}</h2>
                    <p className='line-clamp-2 text-xl max-sm:text-sm'>{description?? "No description"} </p>
                </div>
            </section>
        </SingleArticleLinkPage>
    )
}

export default SideContainer

export const CreatedByComp = ({ createdBy }: { createdBy: CreatedAuthor }) => {
    return (
        <div className='flex justify-between items-center flex-wrap gap-4'>
            <Link href={`/u/${createdBy.username}`} aria-label='User channel link'>
                <div className='flex gap-2 items-center'>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s" alt="avatar Image" width={100} height={100} className='object-cover w-[30px] h-[30px] rounded-full' />
                    <div className='flex-1 flex-col flex justify-around w-full'>
                        <span className='font-semibold text-[12px] italic '>{createdBy.fullname}</span>
                        <span className='text-[12px]'>
                            {`@${createdBy.username}`}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export const SingleArticleLinkPage = ({ createdAt, slug, children, title }: { slug: string | undefined, createdAt: string | undefined, children: React.ReactNode, title?: string }) => {
    return (
        <Link className='h-[100%] hover:underline underline-offset-1' aria-label={`Read more about ${title}`} href={articleSlug({ slug, createdAt })}>
            {children}
        </Link>
    )
}















{/* <video preload="none" tabindex="-1" playsinline aria-label="Embedded video" poster="https://pbs.twimg.com/amplify_video_thumb/1850465523496361984/img/Knnk3NwTrfD8gCWS.jpg" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"><source type="video/mp4" src="blob:https://x.com/58d87a5a-1de9-49a0-acdb-9fd7efb1901b">
</video> */}