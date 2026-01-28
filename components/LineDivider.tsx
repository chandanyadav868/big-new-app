import React from 'react'

function LineDivider({className}:{className?:string}) {
  return (
    <hr className={`w-full h-0.5 rounded-full border-0 bg-black ${className}`}/>
   
  )
}

export default LineDivider