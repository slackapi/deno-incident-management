import { DefineFunction, Manifest, Schema } from "deno-slack-sdk/mod.ts";

const CreateIncident = DefineFunction({
  callback_id: "create_incident",
  title: "Create Incident",
  description: "Creates an incident",
  source_file: "functions/create_incident.ts",
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
      creator: {
        type: Schema.slack.types.user_id,
        description: "Incident Channel Creator",
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
});

export default Manifest({
  name: "Create a new Incident",
  description:
    "An app for incident management. Create new incidents, spin up new channels, and post incident details for engineering teams to assemble",
  icon: "assets/icon.png",
  functions: [CreateIncident],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "groups:write", "channels:manage", "users:read"],
});
