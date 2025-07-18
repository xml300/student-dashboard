import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users, students } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

interface NewUser extends User {
  id: string;
  name: string;
  email: string;
  studentId: number;
  matricNo: string;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
        matricNo: { label: "Matriculation Number", type: "text" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials): Promise<NewUser | null> {
        if (!credentials?.matricNo || !credentials?.password) {
          return null;
        }

        const studentQuery = await db
          .select()
          .from(students)
          .where(eq(students.matricNo, credentials.matricNo));
        let student = studentQuery[0];

        if (!student) {
          if (credentials.action === "signup") {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await db
              .insert(users)
              .values({
                username: credentials.matricNo,
                password: hashedPassword,
              })
              .returning();

            const newStudent = await db
              .insert(students)
              .values({
                userId: newUser[0].id,
                matricNo: credentials.matricNo,
              })
              .returning();

            return {
              id: newUser[0].id.toString(),
              name: newUser[0].username,
              email: newUser[0].username,
              studentId: newStudent[0].studentId,
              matricNo: newStudent[0].matricNo,
            };
          }
          return null;
        }

        if (!student.userId) {
          return null;
        }

        const user = (
          await db.select().from(users).where(eq(users.id, student.userId))
        )[0];

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.username,
          studentId: student.studentId,
          matricNo: student.matricNo,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.studentId = (user as any).studentId;
        token.matricNo = (user as any).matricNo;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).studentId = token.studentId;
        (session.user as any).matricNo = token.matricNo;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
