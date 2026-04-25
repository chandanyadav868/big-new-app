/**
 * ArticleCard — the primary reusable article card used throughout the site.
 *
 * Supports three display variants:
 *  - "compact"  : thumbnail on the RIGHT, title + source + time on the LEFT.
 *                 Used in Top Stories list, For You section, Category sections.
 *  - "featured" : large image on TOP, title + meta BELOW.
 *                 Used in the hero/top-story slot of each section.
 *  - "horizontal": thumbnail left (small), content right.
 *                 Used in side panels and "Local news" column.
 */

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { articleSlug } from '@/lib/utils';
import TimeAgo from './TimeAgo';
import CategoryPill from './CategoryPill';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ArticleCardProps {
  /** Article title */
  title?: string;
  /** Short description / excerpt */
  description?: string;
  /** URL-friendly slug for the article */
  slug?: string;
  /** ISO date string of publication */
  createdAt?: string;
  /** Full URL of the featured image */
  blogImageUrl?: string;
  /** Category slug (e.g. "cricket") */
  category?: string;
  /** Display variant — controls layout */
  variant?: 'compact' | 'featured' | 'horizontal';
  /** Optional extra wrapper classes */
  className?: string;
}

// ─── Fallback image ───────────────────────────────────────────────────────────
const FALLBACK_IMG = 'https://mannatthemes.com/blogloo/default/assets/images/blogs/4.jpg';

// ─── Sub-component: Article Link Wrapper ─────────────────────────────────────
/** Wraps children in an <a> that links to the article page */
const ArticleLink = ({
  slug,
  createdAt,
  title,
  children,
}: {
  slug?: string;
  createdAt?: string;
  title?: string;
  children: React.ReactNode;
}) => (
  <Link
    href={articleSlug({ slug, createdAt })}
    aria-label={`Read article: ${title ?? 'article'}`}
    className="group block"
  >
    {children}
  </Link>
);

// ─── Compact Variant ──────────────────────────────────────────────────────────
/**
 * Compact card: text left, small thumbnail right.
 * Ideal for lists — takes minimal vertical space.
 */
const CompactCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
}: ArticleCardProps) => (
  <ArticleLink slug={slug} createdAt={createdAt} title={title}>
    <div className="flex items-start gap-3 py-3 border-b border-[var(--color-divider)] last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg px-1">
      {/* Text content */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Category label — plain span inside link to avoid nested <a> */}
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-red-600">
            {category}
          </span>
        )}
        <h3 className="text-sm font-semibold text-[var(--color-headline)] line-clamp-3 group-hover:text-red-600 transition-colors leading-snug">
          {title ?? 'No title'}
        </h3>
        <TimeAgo date={createdAt} />
      </div>

      {/* Thumbnail */}
      <div className="w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={blogImageUrl ?? FALLBACK_IMG}
          alt={title ?? 'article image'}
          width={120}
          height={80}
          quality={70}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  </ArticleLink>
);

// ─── Featured Variant ─────────────────────────────────────────────────────────
/**
 * Featured card: large image on top, title + meta below.
 * Used as the lead story in hero and category sections.
 */
const FeaturedCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
  description,
}: ArticleCardProps) => (
  <ArticleLink slug={slug} createdAt={createdAt} title={title}>
    <div className="flex flex-col gap-2 h-full">
      {/* Image */}
      <div className="w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
        <Image
          src={blogImageUrl ?? FALLBACK_IMG}
          alt={title ?? 'featured article image'}
          width={800}
          height={450}
          quality={75}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full object-cover object-top"
          style={{ aspectRatio: '16/9' }}
          fetchPriority="high"
        />
        {/* Category chip overlaid on image */}
        {category && (
          <div className="absolute top-2 left-2">
            <CategoryPill category={category} size="md" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 px-1">
        <h2 className="text-base font-bold text-[var(--color-headline)] line-clamp-3 group-hover:text-red-600 transition-colors leading-snug">
          {title ?? 'No title'}
        </h2>
        {description && (
          <p className="text-xs text-[var(--color-meta)] line-clamp-2">{description}</p>
        )}
        <TimeAgo date={createdAt} />
      </div>
    </div>
  </ArticleLink>
);

// ─── Horizontal Variant ───────────────────────────────────────────────────────
/**
 * Horizontal card: small thumbnail LEFT, text right.
 * Used in sidebar panels and "Local news" column.
 */
const HorizontalCard = ({
  title,
  slug,
  createdAt,
  blogImageUrl,
  category,
}: ArticleCardProps) => (
  <ArticleLink slug={slug} createdAt={createdAt} title={title}>
    <div className="flex items-start gap-3 py-2.5 border-b border-[var(--color-divider)] last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg px-1">
      {/* Thumbnail */}
      <div className="w-16 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={blogImageUrl ?? FALLBACK_IMG}
          alt={title ?? 'article image'}
          width={80}
          height={64}
          quality={65}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Text — plain category span to avoid nested <a> */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-red-600">
            {category}
          </span>
        )}
        <h3 className="text-xs font-semibold text-[var(--color-headline)] line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
          {title ?? 'No title'}
        </h3>
        <TimeAgo date={createdAt} />
      </div>
    </div>
  </ArticleLink>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
/**
 * ArticleCard — renders the correct variant based on the `variant` prop.
 * Default: compact
 */
const ArticleCard = ({
  variant = 'compact',
  className = '',
  ...props
}: ArticleCardProps) => {
  return (
    <div className={className}>
      {variant === 'featured' && <FeaturedCard {...props} />}
      {variant === 'compact' && <CompactCard {...props} />}
      {variant === 'horizontal' && <HorizontalCard {...props} />}
    </div>
  );
};

export default ArticleCard;
