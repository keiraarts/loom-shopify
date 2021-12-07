"use strict";

const util = require("util");
const axios = require("axios");
const get = require("lodash/get");
const parser = require("fast-xml-parser");

function createInstance() {
  const shopifyInstance = axios.create({
    baseURL: "https://secure.shippingapis.com",
    headers: { "Content-Type": "text/xml" },
  });

  return shopifyInstance;
}

class USPS {
  constructor(username) {
    this.clientId = "502VIAGL2133";
    this.instance = createInstance();
    this.username = username;
  }

  ParseXML(xml) {
    try {
      return parser.parse(xml);
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async VerifyAddress({ destination }) {
    if (!destination || !destination.zip) return true;
    const { address1, address2, city, province_code, zip = "" } = destination;

    if (destination.country_code.toLowerCase() !== "us") {
      return {
        error: false,
      };
    }

    // Split zip code if we're provided the 5/4
    const zipGroup = zip.replace(/ /g, "-").split("-");

    // https://www.usps.com/business/web-tools-apis/address-information-api.pdf
    const xml = `<AddressValidateRequest USERID="${this.clientId}"><Address><Address1>${address1}</Address1><Address2>${address2}</Address2><City>${city}</City><State>${province_code}</State><Zip5>${zipGroup?.[0]}</Zip5><Zip4>${zipGroup?.[1]}</Zip4></Address></AddressValidateRequest>`;

    const response = await this.instance
      .get(`/ShippingAPI.dll?API=Verify&XML=${xml}`)
      .then((res) => res.data)
      .catch((err) => console.error("shop err", err.message));

    const jsonObj = this.ParseXML(response);
    const verification = get(jsonObj, "AddressValidateResponse");
    console.log(util.inspect(verification, { showHidden: false, depth: null }));

    return {
      ...verification,
      // Errors are under Address.Error.Description
      error: get(verification, `Address.Error.Description`, false),
    };
  }
}

module.exports = USPS;
