import React, { useEffect, useState } from 'react'
import BigContainer from './BigContainer'
import SideContainer from './SideContainer'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/readux/store';
import { HeroSectionProps } from './HeroSection';
import { Article, ArticlesProp } from '@/lib/readux/articleFetchSlice';

interface HeroBelowComponentsProps {
  category: string;
}

function HeroBelowComponents({ category }: HeroBelowComponentsProps) {
  const [filteredValued, setfilteredValued] = useState<ArticlesProp | undefined>();
  const { article, error, loading } = useSelector((state: RootState) => state.article);
  // console.log({article});


  useEffect(() => {
    if (article) {
      const filteredValued = article.find((filter) => filter._id === category);
      // console.log("Filtered value of cricket",filteredValued);
      setfilteredValued(filteredValued)
    }

  }, [article]);

  return (
    <>
      <div className='shadow-md rounded-md bg-slate-500 mb-4 bg-gradient-to-r to-red-300 from-red-500'>
        <h1 className='text-center text-white text-4xl font-bold p-2 max-md:text-2xl'>{category.toUpperCase()}</h1>
      </div>
      <div className='grid grid-cols-2 gap-4 max-lg:grid-cols-1 '>
        {/* big container */}
        {filteredValued && filteredValued.articles.slice(0, 1).map((elem, index) =>
          <BigContainer key={elem._id} className='' {...elem} />
        )}

        {/* small container */}
        <div className='shrink-0 max-lg:w-full grid grid-cols-1 gap-2'>
          {filteredValued && filteredValued.articles.slice(1).map((elem, index) =>
            <SideContainer {...elem} className='' key={index} />
          )}
        </div>
      </div>
    </>
  )
}

export default HeroBelowComponents