"use client";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SessionProvider>
      <div className="flex h-screen dark:bg-neutral-950">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto dark:bg-neutral-950">
            {children}
          </main>
        </div>
        {/* Sidebar Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
