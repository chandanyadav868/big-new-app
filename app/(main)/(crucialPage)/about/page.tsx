import React from 'react'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Human Talking",
  description:
    "Human Talking is a sports and gaming news platform delivering latest WWE, gaming, esports and trending news.",
  alternates: {
    canonical: "https://humantalking.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function AboutPage() {
  return (
    <main style={{ maxWidth: "900px", margin: "40px auto", padding: "0 16px", lineHeight: "1.7",minHeight:"100vh" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px" }}>
        About Human Talking
      </h1>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        <strong>Human Talking</strong> is an independent digital news platform focused on
        <strong> sports, gaming, esports, and trending entertainment stories</strong>.
        Our goal is to deliver accurate, fast, and easy-to-understand news for readers
        across the world.
      </p>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        We cover a wide range of topics including WWE, professional wrestling, online
        gaming, mobile games, PC and console gaming, esports events, and breaking updates
        from the sports industry.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Our Mission
      </h2>

      <p style={{ fontSize: "16px", marginBottom: "14px" }}>
        Our mission is simple: to provide honest, well-researched, and engaging content
        that helps readers stay informed without confusion or misinformation.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: "600", marginTop: "28px" }}>
        Why Trust Us?
      </h2>

      <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
        <li>Focused on factual reporting</li>
        <li>Content written for real users, not clickbait</li>
        <li>Regular updates on sports and gaming trends</li>
        <li>SEO-optimized, fast-loading experience</li>
      </ul>

      <p style={{ fontSize: "16px", marginTop: "20px" }}>
        Thank you for being part of <strong>Human Talking</strong>.
      </p>
    </main>
  );
}