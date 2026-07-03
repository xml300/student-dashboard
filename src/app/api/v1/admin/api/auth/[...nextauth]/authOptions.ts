import { User, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { NSession } from "@/data/types/types";

interface NewUser extends User {
  userType: string;
  lecturerId: number;
}


export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const { db } = await import("@/db");
        const { users, lecturers } = await import("@/db/schema");
        const { eq } = await import("drizzle-orm");
        const bcrypt = await import("bcryptjs");
        
        const found = await db.select().from(users).innerJoin(lecturers, eq(lecturers.userId, users.id)).where(eq(users.username, credentials.username));
        if (found.length === 0) return null;
        const user = found[0];
        
        const valid = await bcrypt.compare(credentials.password, user.users.password);
        if (!valid) return null;
        return {
          id: user.users.id.toString(),
          name: user.users.username,
          email: user.users.username, 
          userType: user.users.userType,
          lecturerId: user.lecturers.lecturerId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      
      if (user) {
        token.id = user.id;
        const u = user as NewUser; 
        token.name = u.name;
        token.userType = u.userType;
        token.lecturerId = u.lecturerId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const newSession = session as NSession;
      if (token) {
        newSession.username = token.name ?? "";
        newSession.userId = parseInt(token.id as string);
        newSession.userType = token.userType as number;
        newSession.lecturerId = token.lecturerId as number;
      }
      return newSession;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
