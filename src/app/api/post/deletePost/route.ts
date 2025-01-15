import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if the post exists
    const post = await db.posts.findUnique({
      where: { post_Id: postId },
      include: {
        comments: {
          include: {
            replies: true,
            notifications: true,
          },
        },
        notifications: true,
      },
    });

    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await db.post_Tags.deleteMany({
      where: { post_Id: postId },
    });

    // Delete votes linked to the post
    await db.votes.deleteMany({
      where: { post_Id: postId },
    });

    // Delete notifications linked to the post
    await db.notification.deleteMany({
      where: { post_Id: postId },
    });

    // Iterate over each comment
    for (const comment of post.comments) {
      await db.comment_Votes.deleteMany({
        where: { comment_Id: comment.comment_Id },
      });

      await db.notification.deleteMany({
        where: { comment_Id: comment.comment_Id },
      });

      // Delete replies linked to the comment
      await db.reply.deleteMany({
        where: { comment_id: comment.comment_Id },
      });

      // Delete the comment itself
      await db.comments.delete({
        where: { comment_Id: comment.comment_Id },
      });
    }

    // Finally, delete the post itself
    await db.posts.delete({
      where: { post_Id: postId },
    });

    return NextResponse.json(
      { message: "Post and associated comments deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Check if error is an object or a string
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error during post deletion:", errorMessage);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
