import { ModalContext } from "@/contexts/ModalContext";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";

const Modal = ({ children, className }) => {
  const { modal, setModal } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className={cn(
            "bg-slate-200 w-md z-50 absolute top-0 bottom-0 left-0 right-0 m-auto max-w-lg h-[560px] rounded-lg shadow-xl p-8 pt-12 overflow-auto",
            className
          )}
          initial={{ opacity: 0.0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0.0 }}
        >
          <div
            className="absolute right-4 top-4 cursor-pointer p-2"
            onClick={() => setModal(false)}
          >
            <IoMdClose size={24} />
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
