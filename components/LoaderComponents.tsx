import React from 'react';
import SkeletonCard from './ui/SkeletonCard';
import SectionHeading from './ui/SectionHeading';

const LoaderComponents = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-10">
      {/* Skeleton Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="flex flex-col gap-3">
          <SectionHeading title="Top Stories" />
          <SkeletonCard variant="featured" />
          <div className="news-card px-3 py-1 mt-3">
            <SkeletonCard variant="compact" />
            <SkeletonCard variant="compact" />
            <SkeletonCard variant="compact" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <SectionHeading title="Local News" />
          <div className="news-card px-3 py-1">
            <SkeletonCard variant="horizontal" />
            <SkeletonCard variant="horizontal" />
            <SkeletonCard variant="horizontal" />
            <SkeletonCard variant="horizontal" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoaderComponents;