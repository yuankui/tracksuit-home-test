import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteInsight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/insights/delete/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to delete insight");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insights", "all"] });
    },
  });
};
