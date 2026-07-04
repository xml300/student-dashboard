import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/data/db";
import { users, students } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Students } from "@/data/models/students";
import { Users } from "@/data/models/users";
import { Lecturers } from "@/data/models/lecturers";
import { JWT } from "next-auth/jwt";
import { AuthUser } from "@/types/auth";


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
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        if (credentials.action === "signup") {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await db
            .insert(users)
            .values({
              username: credentials.username,
              password: hashedPassword,
            })
            .returning();

            const newStudent = await db
              .insert(students)
              .values({
                userId: newUser[0].id,
                matricNo: credentials.username,
              })
              .returning();

            return {
              id: newUser[0].id.toString(),
              name: newUser[0].username,
              email: newUser[0].username,
              roleId: newUser[0].userType,
              studentId: newStudent[0].id,
              matricNo: newStudent[0].matricNo,
            };
        }

        const user = await Users.getByUsername(credentials.username);
        if(!user) return null;
        
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        const authResponse: AuthUser = {
          id: user.id.toString(),
          name: user.username,
          email: user.username, 
          roleId: user.userType
        };
        if (user.userType === 0) {
          const student = await Students.getByRegNo(user.username);
          authResponse.studentId = student.students.id;
          authResponse.matricNo = student.students.matricNo;
        }else if(user.userType === 1) {
          const lecturer = await Lecturers.getByUsername(user.username);
          if(lecturer) authResponse.lecturerId = lecturer.lecturers.id;
        }
        return authResponse;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = parseInt(user.id);
        token.roleId = user.roleId;
        token.studentId = user.studentId;
        token.matricNo = user.matricNo;
        token.lecturerId = user.lecturerId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? 0;
        session.user.studentId = token.studentId;
        session.user.matricNo = token.matricNo;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
 