"use client";

import React, { useState, useRef, useEffect } from "react";
import { FunnelIcon } from "@heroicons/react/24/solid"; // Ensure you have heroicons installed
import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  existingTags: string[]; // Tags fetched from the database
  onTagSelected: (tags: string[]) => void; // Callback to update parent component
}

const FilterButton: React.FC<FilterButtonProps> = ({
  existingTags,
  onTagSelected,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onTagSelected(updatedTags); // Notify parent component
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
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDropdown}
        className="rounded-full"
      >
        <FunnelIcon className="w-6 h-6 text-[#264743]" />
      </Button>

      {/* Text Field for Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap border border-[#264743] rounded-md p-2 mt-2">
          {selectedTags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="flex items-center bg-white px-2 py-1 rounded-full mr-2"
            >
              {tag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTag(tag)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown for Tag Selection */}
      {isDropdownVisible && existingTags.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-48 bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-40 overflow-auto"
        >
          <div className="flex flex-wrap p-2">
            {existingTags.map((tag, index) => (
              <div
                key={`${tag}-${index}`}
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
  );
};

export default FilterButton;
