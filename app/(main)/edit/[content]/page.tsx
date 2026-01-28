"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ContentEditor from '@/components/ContendEditor';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/readux/store';
import { singleArticleEditFetching } from '@/lib/readux/editContent';

export interface PropsContentEdit {
  blogImageUrl?: string;
  category?: string;
  slug?: string;
  content?: string;
  alt?: string;
  title?: string;
  description?: string;
  featuredImagealt?: string;
  _id?: string;
}

const ContentEdit = () => {
  const [article, setAricle] = useState<PropsContentEdit | null>(null)
  const { content } = useParams(); // Await params to extract the `content` property

  // article loading
  useEffect(() => {
    const response = async () => {
      const WEBSITE_URL = process.env.WEBSITE_URL

      try {
        const response = await fetch(`${WEBSITE_URL}/api/editArticle?contentId=${content}`);
        const jsonConverted = await response.json();
        if (response.status === 200) {
          setAricle(jsonConverted?.data);
          return
        }
        throw new Error(JSON.stringify(jsonConverted))
      } catch (error) {
        console.log("Error in articleSingleFetching", error);
      }
    }
    response();
  }, [content])

  return (
    <div>
      {article ? (
        <ContentEditor key={article?._id} {...article} />
      ) : (
        <p>Loading or No Article Found</p>
      )}
    </div>
  )
}

export default ContentEdit