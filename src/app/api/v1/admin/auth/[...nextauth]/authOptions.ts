import { User, Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { Lecturers } from "@/data/models/lecturers";

interface NewUser extends User {
  roleId: number;
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
        const bcrypt = await import("bcryptjs");
        
        const user = await Lecturers.getByUsername(credentials.username);
        if(!user) return null;
        
        const valid = await bcrypt.compare(credentials.password, user.users.password);
        if (!valid) return null;

        return {
          id: user.users.id.toString(),
          name: user.users.username,
          email: user.users.username, 
          roleId: user.users.userType,
          lecturerId: user.lecturers.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      
      if (user) {
        token.userId = Number(user.id);
        const u = user as NewUser; 
        token.name = u.name;
        token.roleId = u.roleId;
        token.lecturerId = u.lecturerId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.username = token.name ?? "";
        session.user.userId = token.userId;
        session.user.roleId = token.roleId;
        session.user.lecturerId = token.lecturerId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
