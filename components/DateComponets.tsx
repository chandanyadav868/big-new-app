import { dateformate } from '@/lib/utils'
import React from 'react'

function DateComponets({ blogDate }: { blogDate: string }) {
    return (
            <p className='px-[0.8em] py-[0.4em] bg-gray-600 shadow-md rounded-md text-inherit'>{blogDate ? dateformate(blogDate) : "12 Aug 2024"}</p>
    )
}

export default DateComponets