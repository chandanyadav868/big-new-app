import { db } from "@/lib/mysqldb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
     try {
        const { updated_content } = await req.json();
        console.log(updated_content);

        if (!updated_content) {
            return NextResponse.json({ status: 400, message: "Please provide full data" })
        }

        const { description, title, poster, slug, html, updateWebId, updatePostId } = updated_content;
        let url = `https://humantalking.com/web-stories/${slug}`;

         // Validate required IDs
        if (!updateWebId || !updatePostId) {
            return NextResponse.json({
                stauts:400,
                success: false,
                message: "Both updateWebId and updatePostId are required"
            });
        }

        const sql = `
        UPDATE wp_posts
        SET
            guid = ?,
            post_content = ?,
            post_excerpt = ?,
            post_name = ?,
            post_title = ?,
            post_modified = NOW(),
            post_modified_gmt = UTC_TIMESTAMP()
        WHERE ID = ?
        `;

        const values = [url, html, description, slug, title, updateWebId];
        const [result] = await db.query(sql, values);


        const sql_Webb_Post = `
        UPDATE wp_posts
        SET
            post_content = ?,
            post_excerpt = ?,
            post_name = ?,
            post_title = ?,
            post_modified = NOW(),
            post_modified_gmt = UTC_TIMESTAMP()
        WHERE ID = ?
        `;

        // posts code updating
        // post content
         const post_values = {
            poster,
            title,
            url,
        }

        let web_stories_content = `<!-- wp:web-stories/embed ${JSON.stringify(post_values)} -->`;

        console.log(web_stories_content);

        const webPosts_values = [
            web_stories_content,
            description,
            slug,
            title,
            updatePostId
        ];

        // post query
        const [resultposts] = await db.query(sql_Webb_Post,webPosts_values);
        console.log({ resultposts });


        return NextResponse.json({ status: 200, data: [result,resultposts] });
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}