import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Disclaimer | Human Talking",
  description:
    "Disclaimer for Human Talking news website related to sports and gaming content.",
  alternates: {
    canonical: "https://humantalking.com/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function DisclaimerPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "0 16px", lineHeight: "1.7",minHeight:"100vh" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>
        Disclaimer
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        The information provided on <strong>Human Talking</strong> is for general
        informational purposes only. All content published on this website is based on
        research, public sources, opinions, and reports available at the time of writing.
      </p>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        While we strive to keep information accurate and up to date, we make no guarantees
        regarding the completeness, reliability, or accuracy of any content.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        External Links
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        Human Talking may contain links to external websites. We do not control or take
        responsibility for the content, privacy policies, or practices of third-party
        websites.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Content Responsibility
      </h2>

      <p style={{ fontSize: "16px" }}>
        Any action you take based on information found on this website is strictly at your
        own risk. Human Talking will not be liable for any losses or damages related to the
        use of our website.
      </p>
    </main>
  );
}
