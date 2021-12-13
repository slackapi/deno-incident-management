import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";
import { CreateIncident } from "../functions/create_incident.ts";

export const NewIncidentWorkflow = DefineWorkflow("new_incident", {
  title: "New Incident",
  description:
    "Generates a new incident, creates a channel, posts a message to channel",
  input_parameters: {
    required: ["slug", "description", "severity"],
    properties: {
      slug: {
        type: Schema.types.string,
        description: "Incident Name / Slug",
      },
      description: {
        type: Schema.types.string,
        description: "Incident Description",
      },
      severity: {
        type: Schema.types.string,
        description: "Incident Severity",
      },
    },
  },
});

const step1 = NewIncidentWorkflow.addStep(CreateIncident, {
  slug: NewIncidentWorkflow.inputs.slug,
  description: NewIncidentWorkflow.inputs.description,
  severity: NewIncidentWorkflow.inputs.severity,
});
const step2 = NewIncidentWorkflow.addStep(
  Schema.slack.functions.CreateChannel,
  {
    channel_name: NewIncidentWorkflow.inputs.slug,
    is_private: false,
  },
);
NewIncidentWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: step2.outputs.channel_id,
  message:
    `There is an incident: ${step1.outputs.id} ${NewIncidentWorkflow.inputs.description}`,
});
