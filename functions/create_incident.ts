import { DefineFunction, Schema } from "slack-cloud-sdk/mod.ts";

export const CreateIncident = DefineFunction(
  "create_incident",
  {
    title: "Create Incident",
    description: "Creates an incident",
    input_parameters: {
      required: ["slug", "description", "severity"],
      properties: {
        slug: {
          type: Schema.types.string,
          description: "Incident Name / Title",
        },
        description: {
          type: Schema.types.string,
          description: "Short Description of Incident",
        },
        severity: {
          type: Schema.types.string,
          description: "Incident Impact / Severity",
        },
      },
    },
    output_parameters: {
      required: ["id"],
      properties: {
        id: {
          type: Schema.types.string,
          description: "Incident ID",
        },
      },
    },
  },
  async ({ inputs, client }) => {
    const incidentId = crypto.randomUUID();
    await client.call("apps.hosted.tables.putRow", {
      table: "incidents",
      row: {
        id: incidentId,
        slug: inputs.slug,
        description: inputs.description,
        severity: inputs.severity,
      },
    });
    console.log(inputs);
    console.log(
      `New incident created: ${inputs.slug} | ${inputs.description} | ${inputs.severity}`,
    );
    return await {
      completed: true,
      outputs: { id: incidentId },
    };
  },
);
