import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Insight } from "../schemas/insight.ts";

export type CreateInsightInput = Omit<Insight, "id">;

export const useAddInsights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateInsightInput) => {
      const res = await fetch("/api/insights/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandId: input.brandId,
          createdAt: input.createdAt.toISOString(),
          text: input.text,
        }),
      });
      if (!res.ok) throw new Error("Failed to create insight");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights", "all"] });
    },
  });
};
