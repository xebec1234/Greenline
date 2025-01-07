"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Define Zod schema for username validation
const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
});

type FormData = z.infer<typeof usernameSchema>;

interface ChangeUsernameFormProps {
  onBack: () => void;
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({ onBack }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Set up form with react-hook-form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: (data) => {
      try {
        usernameSchema.parse(data);
        return { values: data, errors: {} };
      } catch (error: any) {
        return {
          values: {},
          errors: error.errors.reduce((acc: any, { path, message }: any) => {
            acc[path[0]] = { message };
            return acc;
          }, {}),
        };
      }
    },
  });

  const handleSave: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/updateUsername`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: data.username }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to update username.");
      }

      onBack(); // Go back to previous page/form after successful update
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form className="space-y-4" onSubmit={handleSubmit(handleSave)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Username
          </label>
          <Input
            type="text"
            {...register("username")}
            placeholder="Enter new username"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            disabled={loading}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md shadow-sm hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
