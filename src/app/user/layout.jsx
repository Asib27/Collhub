import React from "react";
import Leftbar from "../ui/users/Leftbar";
import Topbar from "../ui/users/Topbar";

const UserLayout = ({ children }) => {
  return (
    <div className="h-screen flex">
      <div className="w-[300px] bg-2 h-full">
        <Leftbar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden px-16">
        <div className="bg-transparent">
          <Topbar />
        </div>

        <div className="flex-1 overflow-y-auto py-12 pr-16 -mr-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
