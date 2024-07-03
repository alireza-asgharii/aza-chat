import { createClient } from "@/utils/supabase/server";
import ListMessage from "./ListMessages";
import { Suspense } from "react";
import InitMessages from "@/lib/store/InitMessages";

const ChatMessages = async () => {
  const supabase = createClient();

  const { data } = await supabase.from("messages").select("*,users(*)");

  return (
    <Suspense fallback="loading...">
      <ListMessage />
      <InitMessages messages={JSON.parse(JSON.stringify(data)) || []} />
    </Suspense>
  );
};

export default ChatMessages;
