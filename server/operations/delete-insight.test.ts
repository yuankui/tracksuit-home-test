import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights from the database", () => {
  describe("existing insight", () => {
    withDB((fixture) => {
      let created: Insight;

      beforeAll(() => {
        created = createInsight({
          ...fixture,
          insight: {
            brand: 1,
            createdAt: new Date(),
            text: "To be deleted",
          },
        });
        deleteInsight({ ...fixture, id: created.id });
      });

      it("removes the insight from the database", () => {
        const all = fixture.insights.selectAll();
        expect(all).toHaveLength(0);
      });
    });
  });

  describe("non-existent insight", () => {
    withDB((fixture) => {
      beforeAll(() => {
        deleteInsight({ ...fixture, id: 999 });
      });

      it("does not throw", () => {
        const all = fixture.insights.selectAll();
        expect(all).toHaveLength(0);
      });
    });
  });

  describe("one of multiple insights", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "First" },
        { id: 2, brand: 1, createdAt: new Date(), text: "Second" },
        { id: 3, brand: 2, createdAt: new Date(), text: "Third" },
      ];

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        deleteInsight({ ...fixture, id: 2 });
      });

      it("removes only the specified insight", () => {
        const all = fixture.insights.selectAll();
        expect(all).toHaveLength(2);
        expect(all.map((r) => r.id)).toEqual([1, 3]);
        expect(all.map((r) => r.text)).toEqual(["First", "Third"]);
      });
    });
  });
});
