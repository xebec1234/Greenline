"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Define the Zod schema
const SearchSchema = z.object({
  searchQuery: z.string().nonempty("Search query cannot be empty."),
});

type SearchFormValues = z.infer<typeof SearchSchema>;

const SearchBar = () => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form with zod validation
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // Fetch suggestions dynamically
  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/post/search/suggest?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setSuggestions(data);
      }
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = (data: SearchFormValues) => {
    const encodedSearchQuery = encodeURI(data.searchQuery);
    router.push(`/pages/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 justify-center"
        >
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Search</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search..."
                    {...field}
                    className="w-[40vw] h-[5vh] px-3 py-1.5 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#CBE4DE]"
                    onChange={(e) => {
                      field.onChange(e); // Sync with react-hook-form
                      fetchSuggestions(e.target.value); // Fetch suggestions
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Dropdown for showing suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-2 rounded-lg">
          {loading ? (
            <p>Loading...</p>
          ) : (
            suggestions.map((suggestion: any) => (
              <Link
                href={`/pages/forum/questionPage/${suggestion.post_Id}`}
                key={suggestion.post_Id}
              >
                <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                  {suggestion.title}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
