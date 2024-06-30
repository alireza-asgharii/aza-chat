"use client";

import { revalidatePathAction } from "@/actions/actions";
import { createClient } from "@/utils/supabase/client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { revalidatePath } from "next/cache";
import React from "react";

const SignOutButton = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const signOutHandler = async () => {
    await supabase.auth.signOut();
    revalidatePathAction('/')
  };
  return (
    <DropdownMenuItem
      onClick={signOutHandler}
      className="text-red-500 hover:text-red-500"
    >
      {children}
    </DropdownMenuItem>
  );
};

export default SignOutButton;
