import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): void => {
  console.log(`Deleting insight=${input.id}`);

  input.db.exec(insightsTable.deleteStatement(input.id));
};
