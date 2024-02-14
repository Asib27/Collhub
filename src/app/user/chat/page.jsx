import Chat from "@/app/ui/common/Chat";
import { cn } from "@/utils/cn";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 pr-4">
        <ChatBox />
        <ChatBox seen={false} />
        <ChatBox />
        <ChatBox />
      </div>
      <div className="flex-1 border-l-2 border-slate-200 pl-4">
        <Chat />
      </div>
    </div>
  );
};

const ChatBox = ({ seen = true }) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-x-2 px-4 py-3 border-b cursor-pointer",
        seen ? "bg-1" : "bg-2"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-accent-2">{/* image */}</div>
      <div className="flex-1">
        <h3 className="">Chat Name</h3>
        <p className="text-sm">last message</p>
      </div>
      {!seen && <div className="w-2 h-2 rounded-full bg-accent-1"></div>}
    </div>
  );
};

export default ChatPage;
