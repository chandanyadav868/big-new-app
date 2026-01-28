import Image from 'next/image'
import React from 'react'

interface FigureImageProps {
    blogImageUrl: string;
    featuredImagealt: string;
}

function FigureImage({ blogImageUrl, featuredImagealt }: FigureImageProps) {
    return (
        <figure className='relative aspect-video overflow-hidden'>

            <Image alt={featuredImagealt} quality={100} loading='lazy'  src={blogImageUrl} width={1000} height={1000} className='w-full h-auto shadow-sm object-cover overflow-hidden px-2 py-1 ' placeholder="blur" blurDataURL='/images/blur_image.png' style={{ aspectRatio: "16/9" }} />
            
            <figcaption className='absolute bottom-0 text-cyan-50 font-bold block w-full rounded-b-md z-10'>
                <p className='p-2'>{featuredImagealt}</p>
            </figcaption>

            <Image alt={'images'} src={'/images/image.png'} width={100} height={100} className='w-full h-auto rounded-md shadow-sm object-cover overflow-hidden absolute top-0' style={{ aspectRatio: "16/9" }} unoptimized />

        </figure>
    )
}

export default FigureImage