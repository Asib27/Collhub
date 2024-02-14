import React from "react";

const Editor = () => {
  return (
    <div className="flex h-[500px]">
      <div className="overflow-hidden flex flex-col w-1/6">
        <div className="overflow-y-auto">
          <LeftExplorer />
        </div>
      </div>

      <div className="overflow-hidden flex flex-col w-5/6">
        <div className="overflow-y-scroll">content</div>
      </div>
    </div>
  );
};

const LeftExplorer = () => {
  return <div className="">File Explorer</div>;
};

export default Editor;
