"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/file.svg"; // Make sure this path is correct
import Sidebar from "@/app/Sidebar";

import ThemeToggleButton from "@/app/ThemeToggleButton";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { ThemeProvider } from "@/app/ThemeProvider";
import { AuthenticationCheck } from "./AuthenticationCheck";

export default function MainLayoutClientWrapper({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <ThemeProvider>
        <SessionProvider>
          <AuthenticationCheck />
          <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex justify-between shadow-md py-3 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-border-color dark:border-gray-700 fixed top-0 left-0 right-0 z-30">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Link
                className="flex items-center"
                href="/"
                aria-label="Go to homepage"
              >
                <Image
                  src={Logo}
                  alt="Attendance System Logo"
                  width={32}
                  height={32}
                  className="mr-2 md:mr-3"
                  priority
                />
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                  Attendance System
                </h1>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggleButton />
              <div className="flex items-center">
                <Link href="/profile" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-900/70 text-green-400 flex justify-center items-center mr-2 border border-border-color dark:border-gray-700">
                    <p>J</p>
                  </div>
                </Link>
              </div>
            </div>
          </header>
          <div className="flex h-screen pt-16 bg-background text-foreground">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
              {children}
            </main>
          </div>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
