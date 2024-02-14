"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { MdOutlineAddReaction } from "react-icons/md";
import { TbSend } from "react-icons/tb";

const Chat = () => {
  const [showReaction, setShowReaction] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const handleReact = (react) => {};

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center bg-2">
        <p
          onClick={() => setActiveTab("chat")}
          className={cn(
            "section-header cursor-pointer flex-1 text-center",
            activeTab === "chat" && "border-b-2 border-emerald-600 py-2"
          )}
        >
          Chat
        </p>
        <p
          onClick={() => setActiveTab("files")}
          className={cn(
            "section-header cursor-pointer flex-1 text-center",
            activeTab === "files" && "border-b-2 border-emerald-600 py-2"
          )}
        >
          Files
        </p>
        <p
          onClick={() => setActiveTab("links")}
          className={cn(
            "section-header cursor-pointer flex-1 text-center",
            activeTab === "links" && "border-b-2 border-emerald-600 py-2"
          )}
        >
          Links
        </p>
      </div>

      {/* messages */}
      <div className="mt-8">
        <SingleMessage />
        <SingleMessage />
        <SingleMessage own={true} />
      </div>

      {/* send */}
      <div className="mt-auto flex items-center gap-x-2">
        <input type="text" className="input w-full block" />
        <button className="bg-accent-2 rounded-md mb-6 p-3.5">
          <TbSend size={20} />
        </button>
      </div>
    </div>
  );
};

const SingleMessage = ({ own = false }) => {
  return (
    <div
      className={cn("flex flex-col w-ful", own ? "items-end" : "items-start")}
    >
      <div className={cn("flex items-end my-2 gap-x-2 w-5/6", own ? "" : "")}>
        {!own && (
          <div className="w-8 h-8 bg-accent-2 rounded-full">{/* image */}</div>
        )}
        <div
          className={cn(
            "rounded-md bg-2 px-4 py-3 flex-1 relative",
            own ? "bg-accent-2" : ""
          )}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iusto
          illum, autem modi ratione consequuntur aliquam corporis qui similique
          incidunt?
          <span className="text-xs block mt-1">3 min ago</span>
          <div className="absolute right-1 -bottom-2 px-2 py-1 bg-slate-200 rounded-full content-2 cursor-pointer">
            <MdOutlineAddReaction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
