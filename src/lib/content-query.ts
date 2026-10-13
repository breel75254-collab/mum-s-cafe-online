import { queryOptions } from "@tanstack/react-query";
import { getSiteContent } from "./content.functions";

export const contentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 30_000,
});
