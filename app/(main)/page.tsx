"use client";

import BlogContainer from '../../components/BlogContainer';
import HeroSection from '../../components/HeroSection';
import HeroBelowComponents from '../../components/CategoryComponents';
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/readux/store";
import { useDispatch, useSelector } from "react-redux";
import { articleAsyncFetching } from "@/lib/readux/articleFetchSlice";
import LoaderComponents from '../../components/LoaderComponents';

const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trending, article } = useSelector((state: RootState) => state.article);

  useEffect(() => {
    dispatch(articleAsyncFetching());
  }, [dispatch]);

  return (
    <>
      {trending.length > 0 ?
        <>
          <main className='mx-auto flex flex-col gap-4 py-4 px-2'>

            {/* Hero Section */}
            {trending.length > 0 && (
              <HeroSection newArticle={trending.slice(0, 3)} />)}

            <div className='flex gap-4 max-md:flex-wrap '>
              {trending.slice(3, 7).map((elem, index) =>
                <BlogContainer index={index} {...elem} key={index} className='shadow-md flex-col outline-4 outline outline-gray-200 lg:max-w-[300px] max-md:grid max-md:grid-cols-2 max-sm:flex max-sm:flex-wrap shrink max-sm:mx-auto' />
              )}

            </div>

            <>
              {/* below hero section wweSection */}

              {article?.slice(0).sort((a, b) => new Date(b.articles?.[0].createdAt).getTime() - new Date(a.articles?.[0].createdAt).getTime()).map((v, i) => (
                v.sizeOfArticles > 5 && <div key={v._id}>
                  <HeroBelowComponents category={v._id} />
                </div>
              ))}

            </>

          </main>

        </>
        :
        <>
          <LoaderComponents />
        </>}

    </>
  )
}

export default RootPage











{/* <div>RootPage
<ShortBlogContainer/>
</div> */}

{/* blogshowing Card */ }
{/* <section className='grid p-6 gap-4'>
<BlogContainer/>
<BlogContainer/>
</section> */}