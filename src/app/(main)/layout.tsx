import { Poppins } from "next/font/google";
import "../globals.css"; // Assuming this still holds global styles
import MainLayoutClientWrapper from "@/components/MainLayoutClientWrapper";
import { Metadata } from "next";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Attendance Management System',
}


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
          <MainLayoutClientWrapper>
            {children}
          </MainLayoutClientWrapper>
      </body>
    </html>
  );
}
