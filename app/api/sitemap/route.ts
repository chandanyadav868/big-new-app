import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDatabase();
    const articlesOfUser = await ArticleModel.find({}, {
        slug: 1, createdAt: 1, updatedAt: 1
    }).lean();

    return NextResponse.json({ data: articlesOfUser }, { status: 200 })
}