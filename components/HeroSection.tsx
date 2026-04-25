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
      <div className="news-card px-3 py-1">
        {list.map((art) => (
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

      <div className="news-card px-3 py-1">
        {articles.slice(0, 5).map((art) => (
          <ArticleCard
            key={art._id}
            variant="horizontal"
            title={art.title}
            slug={art.slug}
            createdAt={art.createdAt}
            blogImageUrl={art.blogImageUrl}
            category={art.category}
          />
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