"use client";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Header = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const {data:session, status} = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 py-4 px-4 md:px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          className="block lg:hidden rounded-full p-1 hover:bg-neutral-800"
        >
          <Bars3Icon className="h-6 w-6 text-neutral-200" />
        </button>
        <h1 className="text-lg md:text-2xl font-bold text-neutral-100">
          Good Morning, {status === "loading" ? "" : session?.user?.name}
        </h1>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-md focus:ring-2 focus:ring-neutral-600 focus:outline-none placeholder:text-neutral-500 text-sm"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition-colors duration-200"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
        <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-200 font-bold border border-neutral-700">
          S
        </div>
      </div>
    </header>
  );
};

export default Header;
