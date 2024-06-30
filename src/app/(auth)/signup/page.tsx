import SignUpPage from "@/components/template/SignUpPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return <SignUpPage />;
};

export default SignUp;
