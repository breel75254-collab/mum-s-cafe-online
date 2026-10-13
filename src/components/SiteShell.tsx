import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { contentQuery } from "@/lib/content-query";
import { phoneHref } from "@/lib/content";

export function SiteShell({ children }: { children: ReactNode }) {
  const { data } = useSuspenseQuery(contentQuery);
  const c = data.contact;
  const link = "text-sm text-muted-foreground hover:text-foreground transition-colors";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-2xl">Mum's <span className="text-primary italic">cafe</span></Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={link} activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/menu" className={link} activeProps={{ className: "text-foreground" }}>Menu</Link>
          <Link to="/visit" className={link} activeProps={{ className: "text-foreground" }}>Visit</Link>
          {c.phone && <a href={phoneHref(c.phone)} className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground sm:inline-block">Call us</a>}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>{c.name} · Maseno, Kisumu County, Kenya</span>
          <span>
            {c.hours} · <a href={phoneHref(c.phone)} className="hover:text-foreground">{c.phone}</a> ·{" "}
            <Link to="/auth" className="hover:text-foreground">Owner login</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
