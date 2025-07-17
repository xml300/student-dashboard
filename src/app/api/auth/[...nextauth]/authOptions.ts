import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = (
          await db
            .select()
            .from(users)
            .where(eq(users.username, credentials.username))
        )[0];

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          await db.insert(users).values({
            username: credentials.username,
            password: hashedPassword,
          });
          const newUser = (
            await db
              .select()
              .from(users)
              .where(eq(users.username, credentials.username))
          )[0];
          return {
            id: "dummy-id",
            name: newUser.username,
            email: newUser.username,
          };
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: "dummy-id",
          name: user.username,
          email: user.username,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
