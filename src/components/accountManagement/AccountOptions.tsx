import React from "react";
import { UserIcon, KeyIcon, CogIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface AccountOptionsProps {
  onSelectOption: (option: string) => void;
}

const AccountOptions: React.FC<AccountOptionsProps> = ({ onSelectOption }) => {
  return (
    <div className="space-y-4" style={{ paddingRight: "calc(1rem + 240px)" }}>
      {/* Change Username */}
      <div
        onClick={() => onSelectOption("username")}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer border border-gray-300"
      >
        <div className="flex items-center">
          <UserIcon className="h-6 w-6 text-gray-700 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Change Username
          </span>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Change Password */}
      <div
        onClick={() => onSelectOption("password")}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer border border-gray-300"
      >
        <div className="flex items-center">
          <KeyIcon className="h-6 w-6 text-gray-700 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Change Password
          </span>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Account Settings */}
      <div
        onClick={() => onSelectOption("deleteAccount")}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer border border-gray-300"
      >
        <div className="flex items-center">
          <CogIcon className="h-6 w-6 text-gray-700 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Account Settings
          </span>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default AccountOptions;
