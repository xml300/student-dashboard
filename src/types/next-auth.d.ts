import { JWT as DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {
    interface Session {
        user: {
            userId: number;
        roleId: number;
        username: string;
        studentId: number;
        lecturerId: number;
        matricNo: string;
        }
    }
}


declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        userId: number;
        roleId: number;
        username: string;
        studentId: number;
        lecturerId: number;
        matricNo: string;
    }
}