import { Insight } from "./insight.ts";
import { expect, it } from "vitest";

it("should parse the insights", () => {
  const json = [
    {
      "id": 1,
      "brandId": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "text": "John Doe",
    },
    {
      "id": 3,
      "brandId": 1,
      "createdAt": "2026-01-01T00:00:00.000Z",
      "text": "John Doe",
    },
  ];

  const parsed = json.map((e) => Insight.parse(e));
  expect(parsed).toHaveLength(2);
  expect(parsed).toEqual([
    {
      "id": 1,
      "brandId": 1,
      "createdAt": new Date("2026-01-01T00:00:00.000Z"),
      "text": "John Doe",
    },
    {
      "id": 3,
      "brandId": 1,
      "createdAt": new Date("2026-01-01T00:00:00.000Z"),
      "text": "John Doe",
    },
  ]);
});
