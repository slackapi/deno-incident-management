import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { NewIncidentWorkflow } from "../workflows/new_incident.ts";

export const NewIncidentSlashCommand = DefineTrigger(
  "new_incident_slash_command",
  {
    type: TriggerTypes.SlashCommand,
    name: "/newincident",
    usage_hint: "Create a new incident [slug]",
    description: "Creates a new incident",
  },
)
  .runs(NewIncidentWorkflow)
  .withInputs((ctx) => ({
    slug: ctx.data.command.text,
    description: ctx.data.command.text,
    severity: ctx.data.command.text,
  }));
