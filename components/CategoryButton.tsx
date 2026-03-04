import React from 'react'

function CategoryButton({ category }: { category: string }) {
    return (
            <p className='px-[0.8em] py-[0.4em] bg-pink-500 shadow-md rounded-md text-inherit shrink uppercase'>{category ?? "No category"}</p>
    )
}

export default CategoryButton