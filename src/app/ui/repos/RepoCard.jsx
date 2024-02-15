import Link from "next/link";
import React from "react";
import { FiStar } from "react-icons/fi";
import moment from "moment";

const RepoCard = ({ repo }) => {
  console.log(repo);
  return (
    <div className="flex justify-between items-center border-b border-emerald-600 p-2">
      {/* left */}
      <div className="mr-auto">
        <div className="flex items-center gap-x-4">
          <Link
            href={`/user/repo/${"repoId"}`}
            className="font-semibold hover:content-highlight transition duration-300"
          >
            {repo.name}
          </Link>
          <div className="px-2 py-[2px] rounded-full border border-emerald-900 text-xs">
            Private
          </div>
        </div>

        <div className="mt-2 text-sm flex items-center gap-x-8">
          <div className="flex items-center gap-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            {repo.type}
          </div>
          <p className="content-3">
            Updated {moment(repo.updatedAt).startOf("hour").fromNow()}
          </p>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-col items-end gap-y-2 text-sm">
        <span className="ml-auto">
          <FiStar />
        </span>
        <p>
          Owner:{" "}
          {repo?.users?.filter((u) => u.role === "author")?.at(0).user.name}
        </p>
      </div>
    </div>
  );
};

export default RepoCard;
