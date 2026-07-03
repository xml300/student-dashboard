import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return session.user;
}
