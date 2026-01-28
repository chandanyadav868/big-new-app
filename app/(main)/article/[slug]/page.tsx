import type { Metadata } from "next";
import ArticleShower from "@/app/(main)/article/[slug]/ArticleShower";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

async function singleArticle({ slug }: { slug: string | undefined }) {
  // ❗ IMPORTANT: fetch must be ABSOLUTE URL on server
  const res = await fetch(
    `/api?id=${slug}&single=yes`,
    { cache: "no-store" }
  );

  const article = await res.json();
  return article[0]
}


// 🔥 This replaces Yoast SEO
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  // ✅ Await params FIRST
  const { slug } = await params;
  const article = await singleArticle({ slug });
  const WEBSITE_URL = process.env.WEBSITE_URL

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      locale: "en_IN",
      siteName: "human talking",
      url: `${WEBSITE_URL}/article/${slug}`,
      images: [
        {
          url: article.blogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${WEBSITE_URL}/article/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await singleArticle({ slug });
  

  return (article?._id ? <ArticleShower key={article?._id} backendSendArticle={article} />:<h1>No Article</h1> );
}
