"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";

interface TagSelectorProps {
  existingTags: string[]; // Tags fetched from the database
  onTagSelected: (tags: string[]) => void; // Callback to update parent component
}

const TagSelector: React.FC<TagSelectorProps> = ({
  existingTags,
  onTagSelected,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(""); // For managing input value
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown

  // Show all tags when input is focused
  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onTagSelected(updatedTags); // Notify parent component
      setInputValue(""); // Clear input value after adding tag
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
    onTagSelected(updatedTags); // Notify parent component
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormItem>
      <FormControl>
        <div className="relative" ref={dropdownRef}>
          {/* Custom Input Field with Selected Tags */}
          <div
            className="flex flex-wrap border border-gray-300 rounded-md p-2 cursor-text"
            onClick={handleInputFocus}
          >
            {selectedTags.map((tag, index) => (
              <div
                key={`${tag}-${index}`}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-full mr-2"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Add a tag..."
              className="flex-1 border-none outline-none"
            />
          </div>

          {/* Dropdown for all tags */}
          {isDropdownVisible && existingTags.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto mt-1">
              <div className="flex flex-wrap p-2">
                {existingTags.map((tag, index) => (
                  <div
                    key={`${tag}-${index}`} // Ensure the key is unique by combining tag and index
                    onClick={() => addTag(tag)}
                    className="m-1 px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TagSelector;
