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
        <main className="flex-1 p-6 overflow-y-auto dark:bg-neutral-950">
          {children}
        </main>
      </div>
    </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
