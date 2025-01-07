import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth"; 

export async function DELETE(request: Request) {
  try {
  
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;


    const posts = await db.posts.findMany({
      where: { user_Id: parseInt(userId) },
      include: { comments: true },
    });

    if (posts.length === 0) {
      console.error(`No posts found for user with ID ${userId}`);
      return NextResponse.json({ message: "No posts found for this user" }, { status: 404 });
    }

   
    const postIds = posts.map(post => post.post_Id); 
    if (postIds.length > 0) {
      await db.comments.deleteMany({
        where: { post_Id: { in: postIds } },
      });
      console.log(`Deleted comments associated with user's posts.`);
    }

    
    await db.posts.deleteMany({
      where: { user_Id: parseInt(userId) },
    });
    console.log(`Deleted all posts made by user ID ${userId}`);

  
    await db.comments.deleteMany({
      where: { user_Id: parseInt(userId)},
    });
    console.log(`Deleted all comments made by user ID ${userId}`);

    return NextResponse.json({ message: "All posts and comments deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during deletion:", error);
    return NextResponse.json({ message: "Internal server error", error: error }, { status: 500 });
  }
}
