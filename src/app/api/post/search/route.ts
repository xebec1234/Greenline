import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Export a named GET method for the search API
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is missing" },
        { status: 400 }
      );
    }

    // Search the database for posts matching the query
    const posts = await db.posts.findMany({
      where: {
        title: {
          contains: query, // Matches partial strings
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        post_Id: true,
        title: true,
        body: true,
        post_type: true,
        score: true,
        user_Id: true,
        anon_user_Id: true,
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
