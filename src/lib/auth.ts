import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/v1/auth/[...nextauth]/authOptions"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return session.user;
}
