import DashboardLayout from "@/components/DashboardLayout";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  // if (user?.roleId !== 0) {
  //   return redirect("/");
  // }
  return <DashboardLayout>{children}</DashboardLayout>;
}