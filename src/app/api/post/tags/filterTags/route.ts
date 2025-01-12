import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Export a named GET method for the search API
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("tags");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is missing" },
        { status: 400 }
      );
    }
    const selectedTags = query.split(","); // Split the tags into an array

    const posts = await db.posts.findMany({
      where: {
        tags: {
          some: {
            tag: {
              tag_name: {
                in: selectedTags,
              },
            },
          },
        },
      },
      select: {
        post_Id: true,
        title: true,
        body: true,
        creation_date: true,
        comments: true,
        score: true,
        tags: {
          select: {
            tag: {
              select: {
                tag_name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
