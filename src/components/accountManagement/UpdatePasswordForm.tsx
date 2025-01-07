import React, { useState } from "react";
import { z } from "zod";

// Zod schema for validating passwords (same as backend schema)
// Schema for verifying the current password
const verifyPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters." })
    .max(100, { message: "Current password cannot exceed 100 characters." }),
});

// Schema for updating the password (new and confirm)
const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters." })
      .max(100, { message: "New password cannot exceed 100 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." })
      .max(100, { message: "Confirm password cannot exceed 100 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match.",
    path: ["confirmPassword"],
  });

interface UpdatePasswordFormProps {
  onBack: () => void;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ onBack }) => {
  const [step, setStep] = useState<"current" | "new" | "confirm" | "done">(
    "current"
  );
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCurrentPasswordSubmit = async () => {
    try {
      // Validate the current password before submitting
      verifyPasswordSchema.parse({
        currentPassword,
      });

      const response = await fetch("/api/users/verifyPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("new");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error during password verification:", error);
      setError("Please check your input.");
    }
  };

  const handleNewPasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      updatePasswordSchema.parse({
        newPassword,
        confirmPassword,
      });

      const response = await fetch("/api/users/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep("done");
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred while updating your password.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-blue-600">
          Back
        </button>
        <h2 className="text-lg font-semibold">Update Password</h2>
      </div>

      {step === "current" && (
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
            required
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="button"
            className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleCurrentPasswordSubmit}
          >
            Submit
          </button>
        </div>
      )}

      {step === "new" && (
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          <button
            type="button"
            className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-md"
            onClick={handleNewPasswordSubmit}
          >
            Update Password
          </button>
        </div>
      )}

      {step === "done" && (
        <div>
          <p className="text-green-600">
            Your password has been updated successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdatePasswordForm;
