"use client";

import Chat from "@/app/ui/common/Chat";
import Modal from "@/app/ui/common/Modal";
import AddRepo from "@/app/ui/repos/AddRepo";
import RepoCard from "@/app/ui/repos/RepoCard";
import { ModalContext } from "@/contexts/ModalContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

const SingleTeamPage = () => {
  const [showModal, setShowModal] = useState("");

  const { setModal } = useContext(ModalContext);

  const handleAddRepo = () => {
    setModal(true);
    setShowModal("add-repo");
  };

  return (
    <div className="flex items-start justify-between overflow-hidden">
      {/* left */}
      {showModal === "add-repo" && (
        <Modal>
          <AddRepo />
        </Modal>
      )}
      <div
        className="h-full overflow-y-auto border-r-2 border-slate-300 pr-8 w-2/3"
        style={{ height: `calc(100vh - 140px)` }}
      >
        {/* users */}
        <section>
          <div className="flex gap-x-4 items-center mb-8">
            <h2 className="section-header">Team Members</h2>
            <Link href={`/user/team/teamId/add-member`} className="">
              <FiPlusCircle size={24} />
            </Link>
          </div>
          <div className="flex items-center gap-x-2"></div>
          <div className="">Member list</div>
        </section>

        {/* team repos */}
        <section className="mt-16">
          <div className="flex gap-x-4 items-center mb-8">
            <h2 className="section-header">Team Repositories</h2>
            <button className="" onClick={handleAddRepo}>
              <FiPlusCircle size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-y-6 gap-x-16">
            <RepoCard />
            <RepoCard />
            <RepoCard />
            <RepoCard />
          </div>
        </section>
      </div>

      <div
        className="overflow-y-auto pl-8 w-1/3"
        style={{ height: `calc(100vh - 140px)` }}
      >
        <Chat />
      </div>
    </div>
  );
};

export default SingleTeamPage;
