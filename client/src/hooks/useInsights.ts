import { useQuery } from "@tanstack/react-query";
import { Insight } from "../schemas/insight.ts";

export const useInsights = () => {
  return useQuery({
    queryKey: ["insights", "all"],
    queryFn: async (): Promise<Insight[]> => {
      const res = await fetch(`/api/insights`);
      const json = await res.json();
      const list = json.map((e: unknown) => Insight.parse(e));
      return list;
    },
  });
};
