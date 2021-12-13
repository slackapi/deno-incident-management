import { DefineTable, Schema } from "slack-cloud-sdk/mod.ts";

export const Incidents = DefineTable("incidents", {
  primary_key: "id",
  columns: {
    id: {
      type: Schema.types.string,
    },
    slug: {
      type: Schema.types.string,
    },
    description: {
      type: Schema.types.string,
    },
    severity: {
      type: Schema.types.string,
    },
  },
});
