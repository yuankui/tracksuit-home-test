import type { Insight, InsightCreate } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  insight: InsightCreate;
};

export default (input: Input): Insight => {
  console.log(`Adding insight=${input.insight}`);

  input.db.exec(insightsTable.insertStatement({
    ...input.insight,
    createdAt: input.insight.createdAt.toISOString(),
  }));

  const id = input.db.lastInsertRowId;
  return {
    ...input.insight,
    id,
    createdAt: input.insight.createdAt,
  };
};
