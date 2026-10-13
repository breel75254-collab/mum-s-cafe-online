// Shapes of the editable site content (stored in the site_content table, one row per key).
export type MenuItem = { name: string; description: string };
export type MenuSection = { name: string; price: string; items: MenuItem[] };
export type Review = { q: string; a: string };

export type HomeContent = {
  badge: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  heroImage: string; // storage path; empty = bundled default photo
  stats: [string, string][];
  reviews: Review[];
};
export type MenuContent = { intro: string; sections: MenuSection[] };
export type SpecialsContent = { items: { day: string; deal: string }[] };
export type ContactContent = {
  name: string;
  phone: string;
  hours: string;
  address: string;
  features: string;
  lat: string;
  lng: string;
};

export type SiteContent = {
  home: HomeContent;
  menu: MenuContent;
  specials: SpecialsContent;
  contact: ContactContent;
  heroUrl: string | null;
};

export const defaultContent: Omit<SiteContent, "heroUrl"> = {
  home: {
    badge: "",
    headline: "Welcome",
    headlineAccent: "",
    intro: "",
    heroImage: "",
    stats: [],
    reviews: [],
  },
  menu: { intro: "", sections: [] },
  specials: { items: [] },
  contact: { name: "Mum's cafe", phone: "", hours: "", address: "", features: "", lat: "", lng: "" },
};

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const mapHref = (c: ContactContent) =>
  `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`;
