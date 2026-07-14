import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { checkCatalog } from "@/features/checks/catalog";

export function ToolGrid() {
  const primary = checkCatalog[0];
  const rest = checkCatalog.slice(1);
  if (!primary) return null;

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <article className="min-h-72 rounded-[var(--radius-lg)] bg-[var(--primary)] p-8 text-white sm:p-10" data-testid="check-card">
        <p className="text-sm font-bold text-blue-100">01 · {primary.duration}</p>
        <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">{primary.name}</h3>
        <p className="mt-4 max-w-[48ch] text-lg leading-8 text-blue-50">{primary.description}</p>
        <Link className="mt-10 inline-flex items-center gap-2 text-sm font-extrabold" href={`/checks/${primary.slug}`}>
          {primary.cta}<ArrowUpRight aria-hidden size={17} weight="bold" />
        </Link>
      </article>

      <div className="grid gap-4">
        {rest.map((tool, index) => (
          <article className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 sm:p-7" data-testid="check-card" key={tool.slug}>
            <p className="text-sm font-bold text-[var(--muted)]">0{index + 2} · {tool.duration}</p>
            <h3 className="mt-3 text-xl font-extrabold tracking-[-0.03em]">{tool.name}</h3>
            <p className="mt-2 leading-7 text-[var(--muted)]">{tool.description}</p>
            <Link className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold" href={`/checks/${tool.slug}`}>
              {tool.cta}<ArrowUpRight aria-hidden size={17} weight="bold" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
