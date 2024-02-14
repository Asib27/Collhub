"use client";

import RepoCard from "@/app/ui/repos/RepoCard";
import TeamCard from "@/app/ui/teams/TeamCard";
import { cn } from "@/utils/cn";
import React, { useState } from "react";

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState([]);

  const handleActiveFilter = (active) => {
    setActiveFilter();
  };

  return (
    <div>
      <div>
        <dib className="flex items-center gap-x-4 relative">
          <input
            type="text"
            className="input flex-1"
            placeholder="Search team"
          />
          <button className="primary-btn mb-6 w-32">Search</button>

          {false && (
            <div className="absolute top-16 left-0 right-0 bg-2 h-96 rounded"></div>
          )}
        </dib>

        <h3 className="section-header mt-10 mb-6">Recommended For You</h3>

        <div className="items-center flex gap-3 mb-8">
          <p
            className={cn(
              "px-4 py-1.5 rounded shadow hover:shadow-xl transition duration-300 bg-2 border border-emerald-600 cursor-pointer"
            )}
            onClick={() => handleActiveFilter()}
          >
            Coding
          </p>
          <p
            className={cn(
              "px-4 py-1.5 rounded shadow hover:shadow-xl transition duration-300 bg-2 border border-emerald-600 cursor-pointer"
            )}
            onClick={() => handleActiveFilter()}
          >
            Design
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-16 mt-12">
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
        </div>
      </div>
    </div>
  );
};

export default Explore;
