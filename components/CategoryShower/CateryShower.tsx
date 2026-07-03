import { fetchCategories } from '@/lib/readux/categoryFetching'
import React, { useState } from 'react'
import type { ArticlesProp } from '@/lib/readux/articleFetchSlice';
import { useParams } from 'next/navigation';
import { AppDispatch } from '@/lib/readux/store';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import LoaderComponents from '../LoaderComponents';
import TimeAgo from '../ui/TimeAgo';
import { articleSlug } from '@/lib/utils';

const FALLBACK_IMG = 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg';

// ─── Hero Featured Card (image with dark overlay, title at bottom) ────────────
const HeroCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
  description,
}: {
  title?: string;
  slug?: string;
  createdAt?: string;
  blogImageUrl?: string;
  category?: string;
  description?: string;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group block relative rounded-xl overflow-hidden"
    style={{ aspectRatio: '16/10' }}
  >
    {/* Background image */}
    <Image
      src={blogImageUrl ?? FALLBACK_IMG}
      alt={title ?? 'featured article'}
      fill
      quality={80}
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      fetchPriority="high"
    />

    {/* Dark gradient overlay */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.10) 100%)',
      }}
    />

    {/* Content at the bottom */}
    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
      {category && (
        <div className="flex items-center gap-2">
          <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
            BREAKING
          </span>
          <span className="text-white text-[10px] font-semibold uppercase tracking-wide opacity-80">
            {category}
          </span>
        </div>
      )}
      <h2 className="text-white font-extrabold text-xl md:text-2xl leading-tight line-clamp-3 group-hover:text-red-300 transition-colors">
        {title ?? 'No title'}
      </h2>
      {description && (
        <p className="text-gray-300 text-xs line-clamp-2">{description}</p>
      )}
      <div className="flex items-center gap-3 mt-1">
        {createdAt && (
          <span className="text-gray-400 text-[11px]">
            <TimeAgo date={createdAt} />
          </span>
        )}
        <span className="text-gray-400 text-[11px] uppercase tracking-wider border border-gray-500 px-2 py-0.5 rounded-sm">
          EXCLUSIVE
        </span>
      </div>
    </div>
  </Link>
);

// ─── Side Thumbnail Card (small stacked on the right of hero) ─────────────────
const SideThumbnailCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
}: {
  title?: string;
  slug?: string;
  createdAt?: string;
  blogImageUrl?: string;
  category?: string;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group flex items-center gap-2 py-2 border-b border-white/10 last:border-0"
  >
    <div className="w-16 h-12 shrink-0 rounded overflow-hidden bg-gray-700">
      <Image
        src={blogImageUrl ?? FALLBACK_IMG}
        alt={title ?? 'article image'}
        width={80}
        height={60}
        quality={65}
        className="w-full h-full object-cover object-top"
      />
    </div>
    <div className="flex-1 min-w-0">
      {category && (
        <span className="text-[9px] font-bold uppercase tracking-wide text-red-400">
          {category}
        </span>
      )}
      <p className="text-white text-[11px] font-semibold leading-snug line-clamp-2 group-hover:text-red-300 transition-colors">
        {title ?? 'No title'}
      </p>
      {createdAt && (
        <span className="text-gray-400 text-[10px]">
          <TimeAgo date={createdAt} />
        </span>
      )}
    </div>
  </Link>
);

// ─── Trending Card (sidebar: large 16:9 thumbnail left, text right) ──────────
const TrendingCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
}: {
  title?: string;
  slug?: string;
  createdAt?: string;
  blogImageUrl?: string;
  category?: string;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group flex items-start gap-3 py-3 border-b border-[var(--color-divider)] last:border-0"
  >
    {/* Thumbnail — 160px wide, 16:9 */}
    <div
      className="relative shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
      style={{ width: '160px', aspectRatio: '16/9' }}
    >
      <Image
        src={blogImageUrl ?? FALLBACK_IMG}
        alt={title ?? 'article image'}
        fill
        quality={70}
        sizes="160px"
        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
      />
      {category && (
        <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
          {category}
        </span>
      )}
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0 flex flex-col gap-1 pt-0.5">
      <h4 className="text-sm font-bold text-[var(--color-headline)] line-clamp-3 group-hover:text-red-600 transition-colors leading-snug">
        {title ?? 'No title'}
      </h4>
      <span className="text-xs text-red-500 font-semibold uppercase tracking-wide">
        {category}
      </span>
      <TimeAgo date={createdAt} />
    </div>
  </Link>
);


