"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbRobot } from "react-icons/tb";

const RepoFlow = ({ inputFileRef, inputFolderRef, stage, setStage }) => {
  if (stage === -1) {
    return (
      <div
        className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-accent-2 center shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
        onClick={() => {
          setStage(0);
        }}
      >
        <TbRobot size={32} />
      </div>
    );
  } else {
    return (
      <div className="absolute bottom-8 right-8 w-1/5 h-1/2 bg-2 rounded shadow-md">
        <div className="relative w-full h-full pt-12 px-6">
          <div
            className="absolute top-4 right-4 p-2 rounded cursor-pointer"
            onClick={() => setStage(-1)}
          >
            <IoIosArrowDown size={20} />
          </div>

          {stage === 0 && (
            <div>
              <p className="mb-2">
                If you are working in a folder with multiple files, upload the
                folder. Otherwise, upload a file for single file.
              </p>
              <div className="flex items-center justify-center gap-x-4">
                <button
                  className="secondary-btn px-4 py-0.5 rounded-full"
                  onClick={() => {
                    if (inputFileRef) {
                      inputFileRef.current.click();
                    }
                  }}
                >
                  Upload File
                </button>
                <button
                  className="primary-btn px-4 py-0.5 rounded-full"
                  onClick={() => {
                    if (inputFolderRef) {
                      inputFolderRef.current.click();
                    }
                  }}
                >
                  Upload Folder
                </button>
              </div>
            </div>
          )}

          {stage === 1 && (
            <div>
              <p className="">Enter a commit message: </p>
              <input type="text" className="input w-full mt-1" autoFocus />
              <div className="flex items-center justify-center gap-x-4 mt-2">
                <button
                  className="secondary-btn px-4 py-0.5 rounded-full"
                  onClick={() => {
                    setStage(-1);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="primary-btn px-4 py-0.5 rounded-full"
                  onClick={() => {
                    setStage(-1);
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default RepoFlow;
