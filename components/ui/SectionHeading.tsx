/**
 * SectionHeading — a reusable section title with a red left-border accent
 * and an optional "See all" / "See more" link on the right.
 *
 * Used in HeroSection, CategorySection, ForYouSection, etc.
 */

import Link from 'next/link';
import React from 'react';

interface SectionHeadingProps {
  /** The section title text (e.g. "Top Stories", "Cricket") */
  title: string;
  /** Optional URL for the "See all" link (e.g. /category/cricket) */
  seeAllHref?: string;
  /** Label for the right-side link (default: "See all") */
  seeAllLabel?: string;
}

const SectionHeading = ({
  title,
  seeAllHref,
  seeAllLabel = 'See all',
}: SectionHeadingProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      {/* Left: accent bar + title */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-5 rounded-full bg-red-500 inline-block" />
        <h2 className="text-sm font-bold text-[var(--color-headline)] uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* Right: optional "See all" link */}
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-xs font-semibold text-red-600 hover:underline transition-colors"
        >
          {seeAllLabel} →
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;
