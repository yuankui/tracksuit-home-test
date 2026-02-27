import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight, InsightCreate } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  describe("single insight", () => {
    withDB((fixture) => {
      const insightCreate: InsightCreate = {
        brandId: 1,
        createdAt: new Date("2026-02-27T00:00:00.000Z"),
        text: "Test insight",
      };

      let result: Insight;

      beforeAll(() => {
        result = createInsight({ ...fixture, insight: insightCreate });
      });

      it("returns the created insight with generated id", () => {
        expect(result).toEqual({
          ...insightCreate,
          id: 1,
          createdAt: insightCreate.createdAt,
        });
      });

      it("persists the insight in the database", () => {
        const all = fixture.insights.selectAll();
        expect(all).toHaveLength(1);
        expect(all[0]).toMatchObject({
          id: 1,
          brandId: 1,
          text: "Test insight",
        });
      });
    });
  });

  describe("multiple insights", () => {
    withDB((fixture) => {
      let first: Insight;
      let second: Insight;

      beforeAll(() => {
        first = createInsight({
          ...fixture,
          insight: {
            brandId: 0,
            createdAt: new Date(),
            text: "First",
          },
        });
        second = createInsight({
          ...fixture,
          insight: {
            brandId: 2,
            createdAt: new Date(),
            text: "Second",
          },
        });
      });

      it("assigns auto-incrementing ids", () => {
        expect(first.id).toBe(1);
        expect(second.id).toBe(2);
      });

      it("persists both insights", () => {
        const all = fixture.insights.selectAll();
        expect(all).toHaveLength(2);
        expect(all[0].text).toBe("First");
        expect(all[1].text).toBe("Second");
      });
    });
  });
});
