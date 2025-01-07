"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "../Editor";

// Validation Schema
const PostSchema = z.object({
  title: z.string(),
  body: z.string().min(1, { message: "Body is required" }),
  postType: z.enum(["open", "closed"]),
});

type PostFormValues = z.infer<typeof PostSchema>;

interface AskFormProps {
  session: {
    user: {
      id: string;
      email?: string;
    };
  };
}

const AskForm: React.FC<AskFormProps> = ({ session }) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      body: "",
      postType: "open",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Track the hydration state
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Set it to true after the component is mounted
  }, []);

  if (!isHydrated) {
    return null; // Prevent rendering before hydration
  }

  const onSubmit = async (data: PostFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          userId: session.user.id, // Attach the userId from the session
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred.");
      }

      const post = await response.json();
      router.push(`/pages/forum/questionPage/${post.post_Id}`);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Main Form */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Create a Post</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a descriptive title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Body Field */}
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#264743] text-white py-3 rounded-lg hover:bg-[#1e3b38]"
              >
                Post
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default AskForm;
