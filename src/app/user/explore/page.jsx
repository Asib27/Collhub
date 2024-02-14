import TeamCard from "@/app/ui/teams/TeamCard";
import React from "react";

const Explore = () => {
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
        <div className="flex flex-wrap gap-4">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>

        <h3 className="section-header mt-10 mb-6">Coding Teams</h3>
        <div className="flex flex-wrap gap-4">
          <TeamCard />
          <TeamCard />
        </div>

        <h3 className="section-header mt-10 mb-6">Design Teams</h3>
        <div className="flex flex-wrap gap-4">
          <TeamCard />
          <TeamCard />
        </div>
      </div>
    </div>
  );
};

export default Explore;
