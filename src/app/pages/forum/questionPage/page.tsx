import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import { db } from "@/lib/db";
import Link from "next/link";
import PopularQuestionsSidebar from "@/components/navbar/rightSideBar/PopularQuestions";
import Footer from "@/components/navbar/Footer";

async function QuestionPage() {
  const post = await db.posts.findMany({
    orderBy: [{ score: "desc" }, { creation_date: "asc" }],
    take: 10,
    select: {
      post_Id: true,
      title: true,
      body: true,
      creation_date: true,
      comments: true,
      score: true,
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

  return (
    <div className="bg-[#efece1] flex flex-col">
      <TopNavbar />
      <div className="flex">
        {/* Left Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <div className="flex-1 mx-4 mt-4 space-y-6 mb-10">
          {post.map((post: any) => (
            <div
              key={post.post_Id}
              className="p-6 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md"
            >
              <Link
                href={`/pages/forum/questionPage/${
                  post.post_Id
                }?title=${encodeURI(post.title)}`}
              >
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>
                  Posted on: {new Date(post.creation_date).toLocaleDateString()}
                </span>
                <span>Answers: {post.comments.length}</span>
              </div>
              {/* Display Tags */}
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((postTag: any) => (
                  <span
                    key={postTag.tag.tag_name}
                    className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-700"
                  >
                    {postTag.tag.tag_name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-64 ml-4 mt-4 p-4 bg-[#efece1] rounded-md shadow-md">
          <PopularQuestionsSidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default QuestionPage;
