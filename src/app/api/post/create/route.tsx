import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { z } from "zod";

// Validation schema for incoming data
const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  postType: z.enum(["open", "closed"]),
  userId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Get the session of the logged-in user
    const session = await getServerSession(authOption);

    // Parse the incoming request body
    const requestBody = await req.json();
    const parsedData = PostSchema.parse(requestBody);

    // Check if the session exists (if user is authenticated)
    const userId = session ? session.user.id : null;

    // If there's no userId and no session, handle anonymous posting (if applicable)
    const anonUserId = !userId ? await createAnonymousUser() : null;

    // Create the post
    const post = await db.posts.create({
      data: {
        title: parsedData.title,
        body: parsedData.body,
        post_type: parsedData.postType,
        user_Id: userId ? parseInt(userId) : null, // Use null instead of undefined
        anon_user_Id: anonUserId ? parseInt(anonUserId) : null,
        score: 0, // Use null instead of undefined
      },
    });

    // Return the newly created post
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

// Helper function to create an anonymous user (if needed)
async function createAnonymousUser() {
  const email = `anon-${Math.random().toString(36).substring(2)}@anon.com`; // Generate a fake email
  const newUser = await db.anonymousUsers.create({
    data: {
      email: email,
    },
  });
  return newUser.id.toString();
}
