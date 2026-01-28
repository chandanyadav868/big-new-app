'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/readux/store'
import { fetchCategories } from '@/lib/readux/categoryFetching';
import CateryShower from '@/components/CategoryShower/CateryShower';
import LoaderComponents from '@/components/LoaderComponents';

const Page = () => {
  const { articlecategory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, error, loading } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    if (data && (data[articlecategory as string]?.articles?.length ?? 0) != 0) return
    dispatch(fetchCategories({ category: `${articlecategory}`, fetchedArticleLength: 0 }));
  }, [ articlecategory ])

  return (
    <section className='py-4'>
      {data ?
        <CateryShower data={data[articlecategory as string]} />
        :
        <> <LoaderComponents /> </>}
    </section>
  )
}

export default Page