"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotificationType {
  notification_id: number;
  post_Id: string;
  content: string;
  created_at: Date;
  is_read: boolean;
}

interface NotificationProps {
  notifications: NotificationType[];
}

const Notification = ({ notifications }: NotificationProps) => {
  const router = useRouter();
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNotificationClick = async (
    notificationId: number,
    postId: string
  ) => {
    try {
      setErrorMessage(null); // Clear any existing errors

      // Make the POST request to mark the notification as read
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "POST", // Change method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notification_id: notificationId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
      // Update local state to reflect the change
      setLocalNotifications((prev) =>
        prev.map((notif) =>
          notif.notification_id === notificationId
            ? { ...notif, is_read: true }
            : notif
        )
      );

      // Navigate to the post's page
      router.push(`/pages/forum/questionPage/${postId}`);
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setErrorMessage(errorMsg);
      console.error("Error in handleNotificationClick:", error);
    }
  };

  return (
    <div>
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <ul className="space-y-4">
        {localNotifications.map((notification) => (
          <li
            key={notification.notification_id}
            className={`p-4 border border-gray-300 rounded-md shadow-sm cursor-pointer ${
              notification.is_read ? "bg-[#efece1]" : "bg-[#fff9c1]"
            }`}
            onClick={() =>
              handleNotificationClick(
                notification.notification_id,
                notification.post_Id
              )
            }
          >
            <p className="text-gray-800">{notification.content}</p>
            <span className="text-gray-500 text-sm">
              {new Date(notification.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
