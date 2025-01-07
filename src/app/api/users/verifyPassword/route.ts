import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Validation schema for verifying the current password
const verifyPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters." }),
});

export async function POST(req: Request) {
  try {
    // Get the session of the logged-in user
    const session = await getServerSession(authOption);

    // If there's no session or userId, respond with an error
    if (!session || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized: User not logged in." },
        { status: 401 }
      );
    }

    // Parse the incoming request body
    const body = await req.json();
    const { currentPassword } = verifyPasswordSchema.parse(body);

    // Get the userId from the session
    const userId = session.user.id;

    // Retrieve the user from the database
    const user = await db.users.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // Verify the current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect current password." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Current password is valid." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
