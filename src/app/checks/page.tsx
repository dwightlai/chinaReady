import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { ToolGrid } from "@/components/site/tool-grid";

export const metadata: Metadata = { title: "Trip checks", description: "Choose one of four practical China travel preparation checks." };

export default function ChecksPage() {
  return <main className="bg-[var(--surface)] py-16 sm:py-24"><Container><h1 className="font-[var(--font-display)] text-5xl tracking-[-0.05em]">Trip checks</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Check the parts of your plan most likely to create avoidable problems.</p><ToolGrid /></Container></main>;
}
