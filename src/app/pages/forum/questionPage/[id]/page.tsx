import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import AnswerForm from "@/components/form/AnswerForm";
import CommentsSection from "@/components/CommentSection";
import VotingComponent from "@/components/button/VoteButton";
import RelatedQuestionsSidebar from "@/components/navbar/rightSideBar/RelatedQuestionsSidebar";
import { db } from "@/lib/db";
import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "prismjs/themes/prism.css";
import he from "he";
import { Suspense } from "react";
import PopularQuestionsSidebar from "@/components/navbar/rightSideBar/PopularQuestions";
import Footer from "@/components/navbar/Footer";

interface QuestionPageParams {
  params: Promise<{
    id: string;
  }>;
}

async function questionPage({ params }: QuestionPageParams) {
  const session = await getServerSession(authOption);
  const { id } = await params;

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
      tags: {
        select: {
          tag: {
            select: {
              tag_name: true,
            },
          },
        },
      },
    },
  });

  const decodedCode = he.decode(post?.body || "");

  return (
    <Suspense>
      <div className="bg-[#efece1] flex flex-col min-h-screen">
        <TopNavbar />
        <div className="flex flex-1">
          <SideNavbar />
          <div className="flex-1 mx-4 mt-4 mb-10">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 pt-2">
                    {post?.title}
                  </h1>
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
                  {/* Display Tags */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post?.tags.map((postTag: any) => (
                      <span
                        key={postTag.tag.tag_name}
                        className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700"
                      >
                        {postTag.tag.tag_name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="text-base text-gray-800 flex justify-between items-start">
                {post?.body && (
                  <pre className="language-javascript max-w-3xl mx-auto">
                    <code dangerouslySetInnerHTML={{ __html: decodedCode }} />
                  </pre>
                )}
                <div className="flex-shrink-0 ml-4">
                  <VotingComponent
                    score={post?.score ?? 0}
                    postId={post?.post_Id ?? ""}
                  />
                </div>
              </div>

              <hr className="my-4 border-gray-300" />
            </div>
            <CommentsSection
              comments={post?.comments ?? []}
              postId={post?.post_Id ?? ""}
              Users={{
                username: post?.user?.username ?? "",
                email: post?.user?.email ?? "",
              }}
            />
            {post?.post_type === "closed" ? (
              <div className="mt-4 text-lg font-semibold text-gray-600">
                This forum is closed by the user.
              </div>
            ) : (
              <div>
                <hr className="my-4 border-[#264743]" />
                <AnswerForm post_Id={post?.post_Id ?? ""} session={session} />
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
            <RelatedQuestionsSidebar />
            <PopularQuestionsSidebar />
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default questionPage;
