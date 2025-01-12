"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const PopularQuestionsSidebar = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post/popularQuestion");
        if (!response.ok) {
          throw new Error("Failed to fetch popular questions");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-14">
      <h3 className="text-sm font-semibold text-gray-700">Popular Questions</h3>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {posts.map((post) => (
            <li
              key={post.post_Id}
              className="text-sm text-blue-600 hover:underline"
            >
              <Link href={`/pages/forum/questionPage/${post.post_Id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};

export default PopularQuestionsSidebar;
