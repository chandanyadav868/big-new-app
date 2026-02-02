import { webStoriesProps } from '@/app/(main)/web-stories/page'
import Image from 'next/image'
import React from 'react'


function PreviousStoryCard({data,fetchingFun}:{data:webStoriesProps,fetchingFun : (id:number)=> void}) {
  return (
    <div className='cursor-pointer' onClick={()=> fetchingFun(data.stories[0])}>
        <Image src={data.poster} alt={data.title} width={Number(data.width)} height={Number(data.height)} decoding='async' className='w-[100px] h-[100px] object-cover rounded-md' style={{aspectRatio:"9/16"}}/>
    </div>
  )
}

export default PreviousStoryCard