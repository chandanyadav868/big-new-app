import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "News Website - Human Talking",
    description: "This is the website for getting trending, latest news",
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
    canonical: 'https://yourdomain.com/news/article-slug',
  },
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
