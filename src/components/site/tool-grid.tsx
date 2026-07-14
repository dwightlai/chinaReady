import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { checkCatalog } from "@/features/checks/catalog";

export function ToolGrid() {
  return (
    <div className="mt-10 grid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
      {checkCatalog.map((tool, index) => (
        <article
          className={`min-h-64 p-7 sm:p-9 ${index === 0 ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--ink)]"}`}
          data-testid="check-card"
          key={tool.slug}
        >
          <p className={`text-xs font-extrabold uppercase tracking-[0.12em] ${index === 0 ? "text-blue-100" : "text-[var(--muted)]"}`}>
            0{index + 1} · {tool.duration}
          </p>
          <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.035em]">{tool.name}</h3>
          <p className={`mt-3 max-w-[48ch] leading-7 ${index === 0 ? "text-blue-50" : "text-[var(--muted)]"}`}>{tool.description}</p>
          <Link className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold" href={`/checks/${tool.slug}`}>
            {tool.cta}<ArrowUpRight aria-hidden size={17} weight="bold" />
          </Link>
        </article>
      ))}
    </div>
  );
}
