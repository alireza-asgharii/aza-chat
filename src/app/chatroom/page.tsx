import Header from "@/components/layout/Header";
import ChatInput from "@/components/module/ChatInput";
import ChatMessages from "@/components/module/ChatMessages";

export default function ChatRoom() {
  return (
    <>
      <Header />
      <div className="h-[90vh] flex justify-between flex-col px-1 relative">
        <ChatMessages />
        <ChatInput />
      </div>
    </>
  );
}
