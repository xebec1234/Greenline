"use client";
import { useState, useRef } from "react";
import { Toggle } from "./ui/toggle"; // Assuming ShadCN UI has a Toggle component
import { CodeBracketIcon, PlusIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons

interface EditorProps {
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isRed, setIsRed] = useState(false);
  const [isGreen, setIsGreen] = useState(false);

  const changeColor = (color: string) => {
    if (editorRef.current) {
      document.execCommand("foreColor", false, color);
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    if (editorRef.current) {
      document.execCommand("insertText", false, text);
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      const updatedContent = detectAndWrapCode(content);
      if (content !== updatedContent) {
        editorRef.current.innerHTML = updatedContent;
        placeCaretAtEnd(editorRef.current);
      }
      onChange(updatedContent);
    }
  };

  const detectAndWrapCode = (content: string) => {
    // Regular expression to find code blocks enclosed in triple backticks
    const codeRegex = /```([\s\S]*?)```/g;
    return content.replace(codeRegex, (match, code) => {
      return `<div style="background-color: lightgrey; padding: 8px; border-radius: 4px; white-space: pre-wrap;">${code.trim()}</div>`;
    });
  };

  const placeCaretAtEnd = (el: HTMLDivElement) => {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const insertCodeBlock = () => {
    if (editorRef.current) {
      const codeBlock = `<div style="background-color: lightgrey; padding: 8px; border-radius: 4px; white-space: pre-wrap;">\n// Your code here\n</div>`;
      document.execCommand("insertHTML", false, codeBlock);
      placeCaretAtEnd(editorRef.current);
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertNewLine = () => {
    if (editorRef.current) {
      document.execCommand("insertHTML", false, "<br><br>");
      placeCaretAtEnd(editorRef.current);
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Toggle
          pressed={false} // This toggle doesn't have a pressed state
          onPressedChange={() => {
            insertCodeBlock();
          }}
          className="p-2 rounded border border-gray-300 flex items-center"
        >
          <CodeBracketIcon className="text-gray-700" />
          <span className="ml-2">Insert Code Block</span>
        </Toggle>

        <Toggle
          pressed={false} // This toggle doesn't have a pressed state
          onPressedChange={() => {
            insertNewLine();
          }}
          className="p-2 rounded border border-gray-300 flex items-center"
        >
          <PlusIcon className="text-gray-700" />
          <span className="ml-2">Add New Line</span>
        </Toggle>

        <Toggle
          pressed={isGreen}
          onPressedChange={() => {
            setIsGreen(!isGreen);
            changeColor(isGreen ? "transparent" : "green");
          }}
          className="p-2 rounded border border-gray-300"
        >
          <CodeBracketIcon className="text-green-700" />
        </Toggle>

        <Toggle
          pressed={isRed}
          onPressedChange={() => {
            setIsRed(!isRed);
            changeColor(isRed ? "transparent" : "red ");
          }}
          className="p-2 rounded border border-gray-300"
        >
          <CodeBracketIcon className="text-red-700" />
        </Toggle>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onPaste={handlePaste}
        onInput={handleInput}
        className="border p-4 min-h-[150px] mt-4 rounded-md shadow-md"
        style={{ minHeight: "150px" }}
      ></div>
    </div>
  );
};

export default Editor;
