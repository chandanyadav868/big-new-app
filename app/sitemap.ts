import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WEBSITE_URL = process.env.WEBSITE_URL
    const productsData = await fetch(`${WEBSITE_URL}/api/sitemap`, {
        cache: "no-store"
    });
    const jsonProduct = await productsData.json() as { data: [{ _id: string, slug: string, createdAt: string, updatedAt: string }] }
    console.log(jsonProduct);
    
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
            priority: 0.9,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/privacy-policy`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/category/cricket`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/category/wwe`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/category/free-fire`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/category/football`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        {
            url: `${WEBSITE_URL}/category/aew`,
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency:"hourly"
        },
        ...jsonProduct.data.map((v,i)=>{
            return {
                url: `${WEBSITE_URL}/article/${v.slug}`,
                lastModified: v.updatedAt,
                priority: 0.8,
            }
        })
    ]
}