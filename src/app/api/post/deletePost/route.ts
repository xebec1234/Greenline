import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      console.error("Post ID not provided.");
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    // Check if the post exists
    const post = await db.posts.findUnique({
      where: { post_Id: postId },
      include: { comments: true }, // Including comments to check if there are any
    });

    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // If the post has comments, delete them first
    if (post.comments && post.comments.length > 0) {
      await db.comments.deleteMany({
        where: { post_Id: postId },
      });
      console.log(`Deleted ${post.comments.length} comments associated with post ID ${postId}`);
    }

    // Now delete the post itself
    await db.posts.delete({
      where: { post_Id: postId },
    });

    console.log(`Post with ID ${postId} and its comments deleted successfully.`);
    return NextResponse.json({ message: "Post and associated comments deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during post deletion:", error);
    return NextResponse.json({ message: "Internal server error", error: error }, { status: 500 });
  }
}
