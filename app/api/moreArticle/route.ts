import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const category = searchParams.get("category");
        const fetchedArticle = parseInt(searchParams.get("totalArticle") || "0");

        console.log(category, fetchedArticle);
        if (!category || !fetchedArticle) {
            return NextResponse.json({ message: "Please provide all parameters" }, { status: 200 });
        }
        await connectToDatabase()
        const article = await ArticleModel
            .find({ category: category, public: true })
            .select("-content -dislikes -likes")
            .populate({
                path: "createdBy",
                select: "username _id"
            })
            .sort({ createdAt: -1 })
            .skip(fetchedArticle)
            .limit(20)
            .lean()
            .exec()

        return NextResponse.json({ message: "Successfully fetched article", data: article }, { status: 200 });
    } catch (error) {
        console.log("Error in moreArticleFetching");
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}