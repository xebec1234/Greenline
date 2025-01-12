import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import Notification from "@/components/Notification";
import { redirect } from "next/navigation";
import Footer from "@/components/navbar/Footer";

interface NotificationType {
  notification_id: number;
  post_Id: string;
  content: string;
  created_at: Date;
  is_read: boolean;
}

async function page() {
  const session = await getServerSession(authOption);

  if (!session) {
    return redirect(
      "/pages/auth/login?callbackUrl=/pages/accounts/notifications"
    );
  }

  const userId = session.user.id;

  // Fetch notifications from the database
  const notifications: NotificationType[] = await db.notification.findMany({
    where: {
      user_Id: parseInt(userId),
    },
    orderBy: [{ created_at: "desc" }],
    select: {
      notification_id: true,
      post_Id: true,
      content: true,
      created_at: true,
      is_read: true,
    },
  });

  return (
    <div className="bg-[#efece1] flex flex-col">
      <TopNavbar />
      <div className="flex">
        <SideNavbar />
        <div className="flex-1 mx-4 mt-4 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {notifications.length > 0 ? (
            <Notification notifications={notifications} />
          ) : (
            <p className="text-gray-700">No notifications yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
