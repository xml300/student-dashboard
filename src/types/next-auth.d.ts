// types/next-auth.d.ts
import { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"
import { AuthUser, SessionUser } from "./auth"

declare module "next-auth" {
  interface User extends AuthUser {}

  interface Session {
    user: SessionUser & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, SessionUser {}
}