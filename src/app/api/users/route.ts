import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schema
const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = userSchema.parse(body);

    //check if email already exist
    const existingUserByEmail = await db.users.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { users: null, message: "This Email already in use!" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    //pass the user into database
    const newUser = await db.users.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { users: newUserPassword, message: "Successfully registered!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Someting went wrong!" },
      { status: 500 }
    );
  }
}
