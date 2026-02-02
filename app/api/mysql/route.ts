import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mysqldb";

export async function GET(req: NextRequest) {
    try {
        const id = new URL(req.url).searchParams.get("id");
        console.log({id});
        
        if (!id) {
            const [rows] = await db.query(`SELECT post_content FROM wp_posts WHERE post_type = "post";`);
            return NextResponse.json({ status: 200, data: rows }); 
        } else {
            const [rows] = await db.query(`SELECT * FROM wp_posts WHERE ID = ?;`,[id]);
            return NextResponse.json({ status: 200, data: rows }); 

        }
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message.replace("46.202.167.245:3306","Offline")) })
    }
}

export async function POST(req: NextRequest) {
    try {
        const {updated_content} = await req.json();
        
        const sql = `
        UPDATE wp_posts
        SET
            post_content = ?,
            post_modified = NOW(),
            post_modified_gmt = UTC_TIMESTAMP()
        WHERE ID = ?
        `;

        const values = [ updated_content, 7 ];

        const [result] = await db.query(sql,values);
        return NextResponse.json({ status: 200, data: result });
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}