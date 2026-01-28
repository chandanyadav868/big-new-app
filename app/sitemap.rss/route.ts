export async function GET() {
  const siteUrl = "https://humantalking.com";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Human Talking – Sports & Gaming News</title>
    <link>${siteUrl}</link>
    <description>Latest sports and gaming news from Human Talking</description>

    <item>
      <title>Welcome to Human Talking</title>
      <link>${siteUrl}</link>
      <guid>${siteUrl}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>

  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
