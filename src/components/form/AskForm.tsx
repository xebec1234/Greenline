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
import TagSelector from "../TagSelector";
import AlertMessage from "../ui/Alert";

// Validation Schema
const PostSchema = z.object({
  title: z.string(),
  body: z.string().min(1, { message: "Body is required" }),
  tags: z.array(z.string()),
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
      tags: [],
      postType: "open",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [databaseTags, setDatabaseTags] = useState<string[]>([]);
  const router = useRouter();
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

  useEffect(() => {
    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/post/tags");
        if (response.ok) {
          const tags = await response.json();
          // Map the tags to an array of strings
          const tagNames = tags.map(
            (tag: { tag_name: string }) => tag.tag_name
          );
          setDatabaseTags(tagNames);
        }
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };
    fetchTags();
  }, []);

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
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.message || "An unexpected error occurred.");
      }

      const post = await response.json();
      showAlert("Successfully Posted!");
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

              {/* Tag Selector Field */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <TagSelector
                      existingTags={databaseTags}
                      onTagSelected={(tags) => field.onChange(tags)}
                    />
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
        {alert.visible && (
          <AlertMessage message={alert.message} onClose={closeAlert} />
        )}
      </main>
    </div>
  );
};

export default AskForm;
