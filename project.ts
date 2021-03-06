import { Project } from "slack-cloud-sdk/mod.ts";
import { NewIncidentShortcut } from "./triggers/new_incident_shortcut.ts";

Project({
  name: "Create a new Incident",
  description:
    "An app for incident management. Create new incidents, spin up new channels, and post incident details for engineering teams to assemble",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "groups:write",
  ],
  triggers: [NewIncidentShortcut],
  tables: [],
  outgoingDomains: [],
});
