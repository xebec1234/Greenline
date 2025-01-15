import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const ReplySchema = z.object({
  content: z.string().min(1, "Comment body is required"),
  comment_id: z.string(),
  post_id: z.string(),
  user_Id: z.string(),
});

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const parsedData = ReplySchema.parse(requestBody);

    const reply = await db.reply.create({
      data: {
        content: parsedData.content,
        comment_id: parsedData.comment_id,
        user_id: parseInt(parsedData.user_Id),
        reply_date: new Date(),
      },
    });

    // Fetch the comment to get the original author's user_Id
    const comment = await db.comments.findUnique({
      where: { comment_Id: parsedData.comment_id },
      select: { user_Id: true },
    });

    const username = await db.users.findUnique({
      where: {
        id: parseInt(parsedData.user_Id),
      },
      select: {
        username: true,
        email: true,
      },
    });

    if (comment && comment.user_Id) {
      // Create a notification for the post's author
      await db.notification.create({
        data: {
          post_Id: parsedData.post_id,
          comment_Id: reply.comment_id,
          user_Id: comment.user_Id,
          type: "reply",
          content: `${
            username?.username
              ? username.username
              : username?.email?.split("@")[0]
          } replied on your answer.`,
        },
      });
    }

    return NextResponse.json({ message: "Reply Posted!" }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
