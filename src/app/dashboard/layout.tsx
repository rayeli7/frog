"use client";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import React from "react";
import { DidProvider } from "@/components/context/DidContext";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <DidProvider>
      <div className="relative min-h-screen">
        {" "}
        {/* Set relative positioning for the container */}
        <Header />
        <hr className="flex shrink-0 self-end max-w-full h-px bg-slate-200 w-[1190px]" />
        <div className="flex">
          <Sidebar /> {/* Position the sidebar absolutely */}
          <div className=" ml-auto w-full block md:hidden">
            {" "}
            {/* Add margin to avoid overlap with the sidebar */}
            {children}
          </div>
          <div className="ml-64 w-full max-md:hidden">
            {" "}
            {/* Add margin to avoid overlap with the sidebar */}
            {children}
          </div>
        </div>
      </div>
    </DidProvider>
  );
}
