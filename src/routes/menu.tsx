import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Mum's cafe Maseno" },
      { name: "description", content: "Breakfast, lunch, dinner and coffee at Mum's cafe in Maseno. Affordable home-style Kenyan dishes." },
      { property: "og:title", content: "Menu — Mum's cafe Maseno" },
      { property: "og:description", content: "Breakfast, lunch, dinner and coffee — all under KES 500." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Menu,
});

const menu = [
  { name: "Breakfast", items: [["Chai & 2 mandazi", 80], ["Chapati & beans", 150], ["Eggs, sausage & toast", 250]] },
  { name: "Lunch & Dinner", items: [["Pilau with kachumbari", 300], ["Ugali, sukuma & beef stew", 350], ["Chicken stew & rice", 450]] },
  { name: "Coffee & Drinks", items: [["Kenyan coffee", 120], ["Spiced chai", 70], ["Fresh juice", 150]] },
];

function Menu() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 pt-10">
        <h1 className="font-display text-6xl">The menu</h1>
        <p className="mt-4 text-muted-foreground">Simple, honest food. Cash only · takeaway & delivery available.</p>
        <div className="mt-14 space-y-14">
          {menu.map((s) => (
            <div key={s.name}>
              <h2 className="font-display text-3xl text-primary italic">{s.name}</h2>
              <ul className="mt-6 divide-y divide-border">
                {s.items.map(([n, p]) => (
                  <li key={n} className="flex items-baseline justify-between py-4 text-lg">
                    <span>{n}</span><span className="text-muted-foreground">KES {p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
