import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if(credentials.email == "test@example.com"){
            return {id: 2} as unknown as User;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
