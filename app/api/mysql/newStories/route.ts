import { db } from "@/lib/mysqldb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { slug, html, title, description, poster } = await req.json();
        console.log(slug, title, description);

        let url = `https://humantalking.com/web-stories/${slug}`;

        const queryData = `
                INSERT INTO wp_posts (
                  comment_count,
                  comment_status,
                  guid,
                  menu_order,
                  ping_status,
                  pinged,
                  post_author,
                  post_content,
                  post_content_filtered,
                  post_date,
                  post_date_gmt,
                  post_excerpt,
                  post_mime_type,
                  post_modified,
                  post_modified_gmt,
                  post_name,
                  post_parent,
                  post_password,
                  post_status,
                  post_title,
                  post_type,
                  to_ping
                )
                VALUES (
                  0,
                  'open',
                  ?,
                  0,
                  'open',
                  '',
                  1,
                  ?,
                  '',
                  NOW(),
                  UTC_TIMESTAMP(),
                  ?,
                  '',
                  NOW(),
                  UTC_TIMESTAMP(),
                  ?,
                  0,
                  '',
                  'publish',
                  ?,
                  ?,
                  ''
                );
                `;

        const values = [
            url,
            html,
            description,
            slug,
            title,
            'web-story',
        ];

        const [result] = await db.query(queryData, values);

        console.log(result);

        const storyId = (result as any)?.insertId; // ✅ this is 17

        console.log(storyId);

        // web story posts querl
        const post_values = {
            align: "none",
            blockType: "url",
            height: "600",
            poster,
            stories: [storyId],
            title,
            url,
            width: "360"
        }

        let web_stories_content = `<!-- wp:web-stories/embed ${JSON.stringify(post_values)} -->`;

        console.log(web_stories_content);

        const webPosts_values = [
            url,
            web_stories_content,
            description,
            slug,
            title,
            'post',
        ];

        // post query
        const [resultposts] = await db.query(queryData, webPosts_values);
        console.log({resultposts});
        
        return NextResponse.json({ status: 200, data: result });

    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}