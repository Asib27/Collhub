"use client";

import Modal from "@/app/ui/common/Modal";
import AddRepo from "@/app/ui/repos/AddRepo";
import RepoCard from "@/app/ui/repos/RepoCard";
import AddTeam from "@/app/ui/teams/AddTeam";
import TeamCard from "@/app/ui/teams/TeamCard";
import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

const UserHome = () => {
  const [showModal, setShowModal] = useState("");

  const { setModal } = useContext(ModalContext);

  const handleAddTeam = () => {
    setModal(true);
    setShowModal("add-team");
  };

  const handleAddRepo = () => {
    setModal(true);
    setShowModal("add-repo");
  };

  return (
    <div className="">
      {showModal === "add-team" && (
        <Modal>
          <AddTeam />
        </Modal>
      )}
      {showModal === "add-repo" && (
        <Modal>
          <AddRepo />
        </Modal>
      )}
      {/* teams */}
      <section>
        <div className="flex gap-x-4 items-center mb-8">
          <h2 className="section-header">My Teams</h2>
          <button className="" onClick={handleAddTeam}>
            <FiPlusCircle size={24} />
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </section>

      {/* repo */}
      <section className="mt-16">
        <div className="flex gap-x-4 items-center mb-8">
          <h2 className="section-header">My Repositories</h2>
          <button onClick={handleAddRepo} className="">
            <FiPlusCircle size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-16">
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
          <RepoCard />
        </div>
      </section>
    </div>
  );
};

export default UserHome;
