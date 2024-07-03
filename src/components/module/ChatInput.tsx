"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMessage, useMessage } from "@/lib/store/messages";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import { v4 as uuidv4 } from "uuid";

const ChatInput = () => {
  const supabase = createClient();
  const { user } = useUser((state) => state);
  const addMessage = useMessage((state) => state.addMessage);

  const sendMessageHandler = async (text: string) => {
    if (!text.trim()) {
      toast.error("plase type a message !!")
      return
    }
    const newMessage = {
      created_at: new Date().toISOString(),
      id: uuidv4(),
      is_edit: false,
      send_by: user?.id,
      text,
      users: {
        avatar_url: user?.user_metadata.avatar_url,
        created_at: user?.created_at,
        display_name: user?.user_metadata.user_name,
        id: user?.id,
      },
    };
    // optimistic message
    addMessage(newMessage as IMessage);

    const { data, status, error } = await supabase
      .from("messages")
      .insert({ text });
    if (error) {
      toast.error(error.message);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessageHandler(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };
  return (
    <div className="pt-2 flex justify-center items-center py-5">
      <Input
        onKeyDown={keyDownHandler}
        type="text"
        placeholder="Type a message"
        className="mr-2"
      />
      <Button className="h-9">send</Button>
    </div>
  );
};

export default ChatInput;
