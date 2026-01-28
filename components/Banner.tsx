"use client"
import Image from 'next/image'
import React from 'react'

function Banner({banner}:{banner:string}) {
  return (
    <Image src={banner} alt='default banner' width={100} height={100} className='w-full h-[200px] object-cover rounded-md shadow-md' />
  )
}

export default React.memo(Banner)