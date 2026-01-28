import { fetchCategories } from '@/lib/readux/categoryFetching';
import { AppDispatch, RootState } from '@/lib/readux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BlogContainer from './BlogContainer';

function RelatedArticleFetch({ category }: { category: string }) {
    const dispatch = useDispatch<AppDispatch>();

    const { data, loading, error } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        if (data && (data[category as string]?.articles?.length ?? 0) != 0) return
        dispatch(fetchCategories({ category: `${category}`, fetchedArticleLength: 0 }));
    }, [category])

    const moreArticle = (fetchedArticleLength: number) => {
        dispatch(fetchCategories({ category: `${category}`, fetchedArticleLength: fetchedArticleLength }));
    };

    return (
        <section className='max-w-screen-lg mx-auto px-3 mt-2'>

            <h1 className='font-bold lg:text-4xl text-2xl text-center mb-2'>Related Articles {category.toUpperCase()}</h1>

            {data && data[category]?.articles?.map((elem, index) =>
                <BlogContainer {...elem} key={index} className='shadow-md' />)}

            {data && data[category]?._id &&
                ((data[category]?.totalSizeOfArticles ?? 0) > (data[category]?.articles?.length ?? 0)) &&
                <div className='text-center p-2 mt-4'>
                    <span onClick={() => moreArticle(data[category].articles?.length)} className='text-white bg-black p-2 rounded-md mt-4 cursor-pointer'>More Article</span>
                </div>
            }
        </section>
    )
}

export default React.memo(RelatedArticleFetch)