import { categoryFetchedData, fetchCategories } from '@/lib/readux/categoryFetching'
import React, { useState } from 'react'
import BlogContainer from '../BlogContainer';
import HeroSection from '../HeroSection';
import { ArticlesProp } from '@/lib/readux/articleFetchSlice';
import { useParams } from 'next/navigation';
import { AppDispatch } from '@/lib/readux/store';
import { useDispatch } from 'react-redux';
import SideContainer from '../SideContainer';
import BigContainer from '../BigContainer';
import Banner_width_height_320_250 from '../adsComponents/banner/simple/banner_width_height_320_250';

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
    <main className=' mx-auto flex flex-col gap-4 p-1'>
      {/* Header  */}

      {/* Hero Section */}
      {data && data.articles.length > 0 && (
        <HeroSection newArticle={data.articles.slice(0, 3)} />)
      }

         <div className='grid grid-cols-2 gap-4 max-lg:grid-cols-1 '>
        {/* big container */}
        {data && data.articles.slice(3, 4).map((elem, index) =>
          <BigContainer key={elem._id} className='' {...elem} />
        )}

        {/* small container */}
        <div className='shrink-0 grid grid-cols-2 gap-2 max-[426px]:grid-cols-1'>
          {data && data.articles.slice(4,9).map((elem, index) =>
            <SideContainer {...elem} className='' key={index} />
          )}
        </div>
      </div>


      <div className='flex gap-2 flex-wrap justify-center'>
        {data && data.articles.slice(9,).map((elem, index) =>
          <BlogContainer adsShow={true} index={index} {...elem} key={elem._id} className='shadow-md flex-col outline-4 outline outline-gray-200 max-w-[300px]' />
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