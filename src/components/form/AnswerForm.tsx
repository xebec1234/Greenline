"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "../Editor";

const CommentSchema = z.object({
  content: z.string().min(1, { message: "Comment body is required" }),
  post_Id: z.string(),
  user_Id: z.string(),
});

type CommentFormValues = z.infer<typeof CommentSchema>;

interface CommentFormProps {
  post_Id: string;
  session: {
    user?: {
      id: string;
    };
  } | null;
}

const AnswerForm: React.FC<CommentFormProps> = ({ post_Id, session }) => {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
      post_Id,
      user_Id: session?.user?.id || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  if (!session) {
    return (
      <div className="mt-4">
        <p className="text-gray-600">
          You must be logged in to answer this question.
        </p>
        <Button
          onClick={() => router.push("/pages/auth/login")}
          className="bg-blue-500 text-white"
        >
          Log In
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: CommentFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/post/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit comment.");
      }

      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Give an answer</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Editor
                    onChange={(content: string) => {
                      field.onChange(content); // Update the form field with the editor content
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-blue-500 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Answer"}
          </Button>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
