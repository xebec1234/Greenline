import { signIn } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => signIn("google");

  return (
    <Button
      onClick={loginWithGoogle}
      className="w-full bg-green-50 text-emerald-700 hover:bg-[#264743] hover:text-[#f0fdf4]"
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
