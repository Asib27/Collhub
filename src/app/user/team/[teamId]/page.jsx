"use client";

import Chat from "@/app/ui/common/Chat";
import Modal from "@/app/ui/common/Modal";
import AddRepo from "@/app/ui/repos/AddRepo";
import RepoCard from "@/app/ui/repos/RepoCard";
import { ModalContext } from "@/contexts/ModalContext";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import useSWR from "swr";

const SingleTeamPage = () => {
  const { teamId } = useParams();

  const { data: team, isLoading: teamLoading } = useSWR(
    `/api/team/${teamId}`,
    fetcher
  );

  const [showModal, setShowModal] = useState("");

  const { setModal } = useContext(ModalContext);

  const handleAddRepo = () => {
    setModal(true);
    setShowModal("add-repo");
  };

  if (!teamLoading)
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

          <h3 className="text-xl font-semibold mb-8">{team?.name}</h3>

          <section>
            <div className="flex gap-x-4 items-center mb-8">
              <h2 className="section-header">Team Members</h2>
              <Link href={`/user/team/teamId/add-member`} className="">
                <FiPlusCircle size={24} />
              </Link>
            </div>
            <div className="flex items-center gap-x-2"></div>
            {team?.members.map((member) => (
              <div key={member.id} className="flex gap-x-2 mb-2 items-center">
                <div className="w-4 h-4 rounded-full bg-accent-1"></div>
                <span>{member?.name}</span>
                <span className="text-xs border border-slate-400 rounded-full px-2 py-[1px]">
                  {member?.role}
                </span>
              </div>
            ))}
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
              {team.repos?.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
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
