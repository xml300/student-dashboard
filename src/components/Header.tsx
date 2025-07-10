import Link from "next/link";
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-surface shadow-custom-light py-4 px-6 flex justify-between items-center border-b border-border">
      <div className="flex items-center space-x-4">
        <button className="md:hidden text-text-light">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-display font-bold text-text-DEFAULT">Good Morning, John Doe!</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="input-field pl-10"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light" />
        </div>
        <Link href="/profile">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-custom-medium">
            JD
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
