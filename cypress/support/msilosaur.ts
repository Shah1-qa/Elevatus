import MailosaurClient from "mailosaur";
// Fetches activation link from Mailosaur inbox
export async function getActivationLink(
  serverId: string,
  apiKey: string,
  email: string
): Promise<string> {
  const client = new MailosaurClient(apiKey);

  // Wait for latest email
  const message = await client.messages.get(serverId, { sentTo: email });

  const link = message.html?.links?.find((l) =>
    l.text?.toLowerCase().includes("click here")
  )?.href;

  if (!link) {
    throw new Error("No activation link found in Mailosaur email.");
  }

  return link;
}
