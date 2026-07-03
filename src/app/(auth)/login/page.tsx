import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-neutral-950 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-neutral-100">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Or{' '}
          <Link
            href="/signup"
            className="font-medium text-neutral-200 underline hover:text-white transition-colors"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-900 py-8 px-4 shadow-lg rounded-2xl sm:px-10 border border-neutral-800">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
