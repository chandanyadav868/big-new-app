// app/stories/layout.tsx
import Script from "next/script";

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* AMP core */}
      <Script
        src="https://cdn.ampproject.org/v0.js"
        strategy="beforeInteractive"
      />

      <Script
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        strategy="beforeInteractive"
        custom-element="amp-story"
      />

      <Script
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        strategy="beforeInteractive"
        custom-element="amp-video"
      />

      {children}
    </>
  );
}
