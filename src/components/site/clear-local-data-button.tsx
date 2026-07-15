"use client";

import { useState } from "react";

import { clearAllCheckData } from "@/features/checks/storage";

export function ClearLocalDataButton() {
  const [status, setStatus] = useState<"idle" | "cleared">("idle");

  function clearData() {
    clearAllCheckData();
    setStatus("cleared");
  }

  return (
    <div className="mt-8 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-6">
      <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[var(--ink)]">Clear local check data</h2>
      <p className="mt-3 leading-7 text-[var(--muted)]">
        Remove every draft and report stored in this browser. This does not affect Umami page-view analytics.
      </p>
      <button
        className="mt-5 rounded-full border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-extrabold text-[var(--critical)] transition hover:bg-[var(--surface-strong)]"
        onClick={clearData}
        type="button"
      >
        {status === "cleared" ? "Local data cleared" : "Clear all local answers and reports"}
      </button>
    </div>
  );
}
