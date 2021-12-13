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
          type: Schema.types.number,
          description: "Incident ID",
        },
      },
    },
  },
  async ({ inputs }) => {
    console.log(inputs);
    console.log(
      `New incident created: ${inputs.slug} | ${inputs.description} | ${inputs.severity}`,
    );
    const incidentId = Math.floor(Math.random() * 222222);
    return await {
      completed: true,
      outputs: { id: incidentId },
    };
  },
);
