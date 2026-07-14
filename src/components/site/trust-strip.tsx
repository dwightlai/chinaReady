import { CheckCircle, Eye, LockKey } from "@phosphor-icons/react/dist/ssr";

const items = [
  { icon: LockKey, title: "Private by design", text: "Answers stay in your browser." },
  { icon: Eye, title: "Clear reasoning", text: "Every warning explains what to do." },
  { icon: CheckCircle, title: "Sources reviewed", text: "Time-sensitive rules include review dates." },
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
