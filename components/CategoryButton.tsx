import React from 'react'

function CategoryButton({ category }: { category: string }) {
    return (
            <p className='px-[0.4em] py-[0.2em] bg-pink-500 shadow-md rounded-md text-inherit shrink'>{category ?? "No category"}</p>
    )
}

export default CategoryButton