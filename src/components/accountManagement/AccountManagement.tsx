"use client";

import { useState } from "react";
import AccountNavigation from "./AccountNavigation";
import AccountOptions from "./AccountOptions";
import ChangeUsernameForm from "./ChangeUsernameForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import DeleteAccount from "./DeleteAccount";
UpdatePasswordForm;
const AccountManagement: React.FC = () => {
  const [path, setPath] = useState<string[]>(["Accounts"]);
  const [currentView, setCurrentView] = useState<string>("options");

  const handleNavigate = (index: number) => {
    setPath(path.slice(0, index + 1));
    setCurrentView("options");
  };

  const handleSelectOption = (option: string) => {
    setPath([...path, option === "username" ? "Username" : option]);
    setCurrentView(option);
  };

  const handleBack = () => {
    setPath(path.slice(0, -1));
    setCurrentView("options");
  };

  return (
    <div>
      <AccountNavigation path={path} onNavigate={handleNavigate} />
      {currentView === "options" && (
        <AccountOptions onSelectOption={handleSelectOption} />
      )}
      {currentView === "username" && <ChangeUsernameForm onBack={handleBack} />}
      {currentView === "password" && <UpdatePasswordForm onBack={handleBack} />}
      {currentView === "deleteAccount" && <DeleteAccount onBack={handleBack} />}
    </div>
  );
};

export default AccountManagement;
