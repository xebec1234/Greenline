import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { z } from "zod";

// Validation schema for the incoming request
const usernameSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
});

export async function POST(req: Request) {
  try {
    // Get the session of the logged-in user
    const session = await getServerSession(authOption);

    // If there's no session or userId, respond with an error
    if (!session || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized: User not logged in." }, { status: 401 });
    }

    // Parse the incoming request body
    const body = await req.json();
    const { username } = usernameSchema.parse(body);

    // Get the userId from the session
    const userId = session.user.id;

    // Check if the username already exists
    const existingUserByUsername = await db.users.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json({ users: null, message: "Username is already taken." }, { status: 409 });
    }

    // Update the username in the database
    await db.users.update({
      where: { id: parseInt(userId) },
      data: { username },
    });

    return NextResponse.json({ message: "Username updated successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
