import { db } from "@/lib/mysqldb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const slug = new URL(req.url).searchParams.get("post_name");
    // console.log({slug});

  if (!slug) {
    return NextResponse.json(
      { status: 400, message: "post_name is required" },
      { status: 400 }
    );
  }
    
    try {
        const [rows] = await db.query(
            `
            SELECT * FROM wp_posts
            WHERE post_name = ?
                AND post_status = "publish" AND post_type = "web-story"
            `,
            [slug]
        );
        return NextResponse.json({ status: 200, data: rows });
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}