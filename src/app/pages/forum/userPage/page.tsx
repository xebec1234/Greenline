import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import { db } from "@/lib/db";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import CloseForumButton from "@/components/button/CloseForumButton";
import DeletePostButton from "@/components/button/DeletePostButton";
import OpenForumButton from "@/components/button/OpenForumButton";

async function userPage() {
  const session = await getServerSession(authOption);

  if (!session) {
    return (
      <div className="bg-[#efece1] flex flex-col min-h-screen">
        <TopNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 text-lg">
            You must be logged in to view your posts.{" "}
            <Link href="/pages/auth/login" className="text-blue-500 underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Fetch posts created by the logged-in user
  const userId = session.user.id; // Assuming session contains `user.id`
  const posts = await db.posts.findMany({
    where: { user_Id: parseInt(userId) },
    orderBy: [
      { score: "desc" },
      { creation_date: "asc" },
    ],
    take: 10,
    select: {
      post_Id: true,
      title: true,
      body: true,
      post_type: true,
      creation_date: true,
      comments: true,
      score: true,
    },
  });

  return (
    <div className="bg-[#efece1] flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex">
        {/* Left Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <div className="flex-1 mx-4 mt-4 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Questions</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.post_Id}
                className="p-6 border border-gray-300 rounded-md shadow-sm  bg-white hover:shadow-md"
              >
                <div className="flex justify-between">
                    <Link href={`/pages/forum/questionPage/${post.post_Id}`}>
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {post.title}
                    </h2>
                    </Link>
                    <div className=" flex space-x-4">
                        {post.post_type === "closed" ? (
                            <OpenForumButton postId={post.post_Id} />
                        ) : (
                            <CloseForumButton postId={post.post_Id} />
                        )}
                            <DeletePostButton postId={post.post_Id} />
                    </div>
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  {post.body.length > 200
                    ? `${post.body.slice(0, 200)}...`
                    : post.body}
                </p>
                <div className="mt-4 flex justify-between text-xs text-gray-500">
                  <span>Posted on: {new Date(post.creation_date).toLocaleDateString()}</span>
                  <span>Answers: {post.comments.length}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">You haven't posted any questions yet.</p>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
          <h3 className="text-sm font-semibold text-gray-700">Popular Questions</h3>
          <ul className="mt-4 space-y-2">
            {/* Placeholder for Popular Questions */}
            <li className="text-sm text-blue-600 hover:underline">
              <a href="#">Popular Question 1</a>
            </li>
            <li className="text-sm text-blue-600 hover:underline">
              <a href="#">Popular Question 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default userPage;
