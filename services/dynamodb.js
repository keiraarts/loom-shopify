"use strict";

const { DynamoDB } = require("aws-sdk");
const { set, get, isUndefined } = require("lodash");

class DynamoDBClass {
  constructor(username) {
    // Amazon SES configuration
    const dynamoConfig = {
      apiVersion: "2012-08-10",
      accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY,
      region: process.env.AWS_DYNAMODB_REGION,
      httpOptions: { keepAlive: true },
    };

    this.username = username;
    this.dynamodbRaw = new DynamoDB(dynamoConfig);
    this.dynamodb = new DynamoDB.DocumentClient(dynamoConfig);
    this.table = "loom-core";
  }

  GetUsername() {
    return this.username;
  }

  SetUsername(value) {
    this.username = value;
    return this.username;
  }

  async GetEvents() {
    const query = {
      Limit: 10,
      TableName: this.table,
      ConsistentRead: false,
      ScanIndexForward: false,

      KeyConditionExpression: `pk = :username AND begins_with(sk, :event)`,
      ExpressionAttributeValues: {
        ":username": `USERNAME#${this.username}`,
        ":event": "EVENT#",
      },
    };

    const products = await this.dynamodb
      .query(query)
      .promise()
      .then((data) => get(data, "Items", []))
      .catch((err) => []);

    return products;
  }