// ─── Latest Story Card (3-col grid: image top, content below) ─────────────────
const LatestStoryCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
  description,
}: {
  title?: string;
  slug?: string;
  createdAt?: string;
  blogImageUrl?: string;
  category?: string;
  description?: string;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group block"
  >
    {/* Image */}
    <div className="w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative" style={{ aspectRatio: '16/9' }}>
      <Image
        src={blogImageUrl ?? FALLBACK_IMG}
        alt={title ?? 'article image'}
        fill
        quality={70}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      {category && (
        <div className="absolute top-2 left-2">
          <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
            {category}
          </span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="pt-3 flex flex-col gap-1">
      <h3 className="text-sm font-bold text-[var(--color-headline)] line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
        {title ?? 'No title'}
      </h3>
      {description && (
        <p className="text-xs text-[var(--color-meta)] line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}
      <div className="flex items-center gap-2 mt-1">
        <TimeAgo date={createdAt} />
      </div>
    </div>
  </Link>
);

// ─── Horizontal Scroll Card (fixed 260px, image top, content below) ───────────
const HScrollCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
}: {
  title?: string;
  slug?: string;
  createdAt?: string;
  blogImageUrl?: string;
  category?: string;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group flex-none block"
    style={{ width: '260px' }}
  >
    {/* Image */}
    <div
      className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
      style={{ aspectRatio: '16/9' }}
    >
      <Image
        src={blogImageUrl ?? FALLBACK_IMG}
        alt={title ?? 'article image'}
        fill
        quality={75}
        sizes="260px"
        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
      />
      {/* Category pill — white background like the reference image */}
      {category && (
        <div className="absolute top-2 left-2">
          <span className="bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="pt-2.5 flex flex-col gap-1">
      <h3 className="text-sm font-bold text-[var(--color-headline)] line-clamp-3 group-hover:text-red-600 transition-colors leading-snug">
        {title ?? 'No title'}
      </h3>
      <TimeAgo date={createdAt} />
    </div>
  </Link>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const CateryShower = ({ data }: { data: ArticlesProp | undefined }) => {
  const { articlecategory } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [fetchingMoreArticle, setFetchingMoreArticle] = useState(false);

  const moreArticle = async (fetchedArticleLength: number) => {
    setFetchingMoreArticle(true);
    await dispatch(fetchCategories({ category: `${articlecategory}`, fetchedArticleLength }));
    setFetchingMoreArticle(false);
  };

  if (!data || data.articles.length === 0) {
    return <LoaderComponents />;
  }

  const [featured, ...rest] = data.articles;
  // Horizontal scroll strip — shown above Latest Stories
  const hScroll = rest.slice(0, 6);
  // Trending sidebar
  const trending = rest.slice(6, 10);
  // Latest stories grid
  const latestStories = rest.slice(10);

  return (
    <main className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-10">

      {/* ── Top Two-Column Layout ── */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_1.4fr] gap-6">

        {/* Left: Hero with side thumbnail strip */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Hero image + overlay content */}
          <HeroCard
            title={featured.title}
            slug={featured.slug}
            createdAt={featured.createdAt}
            blogImageUrl={featured.blogImageUrl}
            category={featured.category}
            description={featured.description}
          />

        </div>

        {/* Right: Trending Now sidebar */}
        <aside className="flex flex-col gap-0">
          {/* Section header */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-red-600">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-headline)]">
              Trending Now
            </h2>
          </div>

          {/* Trending cards */}
          <div className="flex flex-col">
            {trending.map((article) => (
              <TrendingCard
                key={article._id}
                title={article.title}
                slug={article.slug}
                createdAt={article.createdAt}
                blogImageUrl={article.blogImageUrl}
                category={article.category}
              />
            ))}
          </div>

        </aside>
      </section>

      {/* ── Horizontal Scroll Strip ── */}
      {hScroll.length > 0 && (
        <section className="flex flex-col gap-4">
          {/* Heading */}
          <div className="flex items-center gap-2 pb-2 border-b-2 border-[var(--color-divider)]">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-headline)]">
              Top Stories
            </h2>
          </div>

          {/* Scrollable row */}
          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hScroll.map((article) => (
              <HScrollCard
                key={article._id}
                title={article.title}
                slug={article.slug}
                createdAt={article.createdAt}
                blogImageUrl={article.blogImageUrl}
                category={article.category}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Latest Stories Grid ── */}
      {latestStories.length > 0 && (
        <section className="flex flex-col gap-5">
          {/* Section heading */}
          <div className="flex items-center gap-2 pb-2 border-b-2 border-[var(--color-divider)]">
            <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[var(--color-headline)]">
              Latest Stories
            </h2>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestStories.map((article) => (
              <LatestStoryCard
                key={article._id}
                title={article.title}
                slug={article.slug}
                createdAt={article.createdAt}
                blogImageUrl={article.blogImageUrl}
                category={article.category}
                description={article.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Load More Button ── */}
      {data._id &&
        (data.sizeOfArticles ?? data.totalSizeOfArticles ?? 0) >
        (data.articles?.length ?? 0) && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => moreArticle(data.articles?.length || 0)}
              disabled={fetchingMoreArticle}
              className="
                w-full max-w-lg
                py-3 px-8
                border border-[var(--color-divider)]
                text-[var(--color-headline)] font-bold text-sm uppercase tracking-widest
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors rounded
                disabled:opacity-50
              "
            >
              {fetchingMoreArticle ? 'Loading...' : 'Load More Stories'}
            </button>
          </div>
        )}
    </main>
  );
};

export default CateryShower;