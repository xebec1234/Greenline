"use client";

import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import AlertMessage from "../ui/Alert";

interface VotingComponentProps {
  score: number;
  postId: string;
}

const VotingComponent: React.FC<VotingComponentProps> = ({ score, postId }) => {
  const [currentScore, setCurrentScore] = useState(score);
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });
  };

  const closeAlert = () => {
    setAlert({ message: "", visible: false });
  };

  const handleVote = async (voteType: "up" | "down") => {
    try {
      const response = await fetch("/api/post/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, voteType }),
      });

      if (response.ok) {
        // Update the score based on the vote type
        setCurrentScore((prevScore) =>
          voteType === "up" ? prevScore + 1 : prevScore - 1
        );
      } else {
        // Parse and show the error message from the API
        const errorData = await response.json();
        showAlert(errorData.message || "An error occurred while voting.");
      }
    } catch (error) {
      console.error("Error while voting:", error);
      showAlert("A network error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 my-3">
      <Button
        className="p-2 rounded-full bg-[#264743] text-white hover:text-gray-700"
        onClick={() => handleVote("up")}
      >
        <ChevronUpIcon className="h-5 w-5" />
      </Button>
      <span className="text-lg font-semibold text-gray-900">
        {currentScore}
      </span>
      <Button
        className="p-2 rounded-full bg-[#264743] text-white hover:text-gray-700"
        onClick={() => handleVote("down")}
      >
        <ChevronDownIcon className="h-5 w-5" />
      </Button>

      {alert.visible && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
    </div>
  );
};

export default VotingComponent;
