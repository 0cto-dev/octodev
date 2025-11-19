"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1>Entrar</h1>

      <button onClick={() => signIn("google")}>
        Entrar com Google
      </button>
    </div>
  );
}
