"use client";

import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Editor from "./Editor";

const SingleCommit = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="bg-slate-200 rounded-md px-6 py-4">
      <div className="flex gap-x-3 items-start">
        <div
          className="cursor-pointer"
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
        >
          {!collapsed && <MdKeyboardArrowRight size={28} />}
          {collapsed && <MdKeyboardArrowDown size={28} />}
        </div>
        <div className="flex-1">
          <p className="text-lg">Message: message</p>
          <p className="content-3 text-sm">Updated 2min ago by user</p>
        </div>
        <button className="my-auto px-4 py-1 secondary-btn" onClick={() => {}}>
          Revert
        </button>
      </div>

      {!collapsed && (
        <div className="border-t border-slate-500 mt-4 p-4">
          <Editor />
        </div>
      )}
    </div>
  );
};

export default SingleCommit;
