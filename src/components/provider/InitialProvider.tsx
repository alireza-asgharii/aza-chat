"use client";

import { useUser } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

const InitialProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { user } = useUser();

  const setOnline = async () => {
    if (user) {
      await supabase.from("users").update({ online: true }).eq("id", user?.id);

      await supabase
        .from("users")
        .update({ last_seen: new Date().toISOString() })
        .eq("id", user?.id);
    }
  };

  const setOffline = async () => {
    if (user) {
      await supabase.from("users").update({ online: false }).eq("id", user?.id);

      await supabase
        .from("users")
        .update({ last_seen: new Date().toISOString() })
        .eq("id", user?.id);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      setOffline();
    });

    window.addEventListener("unload", () => {
      setOffline();
    });

    setOnline();
    () => {
      setOffline();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};

export default InitialProvider;
