import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { TicketPlanner } from "@/features/planning-tools/ticket-planner";
import { saleRuleSource, saleTimeSource } from "@/features/planning-tools/ticket-plan";

const path = "/china-train-ticket-sale-planner";
const description = "Find when China train tickets go on sale, confirm station sale times and download a calendar reminder for Golden Week or any upcoming trip.";
export const metadata: Metadata = { title: "China Train Ticket Sale Planner — Golden Week 2026", description, alternates: { canonical: path } };
export default function TicketPlannerPage() {
  return <main className="py-12"><SoftwareApplicationJsonLd name="China Train Ticket Sale Planner" description={description} path={path} /><Container>
    <h1 className="text-4xl font-extrabold">China Train Ticket Sale Planner</h1>
    <p className="my-6 max-w-3xl text-lg">Know which day to act, confirm your station’s sale time and prepare a backup if your ticket is not issued.</p>
    <TicketPlanner />
    <section className="mt-10 space-y-4"><h2 className="text-2xl font-bold">Golden Week 2026 booking dates</h2><p>September 30 departures: September 16 sale date. October 1 departures: September 17. October 7 departures: September 23.</p><p>The normal 15-day presale window includes the departure day: subtract 14 calendar days. Special trains, adjustments and provider-specific reservation deadlines may differ. This tool does not check live inventory or make reservations.</p><p>Rule checked September 15, 2026: <a className="underline" href={saleRuleSource}>12306 ticket sale rules</a> · <a className="underline" href={saleTimeSource}>Official station sale time lookup</a>.</p><p>National Day is October 1–7. September 29–October 9 is a planning pressure window, not an extended official holiday.</p></section>
  </Container></main>;
}
