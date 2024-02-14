import Link from "next/link";
import React from "react";

const TeamCard = () => {
  return (
    <Link
      href={`/user/team/${"teamId"}`}
      className="p-2 bg-white shadow hover:shadow-xl rounded transform duration-300"
    >
      <div className="bg-fuchsia-300 w-32 h-32 rounded pb-4" />
      <div className="flex flex-col items-center mt-2">
        <h3 className="text-lg">Team Name</h3>
        <p className=""></p>
      </div>
    </Link>
  );
};

export default TeamCard;
