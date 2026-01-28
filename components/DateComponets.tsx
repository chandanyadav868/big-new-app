import { dateformate } from '@/lib/utils'
import React from 'react'

function DateComponets({ blogDate }: { blogDate: string }) {
    return (
        <div className='absolute top-1 left-4 bg-black text-white font-serif p-2 px-4 rounded-md lg-label-padding' style={{ boxShadow: "2px 2px 0px 0px white" }}>
            <span>{blogDate ? dateformate(blogDate) : "12 Aug 2024"}</span>
        </div>
    )
}

export default DateComponets