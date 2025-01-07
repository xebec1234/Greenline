// lib/notifications.ts
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db"; // Import the database instance

export const getUnreadNotificationsCount = async (): Promise<number> => {
  try {
    // Get the server session to access the user information
    const session = await getServerSession(authOption);

    if (!session?.user) {
      return 0; // Return 0 if no user is found in the session
    }

    const userId = session.user.id; // Extract userId from the session object

    // Fetch the count of unread notifications for the user
    const unreadCount = await db.notification.count({
      where: {
        user_Id: parseInt(userId), // Convert userId to integer if needed
        is_read: false,
      },
    });

    return unreadCount;
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    return 0;
  }
};
