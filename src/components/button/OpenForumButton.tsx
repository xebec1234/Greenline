"use client";

import { useState } from "react";
import AlertMessage from "../ui/Alert";
import { Button } from "../ui/button";

type OpenForumButtonProps = {
  postId: string;
};

export default function OpenForumButton({ postId }: OpenForumButtonProps) {
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });
  console.log(postId);

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });
  };

  const closeAlert = () => {
    window.location.reload();
    setAlert({ message: "", visible: false });
  };

  const handleOpenForum = async () => {
    try {
      const response = await fetch("/api/post/openForum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to open forum");
      }

      showAlert("Forum has been opened.");
      // Reload page to reflect changes
    } catch (error) {
      console.error(postId);
      showAlert("Failed to open the forum.");
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpenForum}
        className="bg-[#264743] hover:bg-[#1e3b38] text-white font-semibold py-1 px-3 rounded"
      >
        Open Forum
      </Button>
      {alert.visible && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
}
