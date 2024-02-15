"use client";

import RepoFlow from "@/app/ui/repos/RepoFlow";
import SingleCommit from "@/app/ui/repos/SingleCommit";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SingRepoPage = () => {
  const [mounted, setMounted] = useState(false);

  const [stage, setStage] = useState(0);
  const [file, setFile] = useState({});
  const [folder, setFolder] = useState({});

  const inputFileRef = useRef();
  const inputFolderRef = useRef();

  const {repoId} = useParams()

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFolder = async (folder) => {
    if (folder) {
      setFolder(folder);

      const formData = new FormData();

      for (let i = 0; i < folder?.length; i++) {
        formData.append("files", folder[`${i}`]);
      }

      console.log(folder);

      try {
        const res = await axios.post("/api/user/1/repos/" + repoId, formData);
        console.log(res.data);
        toast.success("Folder uploaded successfully");
        setStage((prev) => prev + 1);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const handleFile = (file) => {
    if (file) {
      console.log(file);
      toast.success("File uploaded successfully");
      setStage((prev) => prev + 1);
    }
  };

  if (mounted)
    return (
      <div>
        <RepoFlow
          inputFileRef={inputFileRef}
          inputFolderRef={inputFolderRef}
          stage={stage}
          setStage={setStage}
        />

        <div className="flex flex-col gap-y-3">
          {/* <SingleCommit folder={folder} /> */}
          {/* <SingleCommit />
        <SingleCommit />
        <SingleCommit /> */}
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
