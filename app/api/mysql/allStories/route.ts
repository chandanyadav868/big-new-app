import { db } from "@/lib/mysqldb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const [rows] = await db.query(
            `
            SELECT * FROM wp_posts
            WHERE post_type = "post"
                OR post_type = "web-story"
                AND post_status = "publish"
            `
        );
        return NextResponse.json({ status: 200, data: rows });
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}