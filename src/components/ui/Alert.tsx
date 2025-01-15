// AlertMessage.tsx
import React from "react";
import { Button } from "./button";

interface AlertMessageProps {
  message: string;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
        <Button
          onClick={onClose}
          className="mt-4 bg-[#264743] text-white rounded px-4 py-2 hover:bg-[#1f3b3b]"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AlertMessage;
