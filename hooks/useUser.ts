"use client";

import { useEffect, useState } from "react";

import { isAuthorized } from "@/lib/isAuthorised";

export const useUser = () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {

        const user =await isAuthorized();
        setEmail(user.email);
        setLoading(false);
    }
    fetchUser();
  }, []);

  return { email, loading };
};
