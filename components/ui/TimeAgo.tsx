/**
 * TimeAgo — converts an ISO date string into a human-readable relative time label.
 * Examples: "2 hours ago", "3 days ago", "Just now"
 * Used in every article card across the site instead of a raw date string.
 */

import React from 'react';

interface TimeAgoProps {
  /** ISO date string from the API (e.g. article.createdAt) */
  date: string | undefined;
  /** Optional extra Tailwind classes */
  className?: string;
}

/** Returns a short relative-time string given an ISO date */
export function timeAgoString(date: string | undefined): string {
  if (!date) return '';
  const now = Date.now();
  const then = new Date(date).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)} days ago`;

  // Fall back to a formatted date for older articles
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

const TimeAgo = ({ date, className = '' }: TimeAgoProps) => {
  return (
    <span className={`text-xs text-[var(--color-meta)] ${className}`}>
      {timeAgoString(date)}
    </span>
  );
};

export default TimeAgo;
