import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectToDatabase();
    const articlesOfUser = await ArticleModel.aggregate([
    {
      $sort:
        /**
         * Provide any number of field/order pairs.
         */
        {
          createdAt: -1
        }
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          slug: 1,
          createdAt: 1,
          updatedAt: 1
        }
    }
  ]);

    return NextResponse.json({ data: articlesOfUser }, { status: 200 })
}