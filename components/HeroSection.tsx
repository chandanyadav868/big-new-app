"use client";

/**
 * HeroSection — the top two-column section of the homepage.
 *
 * Layout (desktop):
 *  Left  (2/3): "Top Stories" — 1 featured article + 2–3 compact article cards
 *  Right (1/3): "Local News"  — 4 compact horizontal cards in a panel
 *
 * On mobile both columns stack vertically.
 *
 * Receives `newArticle` — the first 7 trending articles from Redux state.
 * Articles [0]    → featured (left panel hero)
 * Articles [1-3]  → compact list (left panel below hero)
 * Articles [4-7]  → local news right panel
 */

import React from 'react';
import ArticleCard from './ui/ArticleCard';
import SectionHeading from './ui/SectionHeading';
import type { HeroSectionProps } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import TimeAgo from './ui/TimeAgo';
import { articleSlug } from '@/lib/utils';

const FALLBACK_IMG = 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg';

// Re-export for backward compatibility (SideContainer, BlogContainer still import from './HeroSection')
export type { HeroSectionProps };

interface HeroProps {
  newArticle: HeroSectionProps[];
}

// ─── Left panel: Top Stories ──────────────────────────────────────────────────
/**
 * Shows the biggest/featured article at the top, then a compact list below.
 */
const TopStoriesPanel = ({ articles }: { articles: HeroSectionProps[] }) => {
  const featured = articles[0];
  const list     = articles.slice(1, 4);

  return (
    <section className="flex flex-col gap-3">
      <SectionHeading title="Top Stories" />

      {/* Featured article — large image + title */}
      {featured && (
        <ArticleCard
          variant="featured"
          title={featured.title}
          slug={featured.slug}
          createdAt={featured.createdAt}
          blogImageUrl={featured.blogImageUrl}
          category={featured.category}
          description={featured.description}
        />
      )}

      {/* Compact list below the hero image */}
      <div className="flex flex-col gap-4 mt-2">
        {list.map((art) => (
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
    </section>
  );
};

// ─── Right panel: Local News ──────────────────────────────────────────────────
/**
 * A narrower sidebar panel showing 4 horizontal cards.
 * Visually separated from the left column by a thin border.
 */
const LocalNewsPanel = ({ articles }: { articles: HeroSectionProps[] }) => {
  return (
    <aside className="flex flex-col gap-3">
      <SectionHeading title="Local News" />

      <div className="flex flex-col gap-4 mt-2">
        {articles.slice(0, 5).map((art) => (
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
    </aside>
  );
};

// ─── HeroSection ─────────────────────────────────────────────────────────────
const HeroSection = ({ newArticle }: HeroProps) => {
  if (!newArticle || newArticle.length === 0) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Left: Top Stories */}
      <TopStoriesPanel articles={newArticle.slice(0, 4)} />

      {/* Right: Local News sidebar */}
      <LocalNewsPanel articles={newArticle.slice(4, 9)} />
    </section>
  );
};

export default HeroSection;