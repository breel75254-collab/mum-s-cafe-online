import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const PHONE = "+254 704 002641";
export const PHONE_HREF = "tel:+254704002641";
export const MAP_HREF = "https://www.google.com/maps/dir/?api=1&destination=-0.00867010,34.59899330";

export function SiteShell({ children }: { children: ReactNode }) {
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-2xl">Mum's <span className="text-primary italic">cafe</span></Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={link} activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/menu" className={link} activeProps={{ className: "text-foreground" }}>Menu</Link>
          <Link to="/visit" className={link} activeProps={{ className: "text-foreground" }}>Visit</Link>
          <a href={PHONE_HREF} className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground sm:inline-block">Call us</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>Mum's cafe · Maseno, Kisumu County, Kenya</span>
          <span>Open daily 6AM – 9PM · <a href={PHONE_HREF} className="hover:text-foreground">{PHONE}</a></span>
        </div>
      </footer>
    </div>
  );
}
