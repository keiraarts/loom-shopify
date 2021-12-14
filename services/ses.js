const { SES } = require("aws-sdk");
const Email = require("./emails");
const { get } = require("lodash");

class SESClass {
  constructor(
    username,
    identity = {
      brand: "HonestyCore.com",
      ses_email: process.env.AWS_SES_EMAIL,
    }
  ) {
    // Amazon SES configuration
    this.config = {
      apiVersion: "2010-12-01",
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
    };

    this.username = username;
    this.identity_brand = identity.brand;
    this.identity_email = identity.ses_email;
  }

  async Notification(emails, content) {
    const EmailClass = new Email();
    var params = {
      Source: `${this.identity_brand} <${this.identity_email}>`,
      Destination: {
        ToAddresses: emails.filter(Boolean),
      },
      ReplyToAddresses: [this.identity_email],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: EmailClass.Notification(content),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: get(content, "subject", "New notification"),
        },
      },
    };

    const resetEmailResponse = new SES(this.config)
      .sendEmail(params)
      .promise()
      .then((res) => res)
      .catch((err) => err);

    return resetEmailResponse;
  }

  async ContactNotification(emails, content) {
    const EmailClass = new Email();

    var params = {
      Source: `${this.identity_brand} <${this.identity_email}>`,
      Destination: {
        ToAddresses: emails.filter(Boolean),
      },
      ReplyToAddresses: [content?.email],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: EmailClass.Internal(content),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: content.username + " asked a question",
        },
      },
    };

    const response = new SES(this.config)
      .sendEmail(params)
      .promise()
      .then((res) => res)
      .catch((err) => console.error(err));

    return response;
  }

  async PersonalEmail(emails, content) {
    const EmailClass = new Email();

    var params = {
      Source: `${this.identity_brand} <${this.identity_email}>`,
      Destination: {
        ToAddresses: emails.filter(Boolean),
      },
      ReplyToAddresses: [this.identity_email],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: EmailClass.Personel(content),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: get(content, "subject"),
        },
      },
    };

    const response = new SES(this.config)
      .sendEmail(params)
      .promise()
      .then((res) => res)
      .catch((err) => console.error(err));

    return response;
  }
}

module.exports = SESClass;
