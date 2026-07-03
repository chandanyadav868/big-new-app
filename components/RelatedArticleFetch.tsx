import { fetchCategories } from '@/lib/readux/categoryFetching';
import { AppDispatch, RootState } from '@/lib/readux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { articleSlug } from '@/lib/utils';
import TimeAgo from './ui/TimeAgo';

const FALLBACK_IMG = 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg';

function RelatedArticleFetch({ category }: { category: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        if (data && (data[category as string]?.articles?.length ?? 0) != 0) return;
        dispatch(fetchCategories({ category: `${category}`, fetchedArticleLength: 0 }));
    }, [category]);

    const moreArticle = (fetchedArticleLength: number) => {
        dispatch(fetchCategories({ category: `${category}`, fetchedArticleLength }));
    };

    const articles = data?.[category]?.articles ?? [];

    return (
        <aside role="related article container" className="max-w-screen-lg mx-auto px-3 mt-2">

            {/* Section heading */}
            <h1 className="font-bold lg:text-2xl text-xl mb-5 text-[var(--color-headline)] border-b border-[var(--color-divider)] pb-2">
                Trending Now
            </h1>

            {/* Article list */}
            <div className="flex flex-col gap-4">
                {articles.map((elem) => (
                    <Link
                        key={elem._id}
                        href={articleSlug({ slug: elem.slug, createdAt: elem.createdAt })}
                        aria-label={`Read article: ${elem.title ?? 'article'}`}
                        className="group flex gap-3 items-start"
                    >
                        {/* Thumbnail — 16:9, min-w so it never shrinks */}
                        <div
                            className="relative shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                            style={{ width: '160px', aspectRatio: '16/9' }}
                        >
                            <Image
                                src={elem.blogImageUrl ?? FALLBACK_IMG}
                                alt={elem.title ?? 'article image'}
                                fill
                                quality={70}
                                sizes="160px"
                                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Category badge */}
                            {elem.category && (
                                <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                                    {elem.category}
                                </span>
                            )}
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col gap-1 min-w-0 flex-1 pt-0.5">
                            <h3 className="text-sm font-bold text-[var(--color-headline)] leading-snug line-clamp-3 group-hover:text-red-600 transition-colors">
                                {elem.title ?? 'No title'}
                            </h3>
                            <span className="text-xs text-red-500 font-semibold uppercase tracking-wide">
                                {elem.category}
                            </span>
                            <span className="text-xs text-[var(--color-meta)]">
                                <TimeAgo date={elem.createdAt} />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load more */}
            {data?.[category]?._id &&
                ((data[category]?.sizeOfArticles ?? 0) > (data[category]?.articles?.length ?? 0)) && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => moreArticle(articles.length)}
                        className="text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 px-5 py-2 rounded-full hover:opacity-80 transition-opacity"
                    >
                        More Articles
                    </button>
                </div>
            )}
        </aside>
    );
}

export default React.memo(RelatedArticleFetch);