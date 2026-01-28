import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const fetchedArticleLength = searchParams.get("fetchedArticleLength");
    console.log({category:category,fetchedArticleLength:fetchedArticleLength});

    await connectToDatabase();

    const responseMongodb = await ArticleModel.aggregate(
      [
        {
          $match: {
            category: `${category}`,
            public: true
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $skip: Number(fetchedArticleLength ?? 0)
        },
        {
          $lookup: {
            from: "blogusers",
            localField: "createdBy",
            foreignField: "_id",
            as: "createdBy",
            pipeline: [
              {
                $project: {
                  password: 0,
                  refreshToken: 0,
                  email: 0,
                  followers: 0
                }
              }
            ]
          }
        },
        {
          $unwind: "$createdBy"
        },
        {
          $project: {
            blogImageUrl: 1,
            slug: 1,
            createdAt: 1,
            category: 1,
            description: 1,
            featuredImagealt: 1,
            title: 1,
            createdBy: 1
          }
        },
        {
          $group:
          {
            _id: "$category",
            totalSizeOfArticles: {
              $sum: 1
            },
            articles: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $addFields:
          /**
           * newField: The new field name.
           * expression: The new field expression.
           */
          {
            articles: {
              $slice: ["$articles", 20]
            }
          }
        }
      ]
    );

    return NextResponse.json({ status: 200, message: "Welcome to the Article API", data: responseMongodb[0] });
  } catch (error) {
    console.log("Error", error);

    return NextResponse.json({ status: 500, message: "Internal Server Error", error: error });
  }
}











/*
[
  {
    $match: {
      category:"wwe",
      public:true
    }
  },
  {
    $sort: {
      createdAt: -1
    }
  },
  {
    $lookup: {
      from: "blogusers",
      localField: "createdBy",
      foreignField: "_id",
      as: "createdBy",
      pipeline:[
        {
          $project:{
            password:0,
            refreshToken:0,
            email:0,
            followers:0
          }
        }
      ]
    }
  },
  {
    $unwind: "$createdBy"
  },
  {
    $project: {
    blogImageUrl:1,
      slug:1,
      createdAt:1,
      category:1,
      description:1,
      featuredImagealt:1,
      title:1,
      createdBy:1
    }
  },
  {
    $limit: 20
  }
]*/