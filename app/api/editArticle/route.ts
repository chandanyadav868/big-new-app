import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("contentId");
  
  // if article id is not present then throw
  if (!articleId) return NextResponse.json({ status: 500, message: "Please provide the ArticleId", error: "Provide articleId" });

  try {
    await connectToDatabase();
    const response = await ArticleModel.findById({ _id: articleId }).lean();
    // console.log({response});

    if (!response) return NextResponse.json({ status: 400, message: "We have not found any article related to it", error: "error" });

    return NextResponse.json({ status: 200, message: "Data Got", data: response });

  } catch (error) {
    return NextResponse.json({ status: 500, message: "Something Went Wrong", error: JSON.stringify((error as any).message) });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();  
  try {
    const updateFields: Record<string, unknown> = {};

    for (const key in data){ updateFields[key] = data[key] };

    const response = await ArticleModel.updateOne(
      { _id: data._id }, // Filter by id
      { $set: updateFields }, // Update only the fields in updateFields
    );

    return NextResponse.json({ status: 200, message: "Submit Successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Something went wrong" });
  }
}

