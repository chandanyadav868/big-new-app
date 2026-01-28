import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "News Website - Human Talking",
    description: "This is the website for getting trending, latest news",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
    canonical: `${process.env.WEBSITE_URL}`,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0f172a",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
