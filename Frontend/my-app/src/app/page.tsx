import Image from "next/image";

export default function Home() {
  return <div> frontend</div>;
}
// server component
import { cookies } from "next/headers";

export async function ServerPage() {
  const cookieHeader = cookies().toString() || "";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/users/me`, {
    headers: {
      cookie: cookieHeader,
    },
    // Next fetch defaults to GET
  });

  const json = await res.json();

  return (
    <div>
      <h1>Server-side user</h1>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}