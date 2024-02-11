"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";
import { FiSearch } from "react-icons/fi";

const Topbar = () => {
  return (
    <div>
      <div className="mt-6 flex items-center justify-between relative">
        {/* search */}
        <div className="" onClick={() => {}}>
          <div className={cn("flex items-center gap-x-3")}>
            <div className="text-xl">
              <FiSearch />
            </div>
            <input
              value={""}
              onChange={(e) => {}}
              type="text"
              className="px-1 py-1 outline-none content2 border-b text-sm w-64 block"
              placeholder={"Search"}
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {/* TODO: update link */}
          <Link href={`/user/home`}>
            <div
              src={""}
              alt="profile"
              className="w-12 h-12 p-[2px] border rounded-full left-4 bg-accent-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
