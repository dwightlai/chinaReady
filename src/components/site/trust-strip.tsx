import { CheckCircle, Eye, LockKey } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: LockKey, title: "Answers stay local", text: "Drafts and reports are stored only in this browser." },
  { icon: Eye, title: "Each warning has an action", text: "Findings explain the risk and the next practical step." },
  { icon: CheckCircle, title: "Time-sensitive rules are dated", text: "Holiday and provider guidance includes a review date." },
];

export function TrustStrip() {
  return (
    <div className="grid border-y border-[var(--line)] md:grid-cols-3">
      {items.map(({ icon: Icon, text, title }) => (
        <div className="flex gap-4 px-5 py-7 md:border-r md:border-[var(--line)] md:last:border-r-0" key={title}>
          <Icon aria-hidden className="mt-0.5 shrink-0 text-[var(--primary)]" size={22} />
          <div><p className="font-extrabold">{title}</p><p className="mt-1 text-sm leading-6 text-[var(--muted)]">{text}</p></div>
        </div>
      ))}
    </div>
  );
}
