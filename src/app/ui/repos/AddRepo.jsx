"use client";

import React, { useContext, useState } from "react";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import { ModalContext } from "@/contexts/ModalContext";

const AddRepo = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState(null);

  const [loading, setLoading] = useState(false);

  const { setModal } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      console.log(name, type);
      toast.success("Repository created");
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
      <h3 className="section-header mb-8">Add Repository</h3>
      <form>
        <input
          type="text"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <select
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="input w-full"
        >
          <option value="coding">Coding</option>
          <option value="design">Design</option>
        </select>

        <button
          className="primary-btn w-full rounded-full"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddRepo;
