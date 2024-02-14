import React from "react";

const AddTeamMember = () => {
  return (
    <div>
      <dib className="flex items-center gap-x-4 relative">
        <input type="text" className="input flex-1" placeholder="Search user" />
        <button className="primary-btn mb-6 w-32">Add</button>

        {false && (
          <div className="absolute top-16 left-0 right-0 bg-2 h-96 rounded"></div>
        )}
      </dib>

      <h3 className="section-header mt-10 mb-6">Recommended</h3>
      <div className="">recommended member list</div>
    </div>
  );
};

export default AddTeamMember;
