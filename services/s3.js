const { S3 } = require("aws-sdk");

class S3Class {
  async upload(options) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      version: "latest",
      region: "us-east-2",
    });

    return new Promise(function (resolve, reject) {
      let putObjectPromise = s3.upload({ ...options }).promise();
      return putObjectPromise
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log("S3 upload error", err);
          reject(err);
        });
    });
  }
}

module.exports = S3Class;
