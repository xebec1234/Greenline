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

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Only run the useEffect hook on the client side
  useEffect(() => {
    if (searchQuery) {
      const encodedSearchQuery = encodeURI(searchQuery);
      setLoading(true);
      fetchPosts(`/api/post/search?q=${encodedSearchQuery}`)
        .then((data) => setPosts(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [searchQuery]); // dependency array is set to searchQuery to refetch when it changes

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: any) => (
            <div
              key={post.post_Id} // Use post_Id as the key
              className="p-6 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md"
            >
              <Link href={`/pages/forum/questionPage/${post.post_Id}`}>
                {" "}
                {/* Use post_Id for the href */}
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
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
