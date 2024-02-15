import Link from "next/link";
import React from "react";

const TeamCard = ({ team }) => {
  console.log(team?.team_id);

  return (
    <Link
      href={`/user/team/${team?.team_id}`}
      className="p-2 bg-white shadow hover:shadow-xl rounded transform duration-300"
    >
      <img
        className="bg-fuchsia-300 w-32 h-32 rounded mb-2"
        src={team?.picture}
        alt={""}
      />
      <div className="flex flex-col items-center mt-2">
        <h3 className="text-lg">{team?.name}</h3>
        <p className=""></p>
      </div>
    </Link>
  );
};

export default TeamCard;
