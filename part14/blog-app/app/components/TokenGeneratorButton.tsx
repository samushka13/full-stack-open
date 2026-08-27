"use client";

import { useTransition } from "react";
import { updateApiToken } from "@/app/actions/users";

export default function TokenGeneratorButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      data-testid="generate-token-button"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await updateApiToken();
        });
      }}
      className="rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]"
    >
      {isPending ? "Generating..." : "Generate new token"}
    </button>
  );
}
