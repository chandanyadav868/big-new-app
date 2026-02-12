import React from 'react'

function CategoryButton({ category }: { category: string }) {
    return (
            <p className='px-1.5 py-2 bg-pink-500 shadow-md rounded-md text-inherit'>{category ?? "No category"}</p>
    )
}

export default CategoryButton