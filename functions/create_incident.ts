import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

// deno-lint-ignore no-explicit-any
const CreateIncident: FunctionHandler<any, any> = async (args: any) => {
  const token: string = args.token;
// deno-lint-ignore no-explicit-any
  const inputs: any = args.inputs;
// deno-lint-ignore no-explicit-any
  const env: any = args.env;
  console.log(inputs);
  // TODO: maybe validate inputs.slug to make sure it conforms to channel naming requirements?
  // see https://api.slack.com/methods/conversations.create#naming
  const slackApiUrl = env["SLACK_API_URL"];
  console.log(
    `New incident created: ${inputs.slug} | ${inputs.description} | ${inputs.severity}`,
  );
  const incidentId = Math.floor(Math.random() * 222222);

  // Create a channel first
  const client = SlackAPI(token, { slackApiUrl });
  // deno-lint-ignore no-explicit-any
  let res: any;
  console.log('Creating channel...');
  try {
    res = await client.apiCall('conversations.create', {
      name: inputs.slug,
      is_private: false,
    });
  } catch (e) {
    console.error(e);
    return { completed: false, error: `Error during channel creation: ${e.message}` };
  }
  if (!res || res.ok !== true) {
    console.error(res);
    return { completed: false, error: `Bad response from channel creation API: ${res.error}` };
  }
  const channel = res.channel.id;

  // Send a message to the new channel second
  console.log('Sending message...');
  try {
    await client.apiCall('chat.postMessage', {
      channel,
      text: `There is an incident: #${incidentId} ${inputs.description}`,
    });
  } catch (e) {
    console.error(e);
    return { completed: false, error: `Error incident channel message posting: ${e.message}` };
  }
  console.log('Incident created!');
  return await {
    completed: true,
    outputs: { id: String(incidentId) },
  };
};

export default CreateIncident;
