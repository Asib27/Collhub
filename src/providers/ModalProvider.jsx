"use client";

import React, { useEffect, useState } from "react";

const ModalProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <main className={""}>{children}</main>;
  }
};

export default ModalProvider;
