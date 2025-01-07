'use client'
import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

function logoutAccountSideNav() {
  return <Button className="flex items-center bg-[#efece1] space-x-2 font-semibold text-red-600 hover:underline hover:bg-[#efece1]" onClick={() => signOut()}>Log out</Button>
}

export default logoutAccountSideNav