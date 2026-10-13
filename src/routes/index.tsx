import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { SiteShell, PHONE_HREF } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mum's cafe — Home-style food & coffee in Maseno" },
      { name: "description", content: "Good coffee, tasty home-style meals and friendly service in Maseno, Kisumu County. Open daily 6AM–9PM." },
      { property: "og:title", content: "Mum's cafe — Maseno" },
      { property: "og:description", content: "Good coffee, tasty food and friendly service. Open daily 6AM–9PM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const reviews = [
  { q: "Excellent service, tasty food and a wonderful atmosphere — a thoroughly nice place.", a: "Owen I." },
  { q: "The place is too good. Great dinner spot.", a: "Samson K." },
  { q: "Good food, nice atmosphere and plenty of parking.", a: "Litmusvic7" },
];

function Index() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-8 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-primary">#1 of 29 cafes in Maseno</p>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl">
            Like coming home <em className="text-primary">for chai.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Good coffee, hearty breakfasts and home-style lunches, served with a smile from sunrise to evening.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-warm">See the menu</Link>
            <a href={PHONE_HREF} className="rounded-full border border-foreground/20 px-6 py-3 hover:bg-secondary">Order takeaway</a>
          </div>
        </div>
        <img src={hero} alt="Chai, mandazi and chapati on a sunny cafe table" width={1600} height={1000} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-warm" />
      </section>

      <section className="mx-auto mt-24 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
        {[["4.0★", "Google rating"], ["6–9", "Open every day"], ["KES 1–500", "Per person"], ["Takeaway", "& delivery"]].map(([b, s]) => (
          <div key={s} className="bg-card p-8 text-center">
            <div className="font-display text-3xl">{b}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="font-display text-4xl">What guests say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.a} className="rounded-3xl bg-secondary p-8">
              <blockquote className="font-display text-xl leading-snug">“{r.q}”</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">— {r.a}, Google</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
