import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <h1 className="text-4xl font-bold mb-4 text-neutral-100">Student Portal</h1>
      <Link href="/login" className="px-5 py-2 rounded-lg bg-neutral-800 text-neutral-100 hover:bg-neutral-700 border border-neutral-700 transition-colors">
        Login
      </Link>
    </div>
  );
}
