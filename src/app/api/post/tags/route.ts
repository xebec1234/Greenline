import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure this is correctly configured

// Handle GET requests
export async function GET(req: Request) {
  try {
    // Fetch all existing tags
    const tags = await db.tags.findMany({
      select: { tag_name: true }, // Fetch tag_name
    });
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
