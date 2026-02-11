"use client";

import { useState } from "react";

export function MiniForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 text-sm">
        ✅ Thanks! We’ll get back to you shortly.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-background p-4 space-y-3"
    >
      <h3 className="text-sm font-semibold">Request more details</h3>

      <input
        className="w-full rounded-md border px-3 py-2 text-sm"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="w-full rounded-md border px-3 py-2 text-sm"
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
}
