import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { anonymizeUser } from "@/lib/middleware/anonymizeUser";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOption);

    if (!session || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized: User not logged in." }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    // Anonymize user via middleware
    await anonymizeUser(userId.toString());

    return NextResponse.json({ message: "Account successfully anonymized and deleted." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ message: "Error deleting account." }, { status: 500 });
  }
}
