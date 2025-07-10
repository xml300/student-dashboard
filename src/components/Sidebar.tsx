import Link from "next/link";
import { HomeIcon, BookOpenIcon, CalendarDaysIcon, ClockIcon, ChartBarIcon, UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Courses", href: "/courses", icon: BookOpenIcon },
    { name: "Attendance", href: "/attendance", icon: CalendarDaysIcon },
    { name: "Schedule", href: "/schedule", icon: ClockIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-primary to-indigo-700 text-white p-6 flex flex-col rounded-r-3xl shadow-custom-heavy">
      <div className="text-2xl font-display font-bold text-white mb-8">
        Student Portal
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} className="flex items-center space-x-3 py-2 px-4 rounded-lg text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-50 hover:text-white transition-all duration-220 ease-in-out">
                <item.icon className="h-6 w-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-indigo-600">
        <Link href="/settings" className="flex items-center space-x-3 py-2 px-4 rounded-lg text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-50 hover:text-white transition-all duration-220 ease-in-out">
          <Cog6ToothIcon className="h-6 w-6" />
          <span className="font-medium">Settings</span>
        </Link>
        <button className="flex items-center space-x-3 py-2 px-4 rounded-lg text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-50 hover:text-white transition-all duration-220 ease-in-out w-full mt-2">
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
