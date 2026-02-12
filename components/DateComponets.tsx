import { dateformate } from '@/lib/utils'
import React from 'react'

function DateComponets({ blogDate }: { blogDate: string }) {
    return (
            <p className='px-1.5 py-2 bg-gray-600 shadow-md rounded-md text-inherit'>{blogDate ? dateformate(blogDate) : "12 Aug 2024"}</p>
    )
}

export default DateComponets