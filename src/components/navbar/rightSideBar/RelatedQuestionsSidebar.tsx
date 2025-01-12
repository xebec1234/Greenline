"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
};

const RelatedQuestionsSidebar = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("title") : null;

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Only run the useEffect hook on the client side
  useEffect(() => {
    if (searchQuery) {
      const encodedSearchQuery = encodeURI(searchQuery);
      setLoading(true);
      fetchPosts(
        `/api/post/search/relatedQuestions?title=${encodedSearchQuery}`
      )
        .then((data) => setPosts(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [searchQuery]); // dependency array is set to searchQuery to refetch when it changes

  return (
    <div className="pt-7">
      <h3 className="text-sm font-semibold text-gray-700">Related Questions</h3>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {posts.map((post: any) => (
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
        <p>No related questions found.</p>
      )}
    </div>
  );
};

export default RelatedQuestionsSidebar;
