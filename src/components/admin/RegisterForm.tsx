"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, userType }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Registration failed");
    } else {
      setSuccess(true);
      setUsername("");
      setPassword("");
      setUserType(0);
    }
  }

  return (
    <form className="max-w-sm mx-auto p-6 bg-card-background rounded-md shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Register</h2>
      <div className="mb-3">
        <label htmlFor="username" className="block mb-1 font-medium">Username</label>
        <input
          id="username"
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent ${error ? 'error' : ''}`}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          id="password"
          type="password"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent ${error ? 'error' : ''}`}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userType" className="block mb-1 font-medium">User Type</label>
        <select
          id="userType"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent"
          value={userType}
          onChange={e => setUserType(Number(e.target.value))}
        >
          <option value={0}>Student</option>
          <option value={1}>Lecturer</option>
          <option value={2}>Admin</option>
        </select>
      </div>
      {error && <div className="form-error-message mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Registration successful!</div>}
      <button type="submit" className={`btn btn-primary w-full${loading ? ' btn-loading' : ''}`} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
