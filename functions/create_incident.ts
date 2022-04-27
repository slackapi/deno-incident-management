import type { FunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { paramCase } from "https://deno.land/x/case@2.1.1/mod.ts";

// deno-lint-ignore no-explicit-any
const CreateIncident: FunctionHandler<any, any> = async ({ inputs, env, token }) => {
  console.log(inputs);
  // Tweak the channel name to conform to channel naming requirements: https://api.slack.com/methods/conversations.create#naming
  const slug = paramCase(inputs.slug);
  const slackApiUrl = env["SLACK_API_URL"];
  console.log(
    `New incident created: ${slug} | ${inputs.description} | ${inputs.severity}`,
  );
  const incidentId = `incd-${new Date().getTime()}`;

  // Create a channel first
  const client = SlackAPI(token, { slackApiUrl });
  // deno-lint-ignore no-explicit-any
  let res: any;
  console.log('Creating channel...');
  try {
    res = await client.apiCall('conversations.create', {
      name: `${incidentId}-${slug}`,
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

  // Invite the channel creator to the channel
  try {
    res = await client.apiCall('conversations.invite', {
      channel,
      users: inputs.creator,
    });
    console.log(res);
  } catch (e) {
    console.error(e);
    return { completed: false, error: `Error during channel invitation: ${e.message}` };
  }

  // Send a message to the new channel second
  console.log('Sending message...');
  try {
    await client.apiCall('chat.postMessage', {
      channel,
      text: `There is an incident (ID ${incidentId}): ${inputs.description}`,
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
