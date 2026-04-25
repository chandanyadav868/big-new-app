import { fetchCategories } from '@/lib/readux/categoryFetching';
import { AppDispatch, RootState } from '@/lib/readux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from './ui/ArticleCard';

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
        <aside role='related article container' className='max-w-screen-lg mx-auto px-3 mt-2'>

            <h1 className='font-bold lg:text-2xl text-xl mb-4 text-[var(--color-headline)] border-b border-[var(--color-divider)] pb-2'>Related {category.toUpperCase()}</h1>

            <div className="flex flex-col gap-1">
                {data && data[category]?.articles?.map((elem) => (
                    <ArticleCard key={elem._id} variant="horizontal" {...elem} />
                ))}
            </div>

            {data && data[category]?._id &&
                ((data[category]?.sizeOfArticles ?? 0) > (data[category]?.articles?.length ?? 0)) &&
                <div className='text-center p-2 mt-4'>
                    <span onClick={() => moreArticle(data[category].articles?.length)} className='text-white bg-black p-2 rounded-md mt-4 cursor-pointer'>More Article</span>
                </div>
            }
        </aside>
    )
}

export default React.memo(RelatedArticleFetch)