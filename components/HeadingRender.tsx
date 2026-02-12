import React from 'react'

function HeadingRender({title}:{title:string}) {
  return (
         <h1 className='px-4 py-2 text-4xl font-extrabold hyphens-manual max-sm:text-2xl'>{title}</h1>
  )
}

export default HeadingRender