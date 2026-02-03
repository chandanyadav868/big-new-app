"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export interface PostDataProps {
  ID: number
  comment_count: number
  comment_status: string
  guid: string
  menu_order: number
  ping_status: string
  pinged: string
  post_author: number
  post_content: string
  post_content_filtered: string
  post_date: string
  post_date_gmt: string
  post_excerpt: string
  post_mime_type: string
  post_modified: string
  post_modified_gmt: string
  post_name: string
  post_parent: number
  post_password: string
  post_status: string
  post_title: string
  post_type: string
  to_ping: string
}

export interface webStoriesProps {
  align: string
  blockType: string
  height: string
  poster: string
  stories: number[]
  title: string
  url: string
  width: string
}

function webStories() {
  const [processing, setProcessing] = React.useState(false);
  const [stories, setStories] = useState<webStoriesProps[]>([]);
  const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL!

  // post_content starting with <!-- wp:web-stories/embed this is story

  useEffect(() => {
    const response = async () => {
      try {
        setProcessing(true)
        const res = await fetch(`/api/mysql/allStories`);
        const dataJason = await res.json();

        console.log({dataJason});
        

        const dataPost: PostDataProps[] = dataJason?.data?.filter((v: PostDataProps, i: number) => v.post_content.startsWith(`<!-- wp:web-stories/embed`));

        console.log({dataPost});

        const transformatedDataPost = dataPost?.map((v, i) => {
          const matchedData: RegExpMatchArray | null = v?.post_content?.match(/<!--\s*wp:web-stories\/embed\s*(\{[\s\S]*?\})\s*-->/);

          const jsonExtractedData: webStoriesProps = JSON.parse(matchedData?.[1] ?? '[]');

          console.log({jsonExtractedData});
          

          const newsModified = { ...jsonExtractedData, url: jsonExtractedData?.url?.replace('http://wordpress-p8ssocw08c44ck4goo0ogg0k.46.202.167.245.sslip.io', WEBSITE_URL) };

          console.log(newsModified);
          

          return newsModified

        })

        setStories((prev) => ([...transformatedDataPost, ...prev]))

      } catch (error) {
        console.log("Error in Mysql connection:- ", error);
      } finally {
        setProcessing(false)
      }
    }
    response()
  }, []);


  return (
    <div className='max-w-5xl mx-auto min-h-screen'>
      {/* story shower compoents */}
      <h2 className='text-4xl font-bold text-center' style={{ lineHeight: "3.25rem" }}>Web Story</h2>

      <div className='p-2 flex flex-wrap gap-4'>
         { processing && <span className='text-3xl font-bold text-center'>Loading...</span> }
        {
          stories.length > 0 ? stories?.map((v, i) => (
            <div className='shadow-md outline outline-1 outline-orange-950 p-2 rounded-2xl hover:shadow-[2px_2px_28px_-14px_black]' key={i} style={{ maxWidth: `${v.width}px` }}>
              <Link href={`${v.url}`}>
                <h2 className='text-3xl font-bold line-clamp-1' style={{ lineHeight: "3.25rem" }}>{v.title}</h2>
                <Image decoding='async' quality={98} key={i} className='rounded-2xl shadow-md object-cover' src={v.poster
                } alt={v.title} width={Number(v.width)} height={Number(v.height)} loading='lazy' style={{aspectRatio:"3/4"}}/>
              </Link>
            </div>
          )):
          !processing && <span className='text-3xl font-bold text-center'>No Result</span>
        }
      </div>
    </div>
  )
}

export default webStories