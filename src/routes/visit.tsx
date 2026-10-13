import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PHONE, PHONE_HREF, MAP_HREF } from "@/components/SiteShell";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit — Mum's cafe Maseno" },
      { name: "description", content: "Find Mum's cafe in Maseno, Kisumu County. Open daily 6AM–9PM. Call +254 704 002641." },
      { property: "og:title", content: "Visit Mum's cafe in Maseno" },
      { property: "og:description", content: "Open daily 6AM–9PM. Outdoor seating, takeaway and delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Visit,
});

function Visit() {
  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-6xl">Come visit</h1>
          <p className="mt-3 text-muted-foreground">Also known locally as Mum's Hotel &amp; Accommodation.</p>
          <dl className="mt-10 space-y-8 text-lg">
            <div><dt className="text-sm uppercase tracking-widest text-primary">Address</dt><dd className="mt-1">Maseno town, opposite the Jumia pick-up station<br/>XHRX+GHQ, Maseno, Kisumu County, Kenya</dd></div>
            <div><dt className="text-sm uppercase tracking-widest text-primary">Hours</dt><dd className="mt-1">Every day, 6AM – 9PM</dd></div>
            <div><dt className="text-sm uppercase tracking-widest text-primary">Phone</dt><dd className="mt-1"><a href={PHONE_HREF} className="underline underline-offset-4">{PHONE}</a></dd></div>
            <div><dt className="text-sm uppercase tracking-widest text-primary">Good to know</dt><dd className="mt-1">Cash only · Outdoor seating · Takeaway · Delivery · Plenty of parking</dd></div>
          </dl>
          <a href={MAP_HREF} target="_blank" rel="noreferrer" className="mt-10 inline-block rounded-full bg-primary px-6 py-3 text-primary-foreground shadow-warm">Get directions</a>
        </div>
        <iframe title="Map to Mum's cafe" src="https://maps.google.com/maps?q=-0.00867010,34.59899330&z=16&output=embed" className="min-h-[420px] w-full rounded-[2rem] border border-border" loading="lazy" />
      </section>
    </SiteShell>
  );
}
