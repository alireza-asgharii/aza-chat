import SignInPage from "@/components/template/SignInPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return <SignInPage />;
};

export default SignIn;
