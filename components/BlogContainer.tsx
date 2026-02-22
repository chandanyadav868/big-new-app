import Image from 'next/image'
import React from 'react'
import { HeroSectionProps } from './HeroSection'
import { CreatedByComp, SingleArticleLinkPage } from './SideContainer'
import Banner_width_height_728_90 from './adsComponents/banner/adult/banner_width_height_728_90';
import { cn } from '@/lib/utils';
import Banner_width_height_320_250 from './adsComponents/banner/simple/banner_width_height_320_250';


interface BlogContainerProps extends HeroSectionProps {
    className: string;
    index:number;
    adsShow:boolean;
}

const BlogContainer = ({ className = "", blogImageUrl, category, slug, createdAt, title, description, _id, createdBy, index,adsShow=true }: Partial<Omit<BlogContainerProps,"index">> & {index:number}) => {

    return (
        <>    
        { (adsShow && index % 5 === 0) && <Banner_width_height_320_250 classname='shrink-0 max-sm:mx-auto max-[426px]:w-full'/>}   

        <section className={cn(`flex gap-4 border-1 rounded-md p-2 flex-wrap items-center shadow-2xl ${className}`)}>
            <div className={`w-full mx-auto min-[768px]:w-[200px] shrink-0 overflow-hidden rounded-md`}>
                <SingleArticleLinkPage createdAt={createdAt} slug={slug} title={`blog image ${blogImageUrl}`}>
                    <Image src={blogImageUrl ? blogImageUrl : "https://mannatthemes.com/blogloo/default/assets/images/widgets/sm-3.jpg"} alt='blog image'
                        fetchPriority='high'
                        quality={65}
                        width={350} height={200}
                        className='h-[100%] w-full object-cover  hoverScale aspect-video object-left-top' />
                </SingleArticleLinkPage>
            </div>

            <article className='flex flex-col justify-between flex-1 gap-4'>
                <div className='flex flex-col gap-4'>
                    <SingleArticleLinkPage createdAt={createdAt} slug={slug} title={title}>
                        <h2 className='font-bold text-xl line-clamp-2 hover:underline'>{title && title}</h2>
                        <p className='line-clamp-2'>{description && description}</p>
                    </SingleArticleLinkPage>
                </div>
                {/* <div>
                    {createdBy?._id ?
                        (<>
                            <div className='flex justify-between items-center flex-wrap gap-4'>
                                <CreatedByComp createdBy={createdBy} />
                            </div>
                        </>)
                        :
                        (<></>)
                    }
                </div> */}
            </article>
        </section>
        
        </>
    )
}

export default BlogContainer