"use client";

import { useMessage } from "@/lib/store/messages";
import Message from "./Message";
import DeleteAlert from "./MessageAction";

const ListMessages = () => {
  const messages = useMessage((state) => state.messages);
  return (
    <div className="flex flex-grow flex-col-reverse overflow-y-auto">
      <DeleteAlert />
      <div>
        {messages.map((item, index) => (
          <Message key={index} message={item} />
        ))}
      </div>
    </div>
  );
};

export default ListMessages;
