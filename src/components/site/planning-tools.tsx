import Link from "next/link";

export const planningTools = [
  { href: "/china-visa-free-checker", title: "Can I visit China visa-free?", label: "Visa-free eligibility checker", description: "Start with nationality and entry date. Review possible schemes, official sources and conditions; uncertain policies stay marked for verification." },
  { href: "/china-train-ticket-sale-planner", title: "When do my China train tickets go on sale?", label: "Train ticket sale planner", description: "Calculate your booking date, confirm the station sale time and download a calendar reminder. A reservation is not an issued ticket." },
  { href: "/china-train-station-arrival-time-calculator", title: "How early should I reach the train station?", label: "Station arrival time calculator", description: "Estimate your station arrival window and hotel departure time from your passport, luggage and itinerary needs." },
  { href: "/china-trip-difficulty-checker", title: "Is my China itinerary too ambitious?", label: "Trip difficulty checker", description: "Review your itinerary complexity and find the preparations that need attention first." },
] as const;

/** Server-rendered links remain available before hydration and outside seasonal campaigns. */
export function PlanningTools() {
  return <div className="mt-8 grid gap-4 md:grid-cols-2">{planningTools.map(tool => (
    <article key={tool.href} className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 text-[var(--ink)]">
      <h3 className="text-xl font-extrabold"><Link href={tool.href} className="underline-offset-4 hover:underline">{tool.title}</Link></h3>
      <p className="mt-3 leading-7 text-[var(--muted)]">{tool.description}</p>
      <Link href={tool.href} className="mt-4 inline-block font-bold text-[var(--primary)]">{tool.label} <span aria-hidden="true">→</span></Link>
    </article>
  ))}</div>;
}
