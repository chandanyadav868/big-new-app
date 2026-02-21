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
  const { trending } = useSelector((state: RootState) => state.article);

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
              {trending.slice(3, 5).map((elem, index) =>
                <BlogContainer index={index} {...elem} key={index} className='shadow-md flex-col outline-4 outline outline-gray-200 max-w-[300px] shrink max-sm:mx-auto' />
              )}

            </div>

            <>
              {/* below hero section wweSection */}
              <div>
                <HeroBelowComponents category={"wwe"} />
              </div>

              {/* below hero section cricketSection */}
              <div>
                <HeroBelowComponents category={"cricket"} />
              </div>

              {/* below hero section aewSection */}
              <div>
                <HeroBelowComponents category={"aew"} />
              </div>

              {/* below hero section free-fireSection */}
              <div>
                <HeroBelowComponents category={"free-fire"} />
              </div>
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