"use client";

type OpenForumButtonProps = {
  postId: string;
};

export default function OpenForumButton({ postId }: OpenForumButtonProps) {
  const handleOpenForum = async () => {
    try {
      const response = await fetch("/api/post/openForum", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to open forum");
      }

      alert("Forum has been opened.");
      window.location.reload(); // Reload page to reflect changes
    } catch (error) {
      console.error(postId);
      alert("Failed to open the forum.");
    }
  };

  return (
    <button
      onClick={handleOpenForum}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
    >
      Open Forum
    </button>
  );
}
