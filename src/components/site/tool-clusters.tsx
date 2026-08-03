import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const clusters = [
  { name: "Payment", check: "/china-payment-checker", checkLabel: "Check payment readiness", topics: [{ label: "Alipay & WeChat", href: "/guides/test-mobile-payment-before-china" }, { label: "Cards & cash", href: "/guides/one-payment-method-is-not-enough" }, { label: "Phone & eSIM checker", href: "/china-phone-checker" }] },
  { name: "Apps", check: "/china-app-checker", checkLabel: "Check China apps", topics: [{ label: "Arrival internet", href: "/guides/arrive-with-working-internet" }, { label: "DiDi", href: "/guides/didi-without-chinese-number" }, { label: "SIM or eSIM", href: "/guides/buy-sim-or-esim-for-china" }] },
  { name: "Train booking", check: "/china-train-checker", checkLabel: "Check train booking", topics: [{ label: "All booking readiness", href: "/china-booking-checker" }, { label: "12306 & passport", href: "/guides/train-booking-for-foreign-visitors" }, { label: "Holiday demand", href: "/guides/china-holidays-tickets-hotels" }] },
  { name: "Passport", check: "/checks/passport", checkLabel: "Check passport needs", topics: [{ label: "Entry documents", href: "/guides/china-entry-requirements-checklist" }, { label: "Real-name bookings", href: "/guides/train-booking-for-foreign-visitors" }] },
  { name: "Hotels", check: "/china-hotel-checker", checkLabel: "Check hotel arrival", topics: [{ label: "Late check-in", href: "/guides/confirm-late-hotel-check-in-china" }, { label: "Chinese address", href: "/guides/save-hotel-name-address-in-chinese" }] },
  { name: "Travel dates", check: "/checks/dates", checkLabel: "Check travel dates", topics: [{ label: "Public holidays", href: "/guides/china-holidays-tickets-hotels" }, { label: "National Day", href: "/guides/travel-during-china-national-day" }] },
] as const;

export function ToolClusters() {
  return <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{clusters.map((cluster) => (
    <article className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6" key={cluster.name}>
      <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--primary)]">Readiness topic</p>
      <h3 className="mt-3 text-xl font-extrabold">{cluster.name}</h3>
      <Link className="mt-5 inline-flex items-center gap-2 font-extrabold text-[var(--primary)]" href={cluster.check}>{cluster.checkLabel}<ArrowUpRight aria-hidden size={16} weight="bold" /></Link>
      <ul className="mt-5 border-t border-[var(--line)] pt-4">{cluster.topics.map((topic) => <li className="mt-2 first:mt-0" key={topic.href}><Link className="text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]" href={topic.href}>{topic.label}</Link></li>)}</ul>
    </article>
  ))}</div>;
}
