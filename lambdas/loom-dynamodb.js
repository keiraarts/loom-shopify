const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({ region: "us-east-1" });

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
  // console.log('Received event:', event);

  let body;
  let statusCode = "200";
  const headers = { "Content-Type": "application/json" };

  if (typeof event.body === "string") {
    event.body = JSON.parse(event.body);
  }

  try {
    switch (event.httpMethod) {
      case "POST":
        if (!event.body.Item.pk) break;

        await Promise.all([
          NotifyShop(event.body),
          dynamo.put(event.body).promise(),
        ]).then((values) => console.log({ values }));

        body = { message: "Loom video collected!" };
        break;

      case "OPTION":
        break;
      default:
        throw new Error(`Unsupported method "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = "400";
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

const NotifyShop = async (body) => {
  const query = {
    TableName: body.TableName,
    Key: { pk: body.Item.pk, sk: "#STOREFRONT" },
  };

  const shop = await dynamo.get(query).promise();
  const nicknmae = body.Item.email.split("@")[0];

  var params = {
    Destination: {
      // Notification to the shop admin
      ToAddresses: [shop.Item.email],
    },
    // Their reply goes to the customer
    ReplyToAddresses: [body.Item.email],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
          <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width" />
                <title>Notification email from HonestyCore.com</title>
                <style>
                  p, ul, li {
                  font-family: sans-serif;
                  font-size: 15px;
                  font-weight: normal;
                  margin: 0;
                  margin-bottom: 15px;
                  line-height: 145%;
                  color: black;
                  }
                  p.subtext {
                  font-size: 11px!important;
                  color: grey!important;
                  }
                  a {
                  font-family: sans-serif;
                  font-size: 15px;
                  text-decoration: underline;
                  line-height: 145%;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  }
                </style>
            </head>
            <body>
                <p>${nicknmae} recorded a video question!</p>
                <p>${body.Item.sharedUrl}</p>
                <p>You can reply to this email to respond to them! :)</p>
            </body>
          </html>
          `,
        },
      },

      Subject: {
        Data: `You have a new video from ${nicknmae}`,
      },
    },
    // Conversation managed by the app
    Source: `Honesty <hey@honestycore.com>`,
  };

  return ses.sendEmail(params).promise();
};
