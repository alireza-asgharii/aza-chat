import { IMessage } from "@/lib/store/messages";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Message = ({ message }: { message: IMessage }) => {
  return (
    <div className="flex text-sm py-3 w-full">
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
      <div>
        <div>
          <span className="font-bold pr-3">{message?.users?.display_name ?? "user"}</span>
          <span className="text-xs">
            {new Date(message?.created_at).toDateString()}
          </span>
        </div>
        <p className="font-medium">{message?.text}</p>
      </div>
    </div>
  );
};

export default Message;
