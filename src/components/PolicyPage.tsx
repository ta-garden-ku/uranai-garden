import { PageHero } from "@/components/PageHero";

type Props = {
  kicker: string;
  title: string;
  description: string;
  sections: Array<{ heading: string; body: string }>;
};

export function PolicyPage({ kicker, title, description, sections }: Props) {
  return (
    <main className="page-shell space-y-6">
      <PageHero kicker={kicker} title={title} description={description} />
      <article className="soft-card space-y-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-plum">{section.heading}</h2>
            <p className="mt-2 leading-8 text-plum/75">{section.body}</p>
          </section>
        ))}
      </article>
    </main>
  );
}
