import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOption } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOption);
    console.log("Session:", session);

    if (!session) {
      return NextResponse.json(
        { message: "You need to log in first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { postId, commentId, voteType } = body;
    const userID = session.user.id;

    if (!postId || !voteType) {
      return NextResponse.json(
        { message: "Post ID and vote type are required." },
        { status: 400 }
      );
    }

    const existingVote = await db.comment_Votes.findFirst({
      where: {
        user_Id: parseInt(userID),
        post_Id: postId,
        comment_Id: commentId,
      },
    });

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        return NextResponse.json(
          { message: `You have already ${voteType} this post.` },
          { status: 403 }
        );
      }

      await db.comment_Votes.update({
        where: { vote_id: existingVote.vote_id },
        data: { vote_type: voteType },
      });

      const scoreAdjustment = voteType === "up" ? 1 : -1;
      await db.comments.update({
        where: { comment_Id: commentId },
        data: { score: { increment: scoreAdjustment } },
      });
    } else {
      await db.comment_Votes.create({
        data: {
          user_Id: parseInt(userID),
          post_Id: postId,
          comment_Id: commentId,
          vote_type: voteType,
        },
      });

      const scoreAdjustment = voteType === "up" ? 1 : -1;
      await db.comments.update({
        where: { comment_Id: commentId },
        data: { score: { increment: scoreAdjustment } },
      });
    }

    return NextResponse.json({ message: "Vote recorded successfully." });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { message: "Error updating vote.", error },
      { status: 500 }
    );
  }
}
