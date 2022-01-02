require("dotenv").config();
import { handler as lambdaService } from "../loom-dynamodb";

const mEvent = {
  body: {
    TableName: "loom-core",
    Item: {
      id: "1b7a3fbf19fd4ee5934e17bf66d91a1f",
      sharedUrl: "https://www.loom.com/share/1b7a3fbf19fd4ee5934e17bf66d91a1f",
      embedUrl: "https://www.loom.com/embed/1b7a3fbf19fd4ee5934e17bf66d91a1f",
      title: "Loom video",
      height: 1080,
      width: 1670,
      providerUrl: "https://www.loom.com",
      email: "keiraarts@gmail.com",
      customer: "",
      pk: "USERNAME#via-dev-220",
      sk: "2021-12-04T18:33:53.183Z",
    },
  },
  resource: "/{proxy+}",
  path: "/path/to/resource",
  httpMethod: "POST",
  isBase64Encoded: true,
  queryStringParameters: {
    foo: "bar",
  },
  multiValueQueryStringParameters: {
    foo: ["bar"],
  },
  pathParameters: {
    proxy: "/path/to/resource",
  },
  stageVariables: {
    baz: "qux",
  },
  headers: {
    "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Host": "1234567890.execute-api.us-east-1.amazonaws.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Custom User Agent String",
    "Via": "1.1 08f323deadbeefa7af34d5feb414ce27.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "cDehVQoZnx43VYQb9j2-nvCh-9z396Uhbp027Y2JvkCPNLmGJHqlaA==",
    "X-Forwarded-For": "127.0.0.1, 127.0.0.2",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https",
  },
};

describe("lambdaService", () => {
  beforeEach(() => {
    process.env = Object.assign(process.env);
    jest.restoreAllMocks();
  });

  test("should return data", async () => {
    const actualResponse = await lambdaService({
      ...mEvent,
      body: { Item: { ...mEvent.body.item, pk: false } },
    });

    expect(actualResponse.statusCode).toEqual("500");
  });
});
