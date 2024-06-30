"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface SignUpParamInterface {
  email: string;
  password: string;
}

export const signUp = async (form: SignUpParamInterface) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp(form);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/", "layout");

  return {
    message: "Sign Up successfully",
  };
};

export async function signIn(form: SignUpParamInterface) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(form);

  if (error) {
    console.log(error);
    return {
      error: error.message,
    };
  }
  revalidatePath("/", "layout");
  return {
    message: "Sign In successfully",
  };
}
