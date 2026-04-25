"use client";

/**
 * CategoryComponents — renders a topic/category cluster section on the homepage.
 *
 * Layout per category:
 *  Left  (1/2): 1 FeaturedCard (the newest article in this category)
 *  Right (1/2): stacked CompactCards for the remaining articles
 *
 * Receives `category` — the category ID string (e.g. "cricket").
 * Reads filtered articles from Redux store.
 *
 * Only shown when the category has > 5 articles (controlled by the parent page).
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/readux/store';
import type { ArticlesProp } from '@/lib/readux/articleFetchSlice';
import ArticleCard from './ui/ArticleCard';
import SectionHeading from './ui/SectionHeading';

interface CategorySectionProps {
  /** The category slug/ID to display (e.g. "cricket") */
  category: string;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  // Find this category's articles from the global Redux article store
  const { article } = useSelector((state: RootState) => state.article);
  const [filtered, setFiltered] = useState<ArticlesProp | undefined>();

  useEffect(() => {
    if (article) {
      const match = article.find((item) => item._id === category);
      setFiltered(match);
    }
  }, [article, category]);

  // Don't render if there are no articles for this category
  if (!filtered || filtered.articles.length === 0) return null;

  const [featuredArticle, ...restArticles] = filtered.articles;

  return (
    <section className="flex flex-col gap-3">
      {/* Section heading with "See all" link */}
      <SectionHeading
        title={category.replace(/-/g, ' ')}
        seeAllHref={`/category/${category}`}
        seeAllLabel="See all"
      />

      {/* Two-column grid: featured left, compact list right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Featured article — large image */}
        <ArticleCard
          variant="featured"
          title={featuredArticle.title}
          slug={featuredArticle.slug}
          createdAt={featuredArticle.createdAt}
          blogImageUrl={featuredArticle.blogImageUrl}
          category={featuredArticle.category}
          description={featuredArticle.description}
        />

        {/* Compact list of remaining articles */}
        <div className="news-card px-3 py-1">
          {restArticles.slice(0, 4).map((art) => (
            <ArticleCard
              key={art._id}
              variant="compact"
              title={art.title}
              slug={art.slug}
              createdAt={art.createdAt}
              blogImageUrl={art.blogImageUrl}
              category={art.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;