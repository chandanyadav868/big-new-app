import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WEBSITE_URL = process.env.WEBSITE_URL
    const productsData = await fetch(`${WEBSITE_URL}/api/sitemap`, {
        cache: "no-store"
    });
    const jsonProduct = await productsData.json() as { data: [{ _id: string, slug: string, createdAt: string, updatedAt: string }] }

    return [
        {
            url: `${WEBSITE_URL}`,
            lastModified: new Date(),
            priority: 1
        },
        {
            url: `${WEBSITE_URL}/about`,
            lastModified: new Date(),
            priority: 0.5
        },
        {
            url: `${WEBSITE_URL}/disclaimer`,
            lastModified: new Date(),
            priority: 0.5
        },
        {
            url: `${WEBSITE_URL}/web-stories`,
            lastModified: new Date(),
            priority: 0.9
        },
        {
            url: `${WEBSITE_URL}/privacy-policy`,
            lastModified: new Date(),
            priority: 0.5
        },
        ...jsonProduct.data.map((product) => ({
            url: `${WEBSITE_URL}/article/${product.slug}`,
            lastModified: product.createdAt,
            priority: 0.9
        }))
    ]
}