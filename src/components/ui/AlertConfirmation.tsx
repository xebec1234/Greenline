// AlertMessage.tsx
import React from "react";
import { Button } from "./button";

interface AlertMessageProps {
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // Added onConfirm function as optional
}

const AlertConfirmation: React.FC<AlertMessageProps> = ({
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-lg font-semibold text-gray-800">{message}</h2>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={onConfirm} // Trigger the onConfirm action if provided
            className="mt-4 bg-[#264743] text-white rounded px-4 py-2 hover:bg-gray-400"
          >
            Yes
          </Button>
          <Button
            onClick={onClose}
            className="mt-4 bg-red-600 text-white rounded px-4 py-2 hover:bg-gray-400"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertConfirmation;
