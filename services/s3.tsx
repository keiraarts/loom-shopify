import { S3 } from "aws-sdk";

interface S3Service {
  username: string;
  upload: (options: ConfigOptions) => void;
}

interface ConfigOptions {
  accessKeyId: string;
  secretAccessKey: string;
  version: string;
  region: "us-east-2" | "us-east-1";
}

class S3Class implements S3Service {
  username: string;

  constructor(username) {
    this.username = username;
  }

  async upload(options) {
    const config: ConfigOptions = {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      version: "latest",
      region: "us-east-2",
    };

    const s3 = new S3(config);

    return new Promise(function (resolve, reject) {
      let putObjectPromise = s3.upload({ ...options }).promise();
      return putObjectPromise
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

module.exports = S3Class;
