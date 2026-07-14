import Link from "next/link";

interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm font-semibold text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link className="hover:text-[var(--ink)]" href="/">Home</Link></li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.label}>
            <span aria-hidden>/</span>
            {item.href ? <Link className="hover:text-[var(--ink)]" href={item.href}>{item.label}</Link> : <span className="text-[var(--ink)]">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
