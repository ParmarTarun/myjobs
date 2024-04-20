// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (
      req.query["hub.mode"] == "subscribe" &&
      req.query["hub.verify_token"] == "token"
    ) {
      res.send(req.query["hub.challenge"]);
    } else {
      throw new Error("Webhook failed to verify");
    }
  }
  if (req.method === "POST") {
    // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    if (req.body.object) {
      if (
        req.body.entry &&
        req.body.entry[0].changes &&
        req.body.entry[0].changes[0] &&
        req.body.entry[0].changes[0].value.messages &&
        req.body.entry[0].changes[0].value.messages[0]
      ) {
        // do your stuff here.....

        let phone_number_id =
          req.body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
        console.log(from);
        console.log(msg_body);
      }
      res.send("got new message");
    } else {
      console.log("No body in payload");
      res.send("No message in the body");
    }
  }
}
