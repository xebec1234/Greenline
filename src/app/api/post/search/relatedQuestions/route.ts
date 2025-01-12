import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Export a named GET method for the search API
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("title");
    console.log("captured in api: ", query);

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is missing" },
        { status: 400 }
      );
    }

    // Split the query into words and filter out empty strings
    const words = query.split(/\s+/).filter((word) => word.length > 0);
    console.log("split words: ", words);

    // Search the database for posts matching the query
    const posts = await db.posts.findMany({
      where: {
        OR: words.map((word) => ({
          title: {
            contains: word, // Matches partial strings for each word
            mode: "insensitive", // Case-insensitive search
          },
        })),
      },
      select: {
        post_Id: true,
        title: true,
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

    console.log("captured post: ", posts);

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
