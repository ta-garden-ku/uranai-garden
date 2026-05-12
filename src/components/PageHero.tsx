type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
};

export function PageHero({ kicker, title, description }: PageHeroProps) {
  return (
    <section className="py-6">
      <p className="kicker">{kicker}</p>
      <h1 className="mt-2 text-3xl font-black leading-tight text-plum sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-plum/75">{description}</p>
    </section>
  );
}
