"use client";

import { useState } from "react";
import AlertMessage from "../ui/Alert";
import { Button } from "../ui/button";

type CloseForumButtonProps = {
  postId: string;
};

export default function CloseForumButton({ postId }: CloseForumButtonProps) {
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });
  };

  const closeAlert = () => {
    window.location.reload();
    setAlert({ message: "", visible: false });
  };

  const handleCloseForum = async () => {
    try {
      const response = await fetch("/api/post/closedForum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        showAlert("Failed to close forum");
      }

      showAlert("Forum has been closed.");
    } catch (error) {
      console.error(postId);
      showAlert("Failed to close the forum.");
    }
  };

  return (
    <div>
      <Button
        onClick={handleCloseForum}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
      >
        Close Forum
      </Button>
      {alert.visible && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
}
