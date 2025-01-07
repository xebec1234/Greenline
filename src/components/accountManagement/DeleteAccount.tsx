import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { z } from "zod";

// Zod schema for verifying passwords
const verifyPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters." })
    .max(100, { message: "Current password cannot exceed 100 characters." }),
});

interface DeleteAccountFormProps {
  onBack: () => void;
}

const DeleteAccount: React.FC<DeleteAccountFormProps> = ({ onBack }) => {
  const [step, setStep] = useState<"verify" | "confirm" | "done">("verify");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePasswordVerify = async () => {
    try {
      verifyPasswordSchema.parse({ currentPassword });

      const response = await fetch("/api/users/verifyPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep("confirm");
      } else {
        setError(data.message || "Password verification failed.");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid input or password.");
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const response = await fetch("/api/users/deleteAccount", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setStep("done");

        // Sign out the user and redirect to homepage
        signOut({ callbackUrl: "/" });
      } else {
        setError("Account deletion failed.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    }
  };

  const handleDeletePostsAndComments = async () => {
    try {
      const response = await fetch("/api/post/deletePostsAndComments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setError(""); // Clear any previous errors
        alert("All posts and comments have been deleted.");
      } else {
        setError(data.message || "Failed to delete posts and comments.");
      }
    } catch (error) {
      console.error(error);
      setError("Error deleting posts and comments.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Manage Account</h2>
      </div>

      {step === "verify" && (
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="button"
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-md"
            onClick={handlePasswordVerify}
          >
            Verify Password
          </button>
        </div>
      )}

      {step === "confirm" && (
        <div>
          <p className="text-red-600">
            Are you sure you want to delete your account? This action is
            irreversible.
          </p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="button"
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-md"
            onClick={handleAccountDeletion}
          >
            Delete Account
          </button>
          <p className="text-red-600">
            Are you sure you want to all your posts and comments? This action is
            irreversible.
          </p>
          <button
            type="button"
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-md"
            onClick={handleDeletePostsAndComments} // New button to delete posts and comments
          >
            Delete Posts and Comments
          </button>
        </div>
      )}

      {step === "done" && (
        <div>
          <p className="text-green-600">
            Your account has been successfully deleted.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
