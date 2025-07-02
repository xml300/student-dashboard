import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css"; // Assuming this still holds global styles
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/file.svg"; // Make sure this path is correct

// Import the custom Sidebar component (adjust the path as necessary)
import Sidebar from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attendance Management System", // More specific title
  description: "Dashboard for managing attendance in rooms using devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-background text-foreground antialiased min-h-screen min-w-fit`}
      >
        <ThemeProvider>
          <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md flex justify-between shadow-md py-3 px-4 md:px-6 lg:px-8 xl:px-10 border-b border-border-color dark:border-gray-700">
            {/* Logo Section */}
            <div>
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

            <div className="flex items-center">
              <ThemeToggleButton />
              <div className="mr-4 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 dark:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-secondary-accent dark:bg-yellow-400"></span>
              </div>
              <div className="flex items-center">
                <a href="/profile" className="flex items-center">
                  <Image
                    src="/api/placeholder/40/40"
                    width={40}
                    height={40}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2 border border-border-color dark:border-gray-700"
                  />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Dr. Jane Smith</span>
                </a>
              </div>
            </div>
          </header>
          <div className="flex min-h-[92vh]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <main
              className={`p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out flex-1 ml-0 bg-background text-foreground`}
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
