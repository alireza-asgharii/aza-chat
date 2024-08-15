"use client";

import { IMessage, useMessage } from "@/lib/store/messages";
import Message from "./Message";
import DeleteAlert, { EditAlert } from "./MessageAction";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@/lib/store/user";
import { ArrowDown } from "lucide-react";

const ListMessages = () => {
  const {
    messages,
    addMessage,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticEditMessage,
  } = useMessage();
  const supabase = createClient();
  // const { user } = useUser((state) => state);
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [isScrollTop, setIsScrollTop] = useState(false);
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (optimisticIds.includes(payload.new.id)) return;

          console.log("Change received!", payload);
          const { error, data } = await supabase
            .from("users")
            .select("*")
            .eq("id", payload.new.send_by)
            .single();

          // if (user?.id === data?.id) return;

          const newMessage = {
            ...payload.new,
            users: data,
          };

          if (error) {
            toast.error(error.message);
          } else {
            addMessage(newMessage as IMessage);

            if (isScrollTop) {
              setNotification((prev) => prev + 1);
            }
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          optimisticEditMessage(payload.new as IMessage);
        }
      )
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      channel.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  //scroll to bottom message list
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    if (!isScrollTop) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollStatus = () => {
    const scrollTop = scrollRef.current.scrollTop;
    console.log(scrollTop);
    if (scrollTop < 0) {
      if (isScrollTop) return;
      setIsScrollTop(true);
    } else {
      setIsScrollTop(false);
    }
  };

  const scrollToBottomHandler = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <div
      className="flex flex-grow flex-col-reverse overflow-y-auto"
      ref={scrollRef}
      onScroll={scrollStatus}
    >
      <div className="absolute right-1/2 bottom-[100px]">
        {notification && isScrollTop ? (
          <div
            onClick={scrollToBottomHandler}
            className="p-1 px-2 rounded-full bg-white text-black z-10 cursor-default md:cursor-pointer"
          >
            {notification} new message
          </div>
        ) : (
          isScrollTop && (
            <div
              onClick={scrollToBottomHandler}
              className="p-1 rounded-full bg-white text-black z-10 cursor-default md:cursor-pointer"
            >
              <ArrowDown />
            </div>
          )
        )}
      </div>
      <DeleteAlert />
      <EditAlert />
      <div>
        {messages.map((item, index) => (
          <Message key={index} message={item} />
        ))}
      </div>
    </div>
  );
};

export default ListMessages;
