import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { defaultContent, type SiteContent } from "./content";

// Public read of the site content (safe: the table is world-readable by design).
export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const { data } = await sb.from("site_content").select("key, value");
  const out: Record<string, unknown> = { ...defaultContent };
  for (const row of data ?? []) out[row.key] = { ...(defaultContent as Record<string, object>)[row.key], ...(row.value as object) };
  const content = out as Omit<SiteContent, "heroUrl">;

  let heroUrl: string | null = null;
  if (content.home.heroImage) {
    const { data: signed } = await sb.storage.from("site-images").createSignedUrl(content.home.heroImage, 60 * 60 * 24 * 7);
    heroUrl = signed?.signedUrl ?? null;
  }
  return { ...content, heroUrl };
});
