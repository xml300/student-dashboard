import { JWT as DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            studentId: number;
            matricNo: string;
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: number;
        studentId: number;
        matricNo: string;
    }
}