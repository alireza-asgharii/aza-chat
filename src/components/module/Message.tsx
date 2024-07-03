"use client";
import { IMessage, useMessage } from "@/lib/store/messages";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useUser } from "@/lib/store/user";

const Message = ({ message }: { message: IMessage }) => {
  const { user } = useUser();
  return (
    <div className="flex text-sm py-3 px-2 w-full">
      <div className="mr-2">
        <Avatar>
          <AvatarImage src={message?.users?.avatar_url || ""} alt="profile" />
          <AvatarFallback>
            {message?.users?.display_name
              ? message?.users?.display_name[0].toUpperCase()
              : "P"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-start justify-between w-full">
        <div>
          <span className="font-bold pr-3">
            {message?.users?.display_name ?? "user"}
          </span>
          <span className="text-xs">
            {new Date(message?.created_at).toDateString()}
          </span>
          <p className="font-medium">{message?.text}</p>
        </div>
        {message?.users?.id === user?.id && <MessgaeMenu message={message} />}
      </div>
    </div>
  );
};

export default Message;

const MessgaeMenu = ({ message }: { message: IMessage }) => {
  const { setActionMessage } = useMessage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
