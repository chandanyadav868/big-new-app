/**
 * Shared article-related TypeScript types used across multiple components.
 * Centralising types here avoids circular imports between component files.
 */

import type { CreatedAuthor } from '@/lib/readux/articleFetchSlice';

/**
 * Represents a single article as returned from the API / Redux store.
 * Used in HeroSection, BlogContainer, SideContainer, FrontBlogContainer, etc.
 */
export interface HeroSectionProps {
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedAuthor;
  blogImageUrl: string;
  featuredImagealt: string;
  title: string;
  description: string;
  category: string;
  views?: number;
  likes?: number[];
  dislikes?: number[];
  public?: boolean;
  slug: string;
  content?: string;
  _id: string;
}
