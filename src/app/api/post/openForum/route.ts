import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    await db.posts.update({
      where: { post_Id: postId },
      data: { post_type: "open" }, // Change post_type to "open"
    });

    return NextResponse.json({ message: "Forum opened successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error opening forum:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
