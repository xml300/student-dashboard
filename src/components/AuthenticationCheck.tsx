import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthenticationCheck() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status == "loading") return;
        if(!session) router.push("/login"); // Redirect if not authenticated
    }, [session, status, router]);

    return (
        <></>
    );
}