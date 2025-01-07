"use client";

type CloseForumButtonProps = {
  postId: string;
};

export default function CloseForumButton({ postId }: CloseForumButtonProps) {
  const handleCloseForum = async () => {
    try {
      const response = await fetch("/api/post/closedForum", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to close forum");
      }

      alert("Forum has been closed.");
      window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error(postId);
      alert("Failed to close the forum.");
    }
  };

  return (
    <button
      onClick={handleCloseForum}
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
    >
      Close Forum
    </button>
  );
}
