/**
 * CategoryPill — a small, clickable category label pill.
 * Used on article cards and section headings throughout the site.
 * Navigates to /category/[slug] when clicked.
 */

import Link from 'next/link';
import React from 'react';

interface CategoryPillProps {
  /** The category slug/name (e.g. "cricket", "wwe") */
  category: string | undefined;
  /** Optional size variant */
  size?: 'sm' | 'md';
  /** Optional extra classes */
  className?: string;
}

const CategoryPill = ({ category, size = 'sm', className = '' }: CategoryPillProps) => {
  if (!category) return null;

  const sizeClasses = size === 'md'
    ? 'text-xs px-2.5 py-1'
    : 'text-[10px] px-2 py-0.5';

  return (
    <Link
      href={`/category/${category.toLowerCase()}`}
      className={`
        inline-block font-semibold uppercase tracking-wide rounded-full
        bg-red-50 text-red-600 border border-red-200
        hover:bg-red-100 transition-colors
        ${sizeClasses} ${className}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {category}
    </Link>
  );
};

export default CategoryPill;
