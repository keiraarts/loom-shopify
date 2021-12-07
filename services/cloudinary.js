"use strict";

const fs = require("fs");
const base64url = require("base64url");
const cloudinary = require("cloudinary").v2;
const { catalog } = require("../lib/catalog");
const get = require("lodash/get");

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: "viaglamour",
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class Cloudinary {
  constructor(username) {
    this.username = username;
  }

  Iterate({ product, versions }) {
    var attempt = 0;

    var version = versions?.[product];
    while (version && !isNumeric(version) && attempt < 1) {
      // The version is referencing the real product we should be using.
      product = version;
      version = versions?.[version] ?? version;
      // If grabbing data from database, there is no .product attrubute
      if (!isNumeric(version)) version = versions?.[version] ?? version; // This would resolve to false, again
      attempt++;
    }

    return [product, version];
  }

  async Generate(product, options = {}) {
    const base = `https://magical-soaps.s3.us-east-2.amazonaws.com/products/2020-01/`;
    let { studio, ref, version, brand = "demo" } = options;
    if (brand && brand.includes("shopify")) brand = "demo";

    const hex = get(catalog, [product, "hex"]).replace("#", "");
    const aws_url = base + [product, studio, product + "-" + hex].join("/");
    const placeholder = this.generatePlaceholderPath({ brand });

    const path =
      this.username && version !== undefined && version !== "undefined"
        ? "mockup-files:" + this.username + ":" + ref + "-" + version
        : `fetch:` + base64url(placeholder);

    const url = create_soap_bar(path, aws_url);

    const headers = {
      "X-Store-Name": brand.replace(/[^\x00-\x7F]/g, ""),
      "X-Product-Ref": ref,
      "X-Mockup-Image": url,
      "X-Design-Design": path,
      "X-Product-Placeholder": placeholder,
      "X-Product-Version": version,
      "X-Product-Iterated": product,
    };

    const status = 200;
    return [url, headers, status];
  }

  async Upload({ file, public_id, ratio = 1 }) {
    // ex: /path/to/my-picture.png becomes my-picture.png
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        file,
        {
          public_id: public_id,
          resource_type: "image",
          cropping_aspect_ratio: ratio,
          crop: "fill",
          format: "png",
          background: "none",
        },
        function (error, result) {
          if (error) reject(error);
          resolve(result);
        }
      );
    });

    return response;
  }

  async UploadStream({ file, public_id, ratio }) {
    return new Promise((resolve, reject) => {
      // Sadly, this method does not support async/await

      var upload_stream = cloudinary.uploader.upload_stream(
        {
          public_id: public_id,
          resource_type: "image",
          cropping_aspect_ratio: ratio,
          crop: "fill",
          format: "png",
          background: "none",
        },
        function (error, image) {
          console.log("here");
          console.log("** Stream Upload");
          //if (err){ console.warn(err);}
          console.log("* Same image, uploaded via stream");
          console.log("* " + image.public_id);
          console.log("* " + image.url);
          if (get(image, "url")) resolve(image);
          else reject(error);
        }
      );

      fs.createReadStream(file.path).pipe(upload_stream);
    });
  }

  iterate({ product, versions, product_id }) {
    var attempt = 0;
    if (get(versions, `[${product_id}]`, false)) product = product_id;

    var version = this.getProductVersion(product, versions);
    while (version && !isNumeric(version) && attempt < 3) {
      // The version is referencing the real product we should be using.
      product = version;
      version = get(versions, `[${version}]`, version);
      // If grabbing data from database, there is no .product attrubute
      if (!isNumeric(version)) version = get(versions, `[${version}]`, version); // This would resolve to false, again
      attempt++;
    }

    return [product, version];
  }

  getProductVersion(product, versions, version) {
    // Fallback case if provided product by JSON is empty.
    if (!version) version = get(versions, `[${product}].product`, version);

    // Fallback case if finding versions via raw data.
    if (!version) version = get(versions, `[${product}]`, version);

    return version;
  }

  getResolutions(product) {
    switch (product) {
      case "soap-tea-tree":
        return { width: 1115, height: 610, color: "C5C5C7" };

      case "soap-tumeric":
        return { width: 1115, height: 610, color: "C5C5C7" };

      case "soap-charcoal":
        return { width: 1115, height: 610, color: "C5C5C7" };

      case "soap-sunflower":
        return { width: 1115, height: 610, color: "C5C5C7" };

      case "soap-shea-butter":
        return { width: 1115, height: 610, color: "C5C5C7" };

      default:
        return { width: 1115, height: 610, color: "C5C5C7" };
    }
  }

  encode({ name = "demo", recWidth = 1, recHeight = 1 }) {
    const brand = name.replace(new RegExp(" ", "g"), "\n");
    // Encode url for cloudinary
    return encodeURI(brand);
  }

  generatePlaceholderPath({ brand }) {
    const name = decodeURI(brand);
    const requirements = { width: 1150, height: 560, color: "C5C5C7" };

    // if references does not exist
    const recWidth = get(requirements, "width", 0);
    const recHeight = get(requirements, "height", 0);

    const font = "Berkshire Swash";
    const typeface = font.replace(" ", "%20");
    const color = get(requirements, "color", "FFFFFF");

    const rotation = 0;
    const background = "none";
    const encoded = this.encode({ name, recWidth, recHeight });
    const demoLogo = `https://viaglamour.com/preview/image/upload/w_${recWidth},h_${recHeight},a_${rotation},c_lpad,l_text:${typeface}_200_white_line_spacing_-100_center:${encoded},co_rgb:${color}/w_${recWidth},h_${recHeight},b_${background},c_lpad/logo-template.png`;

    return demoLogo;
  }
}

module.exports = Cloudinary;
