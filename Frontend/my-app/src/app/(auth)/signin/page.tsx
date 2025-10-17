"use client";

import { SigninForm } from "@/components/forms/signin-form";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
export function SingInRoute() {
  return <SigninForm />;
}

export function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/signin", form);
      // successful login: backend set cookies (httpOnly)
      // optional: fetch /me to get user data
      const { data } = await api.get("/me"); // requires authMiddleware
      // store user in client state or context as needed
      router.push("/"); // redirect
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="email"
      />
      <input
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="username"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="password"
      />
      <button type="submit" disabled={loading}>
        Sign in
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}
