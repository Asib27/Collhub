"use client";

import { ModalContext } from "@/contexts/ModalContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

const AddTeam = () => {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      await axios.post(`/api/teams`, { name });
      toast.success("Team created");
    } catch (error) {
      console.log(error);
      toast.error("Request failed");
    } finally {
      setLoading(false);
      setModal(false);
    }
  };

  return (
    <div>
      <h3 className="section-header mb-8">Create Team</h3>
      <form>
        <input
          type="text"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <button
          className="primary-btn w-full rounded-full"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
