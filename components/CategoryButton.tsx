import React from 'react'

function CategoryButton({ category }: { category: string }) {
    return (
        <div className='absolute top-1 right-4 bg-pink-500 text-white font-serif p-2 px-4 rounded-md shadow-md lg-label-padding' style={{ boxShadow: "2px 2px 0px 0px white" }}>
            <span>{category ? category : "Horor"}</span>
        </div>
    )
}

export default CategoryButton