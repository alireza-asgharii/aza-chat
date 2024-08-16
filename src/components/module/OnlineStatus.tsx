"use client";

import { useUser } from "@/lib/store/user";
import { createClient } from "@/utils/supabase/client";
import { error } from "console";
import { useEffect, useState } from "react";

const OnlineStatus = () => {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState(0);

  const supabase = createClient();
  useEffect(() => {
    const channel = supabase.channel("room1", {
      config: {
        presence: {
          key: user?.id,
        },
      },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        // console.log("Synced presence state: ", channel.presenceState());
        let userIds = [];
        for (let id in channel.presenceState()) {
          //@ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUsers([...new Set(userIds)].length);
      })
      .on("presence", { event: "join" }, async ({ key, newPresences }) => {
        console.log("join", key, newPresences);
        // const { data, error } = await supabase
        //   .from("users")
        //   .update({ online: true })
        //   .eq("id", key);
        // await supabase
        //   .from("users")
        //   .update({ last_seen: new Date().toISOString() })
        //   .eq("id", key);
        // console.log({ data, error });
      })
      .on("presence", { event: "leave" }, async ({ key, leftPresences }) => {
        console.log("leave", key, leftPresences);
        // const { data, error } = await supabase
        //   .from("users")
        //   .update({ online: false })
        //   .eq("id", key);

        // await supabase
        //   .from("users")
        //   .update({ last_seen: new Date().toISOString() })
        //   .eq("id", key);
        // console.log({ data, error });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || onlineUsers === 0) return <></>;

  return (
    <div className="pt-2 text-xs text-gray-500 font-bold flex items-center">
      <span>{onlineUsers} Online</span>
      <div className="w-2 h-2 bg-blue-700 rounded-full mx-2"></div>
    </div>
  );
};

export default OnlineStatus;
