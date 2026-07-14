export interface ArticleSection {
  title: string;
  paragraphs?: string[];
  steps?: string[];
}

export function ArticleSections({ answer, sections }: { answer: string; sections: ArticleSection[] }) {
  return (
    <div className="space-y-10">
      <p className="border-l-2 border-[var(--warm)] pl-5 text-xl font-bold leading-8 text-[var(--ink)]">{answer}</p>
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-[var(--font-display)] text-3xl tracking-[-0.035em]">{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p className="mt-4 leading-8 text-[var(--muted)]" key={paragraph}>{paragraph}</p>)}
          {section.steps ? <ul className="mt-5 space-y-3 pl-6 leading-8 text-[var(--muted)]">{section.steps.map((step) => <li className="list-disc pl-1" key={step}>{step}</li>)}</ul> : null}
        </section>
      ))}
    </div>
  );
}
