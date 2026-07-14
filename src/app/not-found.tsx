import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="text-sm font-bold text-[var(--primary)]">404</p>
      <h1 className="mt-3 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">That page is not here.</h1>
      <p className="mt-4 text-[var(--muted)]">Return to the available trip checks and keep preparing.</p>
      <Link className="mt-8 inline-block rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white" href="/checks">View trip checks</Link>
    </main>
  );
}
