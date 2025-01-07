// [id]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { NextRequest } from "next/server";

interface NotificationUpdateRequest {
  notification_id: number;
}

export async function POST(req: NextRequest) {
  try {
    const { notification_id }: NotificationUpdateRequest = await req.json();

    // Ensure the notification ID is valid
    if (!notification_id) {
      return NextResponse.json(
        { message: "Invalid notification ID" },
        { status: 400 }
      );
    }

    // Fetch the notification to ensure it exists
    const notification = await db.notification.findUnique({
      where: { notification_id },
    });

    if (!notification) {
      return NextResponse.json(
        { message: "Notification not found" },
        { status: 404 }
      );
    }

    // Update the notification's `is_read` field
    const updatedNotification = await db.notification.update({
      where: { notification_id },
      data: { is_read: true },
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/notifications/[id]:", error);

    // Generic error response
    return NextResponse.json(
      { message: "Failed to update notification" },
      { status: 500 }
    );
  }
}
