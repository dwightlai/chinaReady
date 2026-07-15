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
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-[var(--font-display)] text-2xl leading-snug tracking-[-0.02em]">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p className="mt-4 leading-8 text-[var(--muted)]" key={paragraph}>{paragraph}</p>)}
          {section.steps ? <ul className="mt-5 space-y-3 pl-6 leading-8 text-[var(--muted)]">{section.steps.map((step) => <li className="list-disc pl-1" key={step}>{step}</li>)}</ul> : null}
        </section>
      ))}
      {faqs?.length ? (
        <section>
          <h2 className="font-[var(--font-display)] text-2xl leading-snug tracking-[-0.02em]">Common questions</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-extrabold text-[var(--ink)]">{faq.question}</h3>
                <p className="mt-2 leading-8 text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
