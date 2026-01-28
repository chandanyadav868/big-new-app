import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Human Talking",
  description:
    "Read Human Talking privacy policy to understand how we collect, use and protect user data.",
  alternates: {
    canonical: "https://humantalking.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "0 16px", lineHeight: "1.7",minHeight:"100vh" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>
        Privacy Policy
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        At <strong>Human Talking</strong>, your privacy is important to us. This Privacy
        Policy explains how we collect, use, and protect your information when you visit
        our website.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Information We Collect
      </h2>

      <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
        <li>Basic usage data (pages visited, time spent)</li>
        <li>Device and browser information</li>
        <li>Cookies for analytics and performance</li>
      </ul>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        How We Use Your Information
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        We use collected data to improve website performance, analyze traffic trends, and
        provide a better user experience. We do not sell personal information to third
        parties.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Cookies
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        Human Talking uses cookies to store user preferences and optimize content based on
        visitor behavior. You can disable cookies through your browser settings.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Consent
      </h2>

      <p style={{ fontSize: "16px" }}>
        By using our website, you consent to our Privacy Policy and agree to its terms.
      </p>
    </main>
  );
}
