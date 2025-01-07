"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function UserAccountNav() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })} variant="destructive">
      signout
    </Button>
  );
}

export default UserAccountNav;
