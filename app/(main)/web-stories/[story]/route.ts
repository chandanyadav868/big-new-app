import { NextResponse } from "next/server";
import { db } from "@/lib/mysqldb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ story: string }> }
) {
  const { story } = await params;
  console.log(story);
  
  const [rows]: any = await db.query(
    `
    SELECT post_content
    FROM wp_posts
    WHERE post_name = ?
      AND post_status = 'publish'
      AND post_type = 'web-story'
    LIMIT 1
    `,
    [story]
  );

  let html = rows[0]?.post_content ?? "";

  // console.log(html);

  // ✅ Add DOCTYPE if missing
  if (!html.trim().toLowerCase().startsWith("<!doctype")) {
    html = "<!DOCTYPE html>\n" + html;
  }

  // 3️⃣ Inject the correct canonical + robots
  html = html.replace(
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi,
    `
<link rel="canonical" href="https://humantalking.com/web-stories/${story}/">
<meta name="robots" content="index, follow">
</head>
`
  );

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
