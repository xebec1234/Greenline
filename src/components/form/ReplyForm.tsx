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
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertMessage from "../ui/Alert";

const ReplySchema = z.object({
  content: z.string().min(1, { message: "Comment body is required" }),
  comment_id: z.string(),
  user_Id: z.string(),
  post_id: z.string(),
});

type ReplyFormValues = z.infer<typeof ReplySchema>;

interface ReplyFormProps {
  comment_id: string;
  post_id: string;
  session: {
    user?: {
      id: string;
    };
  } | null;
}

const ReplyForm: React.FC<ReplyFormProps> = ({
  comment_id,
  session,
  post_id,
}) => {
  const form = useForm<ReplyFormValues>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      content: "",
      comment_id,
      post_id,
      user_Id: session?.user?.id || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  if (!session) {
    return (
      <div className="mt-4">
        <p className="text-gray-600">
          You must be logged in to reply to this comment.
        </p>
        <Button
          onClick={() => router.push("/pages/auth/login")}
          className="bg-[#264743] text-white"
        >
          Log In
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: ReplyFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/post/reply/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showAlert(errorData.message || "Failed to submit comment.");
      }

      const Successfully = await response.json();
      showAlert(Successfully.message || "Reply Posted!");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className=" focus:ring-0 focus:border-[#264743] placeholder-gray-500"
                  placeholder="Type your answer here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#264743] text-white"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit reply"}
        </Button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
      {alert.visible && (
        <AlertMessage message={alert.message} onClose={closeAlert} />
      )}
    </Form>
  );
};

export default ReplyForm;
