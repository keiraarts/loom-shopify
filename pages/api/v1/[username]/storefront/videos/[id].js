"use strict";
require("babel-polyfill");
// Services
const Shopify = require("../../../../../../services/shopify");
const DynamoDB = require("../../../../../../services/dynamodb");
const omit = require("lodash/omit");
const postExclusions = ["pk", "sk"];

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);
  const DynamoDBClass = new DynamoDB(username);

  if (!isVerified) {
    res.status(403);
    res.json({ message: "Token expired before patching dispatch." });
    return;
  }

  switch (method) {
    case "GET":
      try {
        const videos = await DynamoDBClass.GetVideo(id);
        res.status(200);
        res.json(videos);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    case "PUT":
      try {
        const video = DynamoDBClass.UpdateVideo(omit(req.body, postExclusions));
        res.status(200);
        res.json(video);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    case "DELETE":
      try {
        DynamoDBClass.DeleteVideo(id);
        res.status(200);
        res.json({});
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
