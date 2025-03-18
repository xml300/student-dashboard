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
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
            <body className={`${poppins.className} bg-background antialiased`}>
                <header className="bg-white flex justify-between shadow-md py-4 px-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center gap-6">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link> {/* Example link */}
                        <Link href="/profile">Profile</Link> {/* Example link */}
                    </div>
                </header>
                <div className="flex"> {/* Container for sidebar and main content */}
                    <aside className="bg-white max-w-sm min-h-screen border-r border-border-color pt-6"> {/* Sidebar as aside */}
                        {/* <button className="absolute top-2 -right-12 cursor-pointer p-2 bg-white rounded-full">
              <FontAwesomeIcon className="w-6 h-6" icon={faArrowRightArrowLeft} />
            </button> */}
                        <Link href="/" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faHouse}
                            />
                            Home
                        </Link>
                        <Link href="/courses" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faBook}
                            />
                            Courses
                        </Link>
                        <Link href="/attendance-reports" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faChartLine}
                            />
                            Attendance Reports
                        </Link>
                        <Link href="/devices" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faPhone}
                            />
                            Devices
                        </Link>
                        <Link href="/rooms" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faUsers}
                            />
                            Rooms
                        </Link>
                        <Link href="/settings" className="mx-2 p-2 flex items-center rounded-md hover:bg-color-1 block">
                            <FontAwesomeIcon
                                className="max-w-6 max-h-6 mr-2"
                                size="sm"
                                icon={faGear}
                            />
                            Settings
                        </Link>
                    </aside>
                    <main className="flex-1 p-8"> {/* Main content area taking remaining space */}
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}