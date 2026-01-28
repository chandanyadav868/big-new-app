import { categoryFetchedData, fetchCategories } from '@/lib/readux/categoryFetching'
import React, { useState } from 'react'
import BlogContainer from '../BlogContainer';
import HeroSection from '../HeroSection';
import { ArticlesProp } from '@/lib/readux/articleFetchSlice';
import { useParams } from 'next/navigation';
import { AppDispatch } from '@/lib/readux/store';
import { useDispatch } from 'react-redux';

const CateryShower = ({ data }: { data: ArticlesProp | undefined }) => {
  const { articlecategory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [fetchingMoreArticle,setFetchingMoreArticle] = useState(false)
  
  const moreArticle = async (fetchedArticleLength: number) => {
    setFetchingMoreArticle(true)
     dispatch(fetchCategories({ category: `${articlecategory}`, fetchedArticleLength: fetchedArticleLength }));
    setFetchingMoreArticle(false)
  };

  return (
    // <h1>Hello</h1>
    <main className='lg:max-w-[80%] max-lg:w-[98%] mx-auto flex flex-col gap-4'>
      {/* Header  */}

      {/* Hero Section */}
      {data && data.articles.length > 0 && (
        <HeroSection newArticle={data.articles.slice(0, 3)} />)}

      <div className='grid gap-4 lg:grid-cols-2'>
        {data && data.articles.slice(3,).map((elem, index) =>
          <BlogContainer {...elem} key={elem._id} className='shadow-md ' />
        )}
      </div>

      {data && data._id &&
        ((data.totalSizeOfArticles ?? 0) > (data.articles?.length ?? 0)) &&
        <div className='text-center p-2 mt-4'>
          <span onClick={() => moreArticle(data.articles?.length)} className='text-white bg-black p-2 rounded-md mt-4 cursor-pointer'>
            {fetchingMoreArticle?"Loading":"More Article"}
            </span>
        </div>
      }
    </main>
  )
}

export default CateryShower