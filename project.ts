import { Project } from "slack-cloud-sdk/mod.ts";
import { CreateIncident } from "./functions/create_incident.ts";
import { NewIncidentWorkflow } from "./workflows/new_incident.ts";
import { NewIncidentSlashCommand } from "./triggers/new_incident_slash_command.ts";

Project({
  name: "Create a new Incident",
  description: "An app for incident management. Create new incidents, spin up new channels, and post incident details for engineering teams to assemble",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "groups:write",
  ],
  functions: [CreateIncident],
  workflows: [NewIncidentWorkflow],
  triggers: [NewIncidentSlashCommand],
  tables: [],
  outgoingDomains: [],
});
