"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { beijingDate } from "@/features/planning-tools/ticket-plan";
export function GoldenWeekBanner() {
  const [active, setActive] = useState(false);
  useEffect(() => { const update = () => { const today = beijingDate(new Date()); setActive(today >= "2026-09-01" && today <= "2026-10-07"); }; update(); const timer = window.setInterval(update, 60000); return () => window.clearInterval(timer); }, []);
  if (!active) return null;
  return <aside className="border-b border-orange-200 bg-orange-50 p-5 text-center text-orange-950"><p className="font-bold">Traveling during Golden Week? Know when your train tickets go on sale.</p><Link className="mt-2 inline-block font-bold underline" href="/china-train-ticket-sale-planner">Get your booking dates and calendar reminder →</Link></aside>;
}
