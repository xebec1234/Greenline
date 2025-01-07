"use client";

type DeletePostButtonProps = {
  postId: string;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const handleDeletePost = async () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      try {
        console.log("Sending DELETE request for post ID:", postId); // Log postId

        const response = await fetch("/api/post/deletePost", {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json"
        },
          body: JSON.stringify({ postId }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove the post");
        }

        alert("Post deleted successfully.");
        window.location.reload(); // Reload page to reflect changes
      } catch (error) {
        console.error(postId);
        alert("Failed to delete the post.");
      }
    }
  };

  return (
    <button
      onClick={handleDeletePost}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
    >
      Delete Post
    </button>
  );
}
