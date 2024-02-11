"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const User = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/user/home");
  }, []);

  return <></>;
};

export default User;
