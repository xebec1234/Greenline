import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    // Count the number of posts
    const postsCount = await db.posts.count();

    // Count the number of users
    const usersCount = await db.users.count();

    // Count the number of tags
    const tagsCount = await db.tags.count();

    // Return the counts in the response
    return NextResponse.json(
      {
        postsCount,
        usersCount,
        tagsCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
