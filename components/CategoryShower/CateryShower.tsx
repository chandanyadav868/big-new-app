import { categoryFetchedData, fetchCategories } from '@/lib/readux/categoryFetching'
import React, { useState } from 'react'
import type { ArticlesProp } from '@/lib/readux/articleFetchSlice';
import { useParams } from 'next/navigation';
import { AppDispatch } from '@/lib/readux/store';
import { useDispatch } from 'react-redux';
import ArticleCard from '../ui/ArticleCard';
import SectionHeading from '../ui/SectionHeading';
import LoaderComponents from '../LoaderComponents';

const CateryShower = ({ data }: { data: ArticlesProp | undefined }) => {
  const { articlecategory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [fetchingMoreArticle, setFetchingMoreArticle] = useState(false);

  const moreArticle = async (fetchedArticleLength: number) => {
    setFetchingMoreArticle(true);
    await dispatch(fetchCategories({ category: `${articlecategory}`, fetchedArticleLength: fetchedArticleLength }));
    setFetchingMoreArticle(false);
  };

  if (!data || data.articles.length === 0) {
    return <LoaderComponents />;
  }

  const [featured, ...rest] = data.articles;

  console.log('featured', data);

  return (
    <main className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-8">
      <SectionHeading title={`${articlecategory} News`.toUpperCase()} />

      {/* Hero Section for Category */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* Left Column: Featured + Top List */}
        <div className="flex flex-col gap-4">
          <ArticleCard
            variant="featured"
            title={featured.title}
            slug={featured.slug}
            createdAt={featured.createdAt}
            blogImageUrl={featured.blogImageUrl}
            category={featured.category}
            description={featured.description}
          />

          <div className="news-card px-3 py-1">
            {rest.slice(0, 3).map((elem) => (
              <ArticleCard
                key={elem._id}
                variant="compact"
                {...elem}
              />
            ))}
          </div>
        </div>

        {/* Right Column: More Articles List */}
        <aside className="flex flex-col gap-3">
          <div className="news-card px-3 py-1 h-full">
            {rest.slice(3, 10).map((elem) => (
              <ArticleCard
                key={elem._id}
                variant="horizontal"
                {...elem}
              />
            ))}
          </div>
        </aside>

      </section>

      {/* Remaining Grid for deeper scroll */}
      {rest.length > 10 && (
        <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-divider)]">
          <SectionHeading title="More Articles" />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.slice(10).map((elem) => (
              <div key={elem._id} className="news-card px-3 py-3 h-full">
                <ArticleCard
                  variant="compact"
                  {...elem}
                />
              </div>
            ))}
          </section>
        </div>
      )}

      {/* Load More Button */}
      {data._id && ((data.sizeOfArticles ?? data.totalSizeOfArticles ?? 0) > (data.articles?.length ?? 0)) && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => moreArticle(data.articles?.length || 0)}
            disabled={fetchingMoreArticle}
            className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-[var(--color-headline)] hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold rounded-full transition-colors disabled:opacity-50"
          >
            {fetchingMoreArticle ? "Loading..." : "Load More Articles"}
          </button>
        </div>
      )}
    </main>
  );
}

export default CateryShower;