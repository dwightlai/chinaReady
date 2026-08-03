export interface ArticleSection {
  title: string;
  paragraphs?: string[];
  steps?: string[];
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export function ArticleSections({
  answer,
  sections,
  faqs,
}: {
  answer: string;
  sections: ArticleSection[];
  faqs?: ArticleFaq[];
}) {
  return (
    <div className="space-y-10">
      <p className="border-l-2 border-[var(--warm)] pl-5 text-xl font-bold leading-8 text-[var(--ink)]">{answer}</p>
      {faqs?.length ? (
        <section>
          <p className="text-sm font-bold text-[var(--primary)]">Quick answers</p>
          <h2 className="mt-3 font-[var(--font-display)] text-2xl leading-snug tracking-[-0.02em]">Common questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <details className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4" key={faq.question}>
                <summary className="cursor-pointer font-extrabold text-[var(--ink)]">{faq.question}</summary>
                <p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-[var(--font-display)] text-2xl leading-snug tracking-[-0.02em]">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p className="mt-4 leading-8 text-[var(--muted)]" key={paragraph}>{paragraph}</p>)}
          {section.steps ? <ul className="mt-5 space-y-3 pl-6 leading-8 text-[var(--muted)]">{section.steps.map((step) => <li className="list-disc pl-1" key={step}>{step}</li>)}</ul> : null}
        </section>
      ))}
    </div>
  );
}
