"use strict";
require("babel-polyfill");
// Services
const Shopify = require("../../../../../../services/shopify");
const SES = require("../../../../../../services/ses");

export default async function handler(req, res) {
  const { method } = req;
  const SESClass = new SES();
  const { email, name } = req.body;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified) {
    res.status(403);
    res.json({ message: "Token expired before patching dispatch." });
    return;
  }

  switch (method) {
    case "POST":
      try {
        await SESClass.PersonalEmail([email], {
          subject: `We received your email!`,
          messages: [
            `Thank you for contacting us ${name}!`,
            `This is a short confirmation that we got your message and we'll respond back soon.`,
          ],
        });

        const supportEmail = process.env.SUPPORT_EMAIL;
        const emailInput = { ...req.body, username };
        await SESClass.ContactNotification([supportEmail], emailInput);

        res.status(200);
        res.json({ messages: "Message sent via SES" });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    default:
      res.status(400).json({ success: false, message: "route not matched" });
      break;
  }
}
