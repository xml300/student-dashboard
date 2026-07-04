import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Students } from "@/data/models/students";
import { Users } from "@/data/models/users";
import { Lecturers } from "@/data/models/lecturers";
import { AuthUser } from "@/types/auth";

type Credentials = Record<"username" | "password" | "accountType" | "action", string>;

async function register(credentials: Credentials) {
  if (credentials?.accountType === "student") {
    const { newUser, newStudent } = await Students.create({
      matricNo: credentials.username,
      password: credentials.password
    });
    return {
      id: newUser.id.toString(),
      name: newUser.username,
      email: newUser.username,
      roleId: newUser.userType,
      studentId: newStudent.id,
      matricNo: newStudent.matricNo,
    };
  } else if (credentials?.accountType === "staff") {
    const { newUser, newLecturer } = await Lecturers.create({
      username: credentials.username,
      password: credentials.password
    });

    return {
      id: newUser.id.toString(),
      name: newUser.username,
      email: newUser.username,
      roleId: newUser.userType,
      lecturerId: newLecturer.id,
    };
  }
  return null;
}

async function login(credentials: Credentials) {
  const user = await Users.getByUsername(credentials.username);
  if (!user) return null;

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
  } else if (user.userType === 1) {
    const lecturer = await Lecturers.getByUsername(user.username);
    if (lecturer) authResponse.lecturerId = lecturer.lecturers.id;
  }
  return authResponse;
}


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
        accountType: { label: "Account Type", type: "text" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        if (credentials.action === "signup") {
          return await register(credentials);
        }

        return await login(credentials);
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
        session.user.roleId = token.roleId;
        session.user.studentId = token.studentId;
        session.user.matricNo = token.matricNo;
        session.user.lecturerId = token.lecturerId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
