"use client";

import { Poppins } from "next/font/google";
import "../globals.css"; // Assuming this still holds global styles
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/file.svg"; // Make sure this path is correct
import { useState } from "react";

// Import the custom Sidebar component (adjust the path as necessary)
import Sidebar from "../Sidebar";
import { ThemeProvider } from "../ThemeProvider";
import ThemeToggleButton from "../ThemeToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-background text-foreground antialiased min-h-screen min-w-fit`}
      >
        <ThemeProvider>
          <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex justify-between shadow-md py-3 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-border-color dark:border-gray-700 fixed top-0 left-0 right-0 z-30">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
              >
                <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
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
                  <span className="font-medium text-gray-900 dark:text-gray-100 hidden md:block">
                    Dr. Jane Smith
                  </span>
                </Link>
              </div>
            </div>
          </header>
          <div className="flex pt-16">
            {/* Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Main content area */}
            <main
              className={`p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out flex-1 bg-background text-foreground md:ml-64`}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
