import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const WEBSITE_URL = process.env.WEBSITE_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow:["/api","/auth","/edit","/u"],
    },
    sitemap:`${WEBSITE_URL}/sitemap.xml`,
  }
}
