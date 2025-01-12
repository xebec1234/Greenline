"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const fetchFilteredPosts = async (tags: string[]) => {
  const response = await fetch(
    `/api/post/tags/filterTags?tags=${tags.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response.json();
};

const FilterPage = () => {
  const search = useSearchParams();
  const tagQuery = search ? search.get("tags") : null;

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Memoize the tags array to avoid recalculating it on every render
  const tags = useMemo(() => (tagQuery ? tagQuery.split(",") : []), [tagQuery]);

  useEffect(() => {
    if (tags.length > 0) {
      setLoading(true);
      fetchFilteredPosts(tags)
        .then((data) => setPosts(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [tags]); // Dependency array is set to tagQuery to refetch when it changes

  return (
    <div className="flex-1 mx-4 mt-4 space-y-6">
      <h1 className="text-xl font-semibold mb-4">Filtered Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post: any) => (
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

export default FilterPage;
