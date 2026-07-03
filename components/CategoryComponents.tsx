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
import Link from 'next/link';
import Image from 'next/image';
import TimeAgo from './ui/TimeAgo';
import { articleSlug } from '@/lib/utils';

const FALLBACK_IMG = 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg';

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
        {/* YouTube-style large thumbnail list */}
        <div className="flex flex-col gap-4">
          {restArticles.slice(0, 4).map((art) => (
            <Link
              key={art._id}
              href={articleSlug({ slug: art.slug, createdAt: art.createdAt })}
              aria-label={`Read article: ${art.title ?? 'article'}`}
              className="group flex items-start gap-3"
            >
              {/* Thumbnail — 160px wide, 16:9 */}
              <div
                className="relative shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                style={{ width: '160px', aspectRatio: '16/9' }}
              >
                <Image
                  src={art.blogImageUrl ?? FALLBACK_IMG}
                  alt={art.title ?? 'article image'}
                  fill
                  quality={70}
                  sizes="160px"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                {art.category && (
                  <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                    {art.category}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
                <h3 className="text-sm font-bold text-[var(--color-headline)] line-clamp-3 group-hover:text-red-600 transition-colors leading-snug">
                  {art.title ?? 'No title'}
                </h3>
                <span className="text-xs text-red-500 font-semibold uppercase tracking-wide">
                  {art.category}
                </span>
                <TimeAgo date={art.createdAt} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;