  async CreateStorefront(shop) {
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    let ExpressionCommands = [];

    let insert = {
      account: {
        shopifyPlan: get(shop, "plan_name"),
        address1: get(shop, "account.address1"),
        city: get(shop, "account.city"),
        country: get(shop, "account.country"),
        first_name: get(shop, "account.first_name"),
        last_name: get(shop, "account.last_name"),
        phone: get(shop, "account.phone"),
        postcode: get(shop, "account.zip"),
        state: get(shop, "account.province"),
      },

      email: get(shop, "email"),
      hostname: get(shop, "hostname"),

      currency: get(shop, "currency"),
      subscription: get(shop, "subscription", "free"),

      brand: get(shop, "brand"),
      userID: get(shop, "userID"),
      username: get(shop, "username"),
      theme: get(shop, "theme", "shopify"),
      shopify_token: get(shop, "shopify_token"),

      date_installed: Date.now(),
      livemode: process.env.LIVEMODE.toString(),
      shopifyAccessToken: get(shop, "shopifyAccessToken"),
    };

    for (var key of Object.keys(insert)) {
      if (!isUndefined(insert[key])) {
        set(ExpressionAttributeNames, `#${key.toUpperCase()}`, key);
        set(ExpressionAttributeValues, `:${key}`, insert[key]);
        ExpressionCommands.push(`#${key.toUpperCase()} = :${key}`);
      }
    }

    const data = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `#STOREFRONT`,
      },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: `SET ${ExpressionCommands.join(", ")}`,
      ConditionExpression: "attribute_not_exists(userID)",
      TableName: this.table,
    };

    await this.dynamodb
      .update(data)
      .promise()
      .then((data) => data)
      .catch((err) => console.error(err.message));

    return { ...shop, pk: `USERNAME#${this.username}`, sk: `#STOREFRONT` };
  }

  async GetStorefront() {
    const response = await this.dynamodb
      .get({
        Key: {
          pk: `USERNAME#${this.username}`,
          sk: `#STOREFRONT`,
        },
        TableName: this.table,
      })
      .promise()
      .then((data) => data.Item)
      .catch((err) => {
        // If the storefront doesn't exist, create a minimal version of it
        console.log({ err });
      });

    return response;
  }

  async UpdateStorefront(input = {}) {
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    let ExpressionCommands = [];

    for (var key of Object.keys(input)) {
      // Prevent users from inserting new emails
      if (!isUndefined(input[key])) {
        set(ExpressionAttributeNames, `#${key.toUpperCase()}`, key);
        set(ExpressionAttributeValues, `:${key}`, input[key]);
        ExpressionCommands.push(`#${key.toUpperCase()} = :${key}`);
      }
    }

    const data = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `#STOREFRONT`,
      },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: `SET ${ExpressionCommands.join(", ")}`,
      TableName: this.table,
    };

    await this.dynamodb
      .update(data)
      .promise()
      .then((data) => data)
      .catch((err) => console.error(err));

    return data;
  }

  async CreateEvent(data, options) {
    const SECONDS_IN_A_DAY = 604800 / 7;
    const timestamp = get(options, "timestamp", Math.round(Date.now() / 1000));
    const ttl = timestamp + 2 * SECONDS_IN_A_DAY;

    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    let ExpressionCommands = [];

    const { type, message, context } = data;

    const insert = {
      ttl,
      type,
      message,
      context,
      date: timestamp,
    };

    for (var key of Object.keys(insert)) {
      if (!isUndefined(insert[key])) {
        set(ExpressionAttributeNames, `#${key.toUpperCase()}`, key);
        set(ExpressionAttributeValues, `:${key}`, insert[key]);
        ExpressionCommands.push(`#${key.toUpperCase()} = :${key}`);
      }
    }

    const query = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `EVENT#${timestamp}`,
      },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: `SET ${ExpressionCommands.join(", ")}`,
      ConditionExpression: "attribute_not_exists(sk)",
      TableName: this.table,
    };

    await this.dynamodb
      .update(query)
      .promise()
      .then((res) => res)
      .catch((err) => console.error(err));
  }

  async UpdateVideo(insert) {
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    let ExpressionCommands = [];

    for (var key of Object.keys(insert)) {
      if (!isUndefined(insert[key])) {
        set(ExpressionAttributeNames, `#${key.toUpperCase()}`, key);
        set(ExpressionAttributeValues, `:${key}`, insert[key]);
        ExpressionCommands.push(`#${key.toUpperCase()} = :${key}`);
      }
    }

    const query = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `LOOM#${insert.id}`,
      },

      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: `SET ${ExpressionCommands.join(", ")}`,
      TableName: this.table,
    };

    // Update primary route shown to users front-end
    // We'll use this a trigger in Dynamodb
    const item = await this.dynamodb
      .update(query)
      .promise()
      .then(({ Attributes: item }) => item)
      .catch((err) => console.error(err));

    return item;
  }

  async DeleteVideo(id) {
    const query = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `LOOM#${id}`,
      },
      TableName: this.table,
    };

    await this.dynamodb
      .delete(query)
      .promise()
      .then(({ Attributes: item }) => item)
      .catch((err) => console.error(err));
  }

  async GetVideos() {
    const query = {
      Limit: 50,
      TableName: this.table,
      ConsistentRead: false,
      ScanIndexForward: false,
      KeyConditionExpression: `pk = :username AND begins_with(sk, :video)`,
      ExpressionAttributeValues: {
        ":username": `USERNAME#${this.username}`,
        ":video": `LOOM#`,
      },
    };

    const disputes = await this.dynamodb
      .query(query)
      .promise()
      .then((data) => get(data, "Items", []))
      .catch((err) => {
        console.log(err);
        return [];
      });

    return disputes;
  }

  async UpdateVideo(input = {}) {
    if (!input.id) return;

    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    let ExpressionCommands = [];

    for (var key of Object.keys(input)) {
      // Prevent users from inserting new emails
      if (!isUndefined(input[key])) {
        set(ExpressionAttributeNames, `#${key.toUpperCase()}`, key);
        set(ExpressionAttributeValues, `:${key}`, input[key]);
        ExpressionCommands.push(`#${key.toUpperCase()} = :${key}`);
      }
    }

    const data = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `LOOM#` + input.id,
      },
      ExpressionAttributeNames: ExpressionAttributeNames,
      ExpressionAttributeValues: ExpressionAttributeValues,
      UpdateExpression: `SET ${ExpressionCommands.join(", ")}`,
      TableName: this.table,
    };

    await this.dynamodb
      .update(data)
      .promise()
      .then((data) => data)
      .catch((err) => console.error(err));

    return data;
  }

  async GetVideo(id) {
    const query = {
      Key: {
        pk: `USERNAME#${this.username}`,
        sk: `LOOM#${id}`,
      },
      TableName: this.table,
    };

    const dispatch = await this.dynamodb
      .get(query)
      .promise()
      .then((data) => get(data, "Item", {}))
      .catch((err) => []);

    return dispatch;
  }
}

module.exports = DynamoDBClass;
