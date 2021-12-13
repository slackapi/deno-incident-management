import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { NewIncidentWorkflow } from "../workflows/new_incident.ts";

export const NewIncidentShortcut = DefineTrigger(
  "new_incident_shortcut",
  {
    type: TriggerTypes.Shortcut,
    name: "New Incident",
    description: "Creates a new incident",
  },
)
  .runs(NewIncidentWorkflow);
