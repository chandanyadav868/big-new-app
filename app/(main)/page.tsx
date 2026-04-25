"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/lib/readux/store';
import { articleAsyncFetching } from '@/lib/readux/articleFetchSlice';
import type { HeroSectionProps } from '@/lib/types';
import HeroSection from '../../components/HeroSection';
import CategorySection from '../../components/CategoryComponents';
import LoaderComponents from '../../components/LoaderComponents';
import ArticleCard from '../../components/ui/ArticleCard';
import SectionHeading from '../../components/ui/SectionHeading';

// ─── "For You" Section ────────────────────────────────────────────────────────
/**
 * ForYouSection — a horizontally scrollable row of compact cards.
 * Populated from trending articles (index 4–11) since true personalisation
 * isn't available without a user preference API.
 */
const ForYouSection = ({ articles }: { articles: HeroSectionProps[] }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <SectionHeading title="For You" />

      {/* Horizontally scrollable card strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {articles.map((art) => (
          <div
            key={art._id}
            className="shrink-0 w-64 news-card overflow-hidden hover:shadow-md transition-shadow"
          >
            <ArticleCard
              variant="featured"
              title={art.title}
              slug={art.slug}
              createdAt={art.createdAt}
              blogImageUrl={art.blogImageUrl}
              category={art.category}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Root Page ────────────────────────────────────────────────────────────────
const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Pull both trending (for hero + for-you) and article (for category sections)
  const { trending, article, loading } = useSelector(
    (state: RootState) => state.article
  );

  // Fetch all articles once on mount
  useEffect(() => {
    dispatch(articleAsyncFetching());
  }, [dispatch]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading || trending.length === 0) {
    return <LoaderComponents />;
  }

  // ── Sorted categories — newest article first ──────────────────────────────
  const sortedCategories = article
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.articles?.[0]?.createdAt ?? 0).getTime() -
        new Date(a.articles?.[0]?.createdAt ?? 0).getTime()
    ) ?? [];

  return (
    <main className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-10">

      {/* ── 1. Hero: Top Stories + Local News ─────────────────────────── */}
      {trending.length > 0 && (
        <HeroSection newArticle={trending.slice(0, 9)} />
      )}

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <hr className="border-[var(--color-divider)]" />

      {/* ── 2. For You — horizontal scroll strip ──────────────────────── */}
      {trending.length > 4 && (
        <ForYouSection articles={trending.slice(4, 12)} />
      )}

      {/* ── Divider ───────────────────────────────────────────────────── */}
      <hr className="border-[var(--color-divider)]" />

      {/* ── 3. Category topic clusters ────────────────────────────────── */}
      <section className="flex flex-col gap-10">
        {sortedCategories.map((cat) =>
          // Only render categories that have enough articles to fill the section
          cat.sizeOfArticles > 5 ? (
            <React.Fragment key={cat._id}>
              <CategorySection category={cat._id} />
              <hr className="border-[var(--color-divider)]" />
            </React.Fragment>
          ) : null
        )}
      </section>

    </main>
  );
};

export default RootPage;