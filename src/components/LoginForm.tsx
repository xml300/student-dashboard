'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matriculationNumber, password }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="matriculationNumber" className="block text-sm font-medium text-neutral-200 mb-1">Matriculation Number</label>
        <div className="relative mt-1">
          <input
            id="matriculationNumber"
            name="matriculationNumber"
            type="text"
            autoComplete="username"
            required
            value={matriculationNumber}
            onChange={(e) => setMatriculationNumber(e.target.value)}
            className="input-field pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M12 3v18m9-9H3"/></svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-200 mb-1">Password</label>
        <div className="relative mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M16.5 10.5V8.25A4.5 4.5 0 0 0 12 3.75a4.5 4.5 0 0 0-4.5 4.5v2.25m9 0H7.5m9 0a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 16.5 19.5h-9A2.25 2.25 0 0 1 5.25 17.25v-4.5A2.25 2.25 0 0 1 7.5 10.5m0 0V8.25A4.5 4.5 0 0 1 12 3.75a4.5 4.5 0 0 1 4.5 4.5v2.25"/></svg>
          </span>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      <div>
        <button
          type="submit"
          className="w-full text-base px-4 py-2 rounded-lg font-semibold text-white bg-[#F5A623] hover:bg-[#ffb547] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 transition-colors duration-200"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
