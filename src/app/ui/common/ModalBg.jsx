import { ModalContext } from "@/contexts/ModalContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";

const ModalBg = () => {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="absolute left-0 right-0 top-0 bottom-0 m-auto bg-slate-800 opacity-60 z-20"
          onClick={() => setModal((modal) => !modal)}
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0.0 }}
          key="modal"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalBg;
