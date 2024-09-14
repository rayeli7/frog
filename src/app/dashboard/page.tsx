// app/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import { useDidContext } from "@/components/context/DidContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Dashboardcomponent from "@/components/Dashboard/DashboardComp";

export default function Dashboard() {
  const { fetchDataForUser } = useDidContext();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchDataForUser(user);
      }
    });

    return () => unsubscribe();
  }, [fetchDataForUser]);

  return (
    <>
      <Dashboardcomponent />
    </>
  );
}
