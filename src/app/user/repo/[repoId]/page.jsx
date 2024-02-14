"use client";

import RepoFlow from "@/app/ui/repos/RepoFlow";
import SingleCommit from "@/app/ui/repos/SingleCommit";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const SingRepoPage = () => {
  const [stage, setStage] = useState(0);
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState(null);

  const inputFileRef = useRef();
  const inputFolderRef = useRef();

  const handleFolder = (folder) => {
    if (folder) {
      toast.success("Folder uploaded successfully");
      setStage((prev) => prev + 1);
    }
  };

  const handleFile = (file) => {
    if (file) {
      toast.success("File uploaded successfully");
      setStage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <RepoFlow
        inputFileRef={inputFileRef}
        inputFolderRef={inputFolderRef}
        stage={stage}
        setStage={setStage}
      />

      <div className="flex flex-col gap-y-3">
        <SingleCommit />
        <SingleCommit />
        <SingleCommit />
        <SingleCommit />
      </div>

      <input
        className="hidden"
        ref={inputFolderRef}
        type="file"
        onChange={(e) => {
          handleFolder(e.target.files);
        }}
        webkitdirectory="false"
      />
      <input
        className="hidden"
        ref={inputFileRef}
        type="file"
        onChange={(e) => {
          handleFile(e.target.files[0]);
        }}
        accept="media-type"
      />
    </div>
  );
};

export default SingRepoPage;
