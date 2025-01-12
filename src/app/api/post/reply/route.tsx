import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const CommentSchema = z.object({
  content: z.string().min(1, "Comment body is required"),
  post_Id: z.string(),
  user_Id: z.string(),
});

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const parsedData = CommentSchema.parse(requestBody);

    const comment = await db.comments.create({
      data: {
        content: parsedData.content,
        post_Id: parsedData.post_Id,
        user_Id: parseInt(parsedData.user_Id),
        comment_Date: new Date(),
        score: 0,
      },
    });

    // Fetch the post to get the original author's user_Id
    const post = await db.posts.findUnique({
      where: { post_Id: parsedData.post_Id },
      select: { user_Id: true },
    });

    if (post && post.user_Id) {
      // Create a notification for the post's author
      await db.notification.create({
        data: {
          post_Id: parsedData.post_Id,
          comment_Id: comment.comment_Id,
          user_Id: post.user_Id,
          type: "comment",
          content: `${parsedData.user_Id} commented on your post.`,
        },
      });
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
