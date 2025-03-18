import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faBook,
    faChartLine,
    faPhone,
    faGear,
    faUsers,
    faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./globals.css";
import Link from "next/link"; // Import Link for navigation


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"], // Use a smaller set of weights for performance
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Generated admin dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      <html lang="en">
      <body className={`${poppins.className} bg-gray-100 antialiased`}>
          <header className="bg-white flex justify-between shadow-md py-4 px-6 md:px-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center gap-4 md:gap-6">
                  <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                  <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                  <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
              </div>
          </header>
          <div className="flex">
              {/* Sidebar */}
              <aside
                  className={`
                      bg-white border-r border-gray-200 pt-6
                      transition-all duration-300 ease-in-out
                      w-64 md:w-64
                      overflow-hidden
                  `}
              >
                  {/* Toggle button for the sidebar */}
                  <button
                      className="absolute top-2 -right-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      // onClick=""
                      title={"Collapse Sidebar"}
                  >
                      <FontAwesomeIcon
                          className="w-5 h-5 text-gray-600"
                          icon={faArrowRightArrowLeft}
                      />
                  </button>
      
                  {/* Sidebar content */}
                  <div className={`px-4 ${'block'}`}>
                      <Link href="/" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faHouse}
                          />
                          Home
                      </Link>
                      <Link href="/courses" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faBook}
                          />
                          Courses
                      </Link>
                      <Link href="/attendance-reports" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faChartLine}
                          />
                          Attendance Reports
                      </Link>
                      <Link href="/devices" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faPhone}
                          />
                          Devices
                      </Link>
                      <Link href="/rooms" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faUsers}
                          />
                          Rooms
                      </Link>
                      <Link href="/settings" className="p-2 flex items-center rounded-md hover:bg-gray-100 text-gray-700">
                          <FontAwesomeIcon
                              className="w-5 h-5 mr-2"
                              icon={faGear}
                          />
                          Settings
                      </Link>
                  </div>
              </aside>
      
              {/* Main content area */}
              <main className={`flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 ease-in-out ${''}`}>
                  {children}
              </main>
          </div>
      </body>
      </html>
    );
}

