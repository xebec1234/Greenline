import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import { db } from "@/lib/db";
import AnswerForm from "@/components/form/AnswerForm";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import CommentsSection from "@/components/CommentSection";
import "prismjs/themes/prism.css";
import he from "he";

interface QuestionPageParams {
  params: Promise<{
    id: string;
  }>;
}

async function questionPage({ params }: QuestionPageParams) {
  const session = await getServerSession(authOption);

  const post = await db.posts.findUnique({
    where: {
      post_Id: (await params).id,
    },
    select: {
      post_Id: true,
      title: true,
      body: true,
      post_type: true,
      creation_date: true,
      score: true,
      comments: {
        select: {
          comment_Id: true,
          content: true,
          user_Id: true,
          anon_user_Id: true,
          comment_Date: true,
          score: true,
        },
      },
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });

  const decodedCode = he.decode(post?.body || "");

  return (
    <div className="bg-[#efece1] flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex flex-1">
        <SideNavbar />
        <div className="flex-1 mx-4 mt-4">
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-900">{post?.title}</h1>
            <div className="mt-2 text-sm text-gray-500">
              <span>
                Posted on:{" "}
                {post?.creation_date
                  ? new Date(post.creation_date).toLocaleDateString()
                  : "Unknown"}
              </span>{" "}
              | <span>Answers: {post?.comments.length ?? 0}</span> |{" "}
              <span>
                {post?.user?.email
                  ? post.user.email.includes("@deleted")
                    ? "Account deleted"
                    : post.user.username || post.user.email.split("@")[0]
                  : "No email available"}
              </span>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="text-base text-gray-800">
              {post?.body && (
                <pre className="language-javascript max-w-3xl mx-auto">
                  <code dangerouslySetInnerHTML={{ __html: post.body }} />
                </pre>
              )}
            </div>

            <hr className="my-4 border-gray-300" />
          </div>
          <CommentsSection comments={post?.comments ?? []} />
          {post?.post_type === "closed" ? (
            <div className="mt-4 text-lg font-semibold text-gray-600">
              This forum is closed by the user.
            </div>
          ) : (
            <AnswerForm post_Id={post?.post_Id ?? ""} session={session} />
          )}
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <button className="p-2 text-sm text-gray-500 hover:text-gray-700">
              ↑
            </button>
            <span className="text-lg font-semibold text-gray-900">
              {post?.score ?? 0}
            </span>
            <button className="p-2 text-sm text-gray-500 hover:text-gray-700">
              ↓
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
          <h3 className="text-sm font-semibold text-gray-700">
            Popular Questions
          </h3>
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

export default questionPage;
