"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      redirect: true,           // automatically redirect after login
      email,
      password,
      callbackUrl: "/",         // redirect here after success
    });
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"   // important: match your credentials key
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password" // important: match your credentials key
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
