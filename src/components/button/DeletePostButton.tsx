"use client";

import { useState } from "react";
import AlertMessage from "../ui/Alert";
import AlertConfirmation from "../ui/AlertConfirmation";
import { Button } from "../ui/button";

type DeletePostButtonProps = {
  postId: string;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const [alert, setAlert] = useState<{
    message: string;
    visible: boolean;
    type: "normal" | "confirmation";
    action?: () => void;
  }>({
    message: "",
    visible: false,
    type: "normal", // Default to normal
  });

  const showAlert = (
    message: string,
    type: "normal" | "confirmation",
    action?: () => void
  ) => {
    setAlert({ message, visible: true, type, action });
  };

  const closeAlert = () => {
    setAlert({ message: "", visible: false, type: "normal" });
  };

  const handleDeletePost = async () => {
    // Show confirmation alert first
    showAlert(
      "Are you sure you want to delete this post? This action cannot be undone.",
      "confirmation",
      async () => {
        try {
          const response = await fetch("/api/post/deletePost", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId }),
          });

          if (!response.ok) {
            showAlert("Failed to remove the post", "normal");
          }

          // Show success message after deletion
          showAlert("Post deleted successfully.", "normal");
          window.location.reload(); // Reload page to reflect changes
        } catch (error) {
          // Show error message if deletion fails
          showAlert("Failed to delete the post.", "normal");
        }
      }
    );
  };

  return (
    <div>
      <Button
        onClick={handleDeletePost}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
      >
        Delete Post
      </Button>
      {alert.visible && alert.type === "normal" && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
      {alert.visible && alert.type === "confirmation" && (
        <AlertConfirmation
          message={alert.message}
          onClose={closeAlert}
          onConfirm={alert.action}
        />
      )}
    </div>
  );
}
