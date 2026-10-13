import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Daily Specials — Mum's cafe Maseno" },
      { name: "description", content: "Breakfast, tilapia, nyama, pilau, burgers, shawarma and weekly specials at Mum's cafe, Maseno. Meals from KES 40." },
      { property: "og:title", content: "Menu & Daily Specials — Mum's cafe Maseno" },
      { property: "og:description", content: "Traditional Kenyan dishes, fast food and breakfast combos from KES 40." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Menu,
});

// Edit this list to change the menu shown on the site.
const menu = [
  {
    name: "Breakfast & Starters",
    price: "KES 40 – 600",
    groups: [
      ["Tea & Coffee", "Regular tea, special house coffee, milk"],
      ["Sides & Bites", "Freshly made samosas, mandazi, eggs — fried, boiled or omelette"],
      ["Breakfast combos", "Mix and match your morning favourites"],
    ],
  },
  {
    name: "Main Dishes & Traditional Platters",
    price: "KES 100 – 650 · group platters up to KES 1,800+",
    groups: [
      ["Fish — local favourite", "Deep-fried or stewed tilapia and fish fillets, with ugali and sukuma wiki or managu"],
      ["Poultry & Meats", "Wet or dry fry beef, liver, chicken, gizzards and goat meat (mbuzi)"],
      ["Starches & Cereals", "Rice, pilau, mukimo, githeri and yellow beans"],
    ],
  },
  {
    name: "Fast Food & Quick Bites",
    price: "KES 400 – 650",
    groups: [
      ["Burgers & Sandwiches", "Beef or chicken burgers, toasted sandwiches"],
      ["Wraps & Shawarma", "Quick-service chicken or beef wraps"],
    ],
  },
];

const specials = [
  ["Monday", "House Coffee"],
  ["Tuesday", "Buy 1 Pizza, get 1 free"],
  ["Wednesday", "Buy 1 Cocktail, get 1 free"],
  ["Friday", "Buy 1 Shawarma, get 1 free"],
  ["Saturday", "1kg Nyama Choma with free ugali"],
  ["Sunday", "Family Platter — 1kg harchy, ½ chicken, free kachumbari & 1.25L soda"],
];

function Menu() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 pt-10">
        <h1 className="font-display text-6xl">The menu</h1>
        <p className="mt-4 text-muted-foreground">Freshly cooked, affordable meals from KES 40. Cash only · takeaway & delivery available.</p>

        <div className="mt-14 space-y-16">
          {menu.map((s) => (
            <div key={s.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                <h2 className="font-display text-3xl italic text-primary">{s.name}</h2>
                <span className="text-sm text-muted-foreground">{s.price}</span>
              </div>
              <ul className="mt-2 divide-y divide-border">
                {s.groups.map(([t, d]) => (
                  <li key={t} className="py-5">
                    <div className="text-lg font-medium">{t}</div>
                    <div className="mt-1 text-muted-foreground">{d}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-6">
        <div className="rounded-[2rem] bg-secondary p-8 sm:p-12">
          <h2 className="font-display text-4xl">Weekly specials</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {specials.map(([day, deal]) => (
              <li key={day} className="rounded-2xl bg-card p-5">
                <div className="text-xs uppercase tracking-widest text-primary">{day}</div>
                <div className="mt-1 font-display text-xl">{deal}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
