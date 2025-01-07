import TopNavbar from "@/components/navbar/TopNavbar";
import SideNavbar from "@/components/navbar/SideNavbar";
import { db } from "@/lib/db";
import Link from "next/link";

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
    },
  });
  return (
    <div className="bg-[#efece1] flex flex-col">
      <TopNavbar />
      <div className="flex">
        {/* Left Sidebar */}
        <SideNavbar />

        {/* Main Content */}
        <div className="flex-1 mx-4 mt-4 space-y-6">
          {post.map((post) => (
            <div
              key={post.post_Id}
              className="p-6 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md"
            >
              <Link href={`/pages/forum/questionPage/${post.post_Id}`}>
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
            </div>
          ))}
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

export default QuestionPage;
