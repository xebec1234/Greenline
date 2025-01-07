'use client'

import React from "react";

interface SelectItemProps {
  value: string;
  onSelect?: (value: string) => void;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, onSelect, children }) => {
  return (
    <li
      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        if (onSelect) onSelect(value);
      }}
    >
      {children}
    </li>
  );
};
