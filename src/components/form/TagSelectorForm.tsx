"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterButton from "../button/FilterButton";
import { useRouter } from "next/navigation";

// Validation Schema
const PostSchema = z.object({
  tags: z.array(z.string()),
});

type PostFormValues = z.infer<typeof PostSchema>;

const TagSelectorForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
    defaultValues: {
      tags: [],
    },
  });
  const [databaseTags, setDatabaseTags] = useState<string[]>([]);

  useEffect(() => {
    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/post/tags");
        if (response.ok) {
          const tags = await response.json();
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

  const handleTagsSelected = (selectedTags: string[]) => {
    console.log("Selected Tags:", selectedTags);
    form.setValue("tags", selectedTags); // Update form state with selected tags
  };

  const onSubmit = (data: PostFormValues) => {
    const encodedTags = data.tags
      .map((tag) => encodeURIComponent(tag))
      .join(",");
    router.push(`/pages/search/filterTags?tags=${encodedTags}`);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Tag Selector Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FilterButton
                  existingTags={databaseTags}
                  onTagSelected={(tags) => field.onChange(tags)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="bg-[#264743] text-white p-2 rounded">
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
};

export default TagSelectorForm;
