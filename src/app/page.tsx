import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)]">
      <h1 className="text-4xl font-bold mb-4">Student Portal</h1>
      <Link href="/login" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Login
      </Link>
    </div>
  );
}
