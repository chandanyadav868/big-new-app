import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mysqldb";

export async function GET(req: NextRequest) {
    try {
        const [rows] = await db.query(`SELECT * FROM wp_posts;`);
        return NextResponse.json({ status: 200, message: "successfully", data: rows })
    } catch (error) {
        console.log("Error:- ", error);
        return NextResponse.json({ status: 500, error: JSON.stringify((error as any).message) })
    }
}