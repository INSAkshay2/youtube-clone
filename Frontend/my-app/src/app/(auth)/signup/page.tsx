import { SignupForm } from "@/components/forms/signup-forms";

export default function SingUoRoute() {
  return <SignupForm />;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    try {
      // axios will set correct multipart header automatically
      await api.post("/signup", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // You may want to call /me or redirect to signin
      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full name" />
      <input name="email" placeholder="Email" />
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <input name="avatar" type="file" accept="image/*" />
      <input name="coverImage" type="file" accept="image/*" />
      <button type="submit" disabled={loading}>Sign up</button>
    </form>
  );
}
