import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import { BlogUser } from "@/model/user_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        console.log({ searchParams });

        const deleteArticleId = searchParams.get("deleteId");
        console.log("deleteArticleId:- ", deleteArticleId);
        if (!deleteArticleId) {
            return NextResponse.json({ message: "DeletedArticleId not provided", status: 200 })
        }

        const cookiesObject = req.cookies.get("userId");
        console.log("cookiesObjectL- ", cookiesObject, req.cookies.get("userId"));

        // if (!cookiesObject?.value) {
        //     return NextResponse.json({message:"Your are not logged in"},{status:401})
        // }

        await connectToDatabase();
        const articleExisting = await ArticleModel.findById(deleteArticleId, {
            title: 1
        }, {
            populate: "createdBy",
        });
        const userExisting = await BlogUser.findById(articleExisting.createdBy);

        if (!articleExisting) {
            return NextResponse.json({ message: "Article does not exist", status: 200 })
        }

        // console.log("articleExisting:- ", articleExisting);
        // console.log("userExisting:- ", userExisting);

        const articleDeleted = await ArticleModel.deleteOne({_id:articleExisting});
        // console.log("articleDeleted:- ",articleDeleted);

        return NextResponse.json({ status: 200, message: "Successfully Deleted Article" })

    } catch (error) {
        console.log("Error in the articleDeleting");
        return NextResponse.json({ message: "Server error", status: 500 })
    }
}