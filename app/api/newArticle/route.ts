import { ArticleModel } from "@/model/blog_model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log({data});
    
    try {
        const updateFields: Record<string, unknown> = {};

        for (const key in data) { updateFields[key] = data[key] };

        const response = await ArticleModel.create(
            {
                blogImageUrl: updateFields.blogImageUrl,
                featuredImagealt: updateFields.featuredImagealt,
                slug: updateFields.slug,
                title: updateFields.title,
                description: updateFields.description,
                createdBy: "6755455603bf36a0b4db1726",
                content: updateFields.content,
                category: updateFields.category,
                public: updateFields.visibility
            }
        );

        console.log({ response });


        return NextResponse.json({ status: 200, message: "Submit Successfully" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: "Something went wrong" });
    }
}

