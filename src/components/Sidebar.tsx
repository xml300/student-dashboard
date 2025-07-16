import Link from "next/link";
import {
  HomeIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from "next/navigation";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Courses", href: "/courses", icon: BookOpenIcon },
    // Removed Schedule, Profile, Settings
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col bg-neutral-900 border-r border-neutral-800 shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between gap-2 px-6 py-6 border-b border-neutral-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="inline-block bg-neutral-800 rounded-full p-2">
            <HomeIcon className="h-7 w-7 text-neutral-200" />
          </span>
          <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">Student Portal</h1>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden rounded-full p-1 hover:bg-neutral-800"
        >
          <XMarkIcon className="h-7 w-7 text-neutral-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto custom-scrollbar">
        <ul className="mt-6 space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group flex items-center gap-3 py-2 px-4 rounded-lg font-medium text-neutral-200 hover:bg-neutral-800 hover:text-white transition-all duration-200 ease-in-out ${
                  pathname === item.href ? "bg-neutral-800 text-white shadow" : ""
                }`}
              >
                <item.icon className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors duration-200" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile & Logout */}
      <div className="mt-auto px-6 py-6 border-t border-neutral-800 bg-neutral-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-neutral-800 rounded-full p-1">
            <UserCircleIcon className="h-9 w-9 text-neutral-300" />
          </span>
          <div>
            <div className="font-semibold text-neutral-100">RUN/CMP/22/20394</div>
            <div className="text-xs text-neutral-400">Student</div>
          </div>
        </div>
        <button
          className="flex items-center gap-3 py-2 px-4 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-200 w-full font-semibold"
          onClick={() => alert('Logout functionality coming soon!')}
        >
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors duration-200" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
