"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiSearch,
  FiSettings,
} from "react-icons/fi";

const Leftbar = ({ active = "" }) => {
  return (
    <div className="flex flex-col items-start mt-16">
      <div className="mb-12 font-semibold text-xl pl-8 flex items-center gap-x-4">
        <img src={"/logo.png"} alt={""} className="w-8 h-8" />
        <h3 className="block">Collhub</h3>
      </div>

      {options.map((option) => (
        <Item option={option} key={option.link} active={active} />
      ))}

      <button
        className="flex items-center hover:content-highlight transition duration-300"
        onClick={() => {}}
      >
        <div className={cn("flex gap-x-4 ml-8 items-center py-3 pl-1")}>
          <div className="text-lg">
            <FiLogOut />
          </div>
          <div className="block">Log Out</div>
        </div>
      </button>
    </div>
  );
};

export default Leftbar;

const options = [
  {
    name: "Home",
    link: "home",
    icon: () => <FiHome />,
  },
  {
    name: "Explore",
    link: "explore",
    icon: () => <FiSearch />,
  },
  {
    name: "Chat",
    link: "chat",
    icon: () => <FiMessageSquare />,
  },
  {
    name: "Settings",
    link: `settings`,
    icon: () => <FiSettings />,
  },
];

const Item = ({ option }) => {
  const pathname = usePathname().split("/").at(-1);

  return (
    <Link
      href={`/user/${option.link}`}
      className={cn(
        "flex items-center md:items-start hover:content-highlight transition duration-300 w-full relative py-3"
      )}
    >
      <div
        className={cn(
          "w-1.5 bottom-0 absolute left-0 top-0",
          pathname === option.link ? "bg-accent-2" : "bg-2"
        )}
      ></div>
      <div
        className={cn(
          "flex gap-x-4 w-full justify-center md:justify-start md:ml-8 items-center",
          pathname === option.link && ""
        )}
      >
        <div className="text-lg">{option.icon()}</div>
        <div className="hidden md:block">{option.name}</div>
      </div>
    </Link>
  );
};
