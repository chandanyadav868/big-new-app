import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ArticleModel } from "@/model/blog_model";
import { BlogUser } from "@/model/user_model";
import mongoose from "mongoose";


export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const profileName = url.searchParams.get("profileName");

    if (!profileName) {
      return NextResponse.json({ message: "profileName missing", status: 200 });
    }

    let cookiesObject = req.cookies.get("userId");

    let ExistingUser = cookiesObject?.value ?? "";

    console.log("Value:- ", ExistingUser);
    // ExistingUser = "6755455603bf36a0b4db1726"

    // Database connection, to know there is connection established to the mongodb
    await connectToDatabase();
    const articlesOfUser = await BlogUser.aggregate([
      {
        $match: {
          username: profileName
        }
      },
      {
        $addFields: {
          followerCount: {
            $size: "$followers"
          },
          isFollowing: {
            $in: [
              { $convert: { input: ExistingUser, to: "objectId", onError: null } },
              "$followers"
            ]
          },
          isYouOwner: {
            $eq: [
              "$_id",
              { $convert: { input: ExistingUser, to: "objectId", onError: null } }
            ]
          }
        }
      },
      {
        $project: {
          refreshToken: 0,
          password: 0,
          followers: 0
        }
      },
      {
        $lookup:
        {
          from: "articlemodels",
          localField: "_id",
          foreignField: "createdBy",
          as: "arrayOfArticles",
          pipeline: [
            {
              $sort: {
                updatedAt: -1
              }
            },
            {
              $group: {
                _id: "$category",
                articles: {
                  $push: "$$ROOT"
                }
              }
            },
            {
              $project: {
                articles: {
                  content: 0,
                  likes: 0,
                  dislikes: 0,
                  createdBy: 0
                }
              }
            },
            {
              $addFields: {
                totalSizeOfArticles: {
                  $size: "$articles"
                },
                articles: {
                  $slice: ["$articles", 5]
                }
              }
            }
          ]
        }
      }
    ])
    // console.log(userExisting[0]);
    return NextResponse.json({ message: "Successfully Fetched Data", status: 200, data: articlesOfUser[0] ?? {} });
  } catch (error) {
    console.log("Error in Profile Fetching channel:- ",error);
    return NextResponse.json({ message: "Server Error", status: 500 });
  }
}








/**
 * 
 * [
  {
    $match: {
      username:"chandanyadav"
    }
  },
  {
    $lookup: {
      from: "articlemodels",
      localField: "_id",
      foreignField: "createdBy",
      as: "result",
      pipeline:[
        {
          $sort:{
            createdAt:-1
          }
        },
        {
          $group:{
            _id:"$category",
            articles:{
              $push:"$$ROOT"
            }
          }
        },
        {
          $project:{
            articles:{
              $slice:["$articles",5]
            }
          }
        },
        {
          $unwind:"$articles"
        },
        {
          $replaceRoot:{
            newRoot:"$articles"
          }
        },
        {
          $addFields:{
            likes:{
              $size:"$likes"
            },
            dislikes:{
              $size:"$dislikes"
            }
          }
        },
        {
          $project:{
            content:0,
            createdBy:0
          }
        }
      ]
    }
  },
  {
    $addFields: {
      followerCount: {
        $size:"$followers"
      },
      ownerChannel:{
        $eq:[
          "$_id",
          {$convert:{input:"6755455603bf36a0b4db1726",to:"objectId",onError:null}}
        ]
      },
      isYouFollowed:{
        $in:[
          {$convert:{input:"6755455603bf36a0b4db1726",to:"objectId",onError:null}},
          "$followers"
        ]
      }
    }
  },
  {
    $project: {
      refreshToken:0,
      password:0,
      followers:0,
      email:0
    }
  }
]
 */