import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Fetch the top 10 posts ordered by score and creation date
    const popularPosts = await db.posts.findMany({
      orderBy: [{ score: "desc" }, { creation_date: "asc" }],
      take: 10,
      select: {
        post_Id: true,
        title: true,
        score: true,
        creation_date: true,
      },
    });

    return NextResponse.json(popularPosts, { status: 200 });
  } catch (error) {
    console.error("Error fetching popular questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular questions" },
      { status: 500 }
    );
  }
}
