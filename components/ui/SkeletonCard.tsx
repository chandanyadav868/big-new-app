/**
 * SkeletonCard — A placeholder component that mimics the shape of ArticleCard.
 * Uses Tailwind's animate-pulse to indicate loading state.
 *
 * Supports three display variants corresponding to ArticleCard:
 *  - "compact"
 *  - "featured"
 *  - "horizontal"
 */

import React from 'react';

interface SkeletonCardProps {
  variant?: 'compact' | 'featured' | 'horizontal';
  className?: string;
}

const CompactSkeleton = () => (
  <div className="flex items-start gap-3 py-3 border-b border-[var(--color-divider)] last:border-0 px-1 animate-pulse">
    <div className="flex-1 min-w-0 flex flex-col gap-2 pt-1">
      <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mt-1" />
    </div>
    <div className="w-20 h-16 shrink-0 rounded-lg bg-gray-300 dark:bg-gray-600" />
  </div>
);

const FeaturedSkeleton = () => (
  <div className="flex flex-col gap-2 h-full animate-pulse">
    <div className="w-full rounded-xl bg-gray-300 dark:bg-gray-600" style={{ aspectRatio: '16/9' }} />
    <div className="flex flex-col gap-2 px-1 mt-1">
      <div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mt-1" />
      <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mt-1" />
    </div>
  </div>
);

const HorizontalSkeleton = () => (
  <div className="flex items-start gap-3 py-2.5 border-b border-[var(--color-divider)] last:border-0 px-1 animate-pulse">
    <div className="w-16 h-12 shrink-0 rounded-lg bg-gray-300 dark:bg-gray-600" />
    <div className="flex-1 min-w-0 flex flex-col gap-1.5 pt-0.5">
      <div className="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mt-0.5" />
    </div>
  </div>
);

const SkeletonCard = ({ variant = 'compact', className = '' }: SkeletonCardProps) => {
  return (
    <div className={className}>
      {variant === 'featured' && <FeaturedSkeleton />}
      {variant === 'compact' && <CompactSkeleton />}
      {variant === 'horizontal' && <HorizontalSkeleton />}
    </div>
  );
};

export default SkeletonCard;
