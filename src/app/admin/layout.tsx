import { Poppins } from "next/font/google";
import "../globals.css";
import MainLayoutClientWrapper from "@/components/MainLayoutClientWrapper";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Attendance Management System',
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-background text-foreground antialiased min-h-screen min-w-fit`}
      >
        <MainLayoutClientWrapper isAdmin={true}>
          {children}
        </MainLayoutClientWrapper>
      </body>
    </html>
  );
}
