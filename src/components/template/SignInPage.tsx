"use client";

import { signIn } from "@/actions/authActions";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/utils/supabase/client";

const SignInPage = () => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const signUphandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await signIn(form)
    console.log(res)
    
    if (res.message) {
      toast({
        title: res.message,
      })
      window.location.reload()
    } else if (res.error) {
      toast({
        title: res.error,
        variant: 'destructive',
      })
    }
  };

  const supabase = createClient()

  const signInHandler  = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + "/auth/callback"
      }
    })
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login your Account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={changehandler}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              onChange={changehandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={signUphandler}
            >
              Sign In
            </button>
          </div>
        </form>
        <div>
          <button onClick={signInHandler} className="border-2 px-2 py-1 rounded-md my-3">Login By Github</button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
