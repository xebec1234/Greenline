import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Validation schema for updating the password
const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters." }),
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
    const { newPassword, confirmPassword } = updatePasswordSchema.parse(body);

    // Verify if the new password matches the confirm password
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "New passwords do not match." },
        { status: 400 }
      );
    }

    // Get the userId from the session
    const userId = session.user.id;

    // Hash the new password before saving it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await db.users.update({
      where: { id: parseInt(userId) },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully." },
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
