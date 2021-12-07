const get = require("lodash/get");
const DynamoDB = require("./dynamodb");

class Stripe {
  isTruthy(value) {
    if (!value || value === "FALSE" || value == "false") return false;
    else if (value === "TRUE" || value == true) return true;
    return false;
  }

  constructor(livemode = undefined, options = {}) {
    const { LIVEMODE } = process.env;
    const mode = this.isTruthy(livemode === undefined ? LIVEMODE : livemode);

    const { STRIPE_LIVE_SECRET_KEY, STRIPE_TEST_SECRET_KEY } = process.env;
    this.key = mode === true ? STRIPE_LIVE_SECRET_KEY : STRIPE_TEST_SECRET_KEY;

    this.customer = get(options, "customer", false);
    this.connect = get(options, "connect_account", false);
    this.livemode = mode;
  }

  async CreateCustomer(shop) {
    const data = {
      name: shop.name,
      email: shop.email,
      phone: shop.phone,
      address: {
        line1: shop.address1,
        city: shop.city,
        country: shop.country,
        line2: shop.address2,
        postal_code: shop.zip,
        state: shop.province,
      },
    };

    // Prevent the checkout from using an invalid customer object
    // If customer exists, return customer
    // If customer does not exist, create, return, save to databse
    const stripe = require("stripe")(this.key);

    const customer = await new Promise((resolve, reject) => {
      stripe.customers.create(data, function (err, customer) {
        // asynchronously called
        if (err) {
          console.error(err);
          reject(false);
          return;
        }
        resolve(customer);
      });
    });

    return customer.id;
  }

  async UpdateCustomer(update) {
    // Prevent the checkout from using an invalid customer object
    // If customer exists, return customer
    // If customer does not exist, create, return, save to databse

    const stripe = require("stripe")(this.key);
    const customer = await new Promise((resolve, reject) => {
      stripe.customers.update(this.customer, update, function (err, customer) {
        // asynchronously called
        if (err) {
          console.error("customer update error", err);
          reject(false);
          return;
        }
        resolve(customer);
      });
    });

    return customer;
  }

  async GetCustomer() {
    if (!this.customer) return;

    try {
      const stripe = require("stripe")(this.key);
      const customer = await stripe.customers
        .retrieve(this.customer)
        .then((customer) => customer)
        .catch((error) => console.error(error));

      return customer;
    } catch (error) {}
  }

  async PurchaseCredits({ username, amount }) {
    const timestamp = Math.round(Date.now() / 1000);
    const stripe = require("stripe")(this.key);
    const stripeAmount = parseFloat(amount);

    let line_items = [
      {
        name: "Shopify Order Fulfillments",
        description: "Add funds to balance with MagicSoaps.",
        amount: stripeAmount,
        currency: "usd",
        quantity: 1,
      },
    ];

    const session = await new Promise((resolve, reject) => {
      stripe.checkout.sessions.create(
        {
          customer: this.customer,
          client_reference_id: username,
          billing_address_collection: "auto",
          payment_method_types: ["card"],
          line_items: line_items,
          success_url: `https://${username}.myshopify.com/admin/apps/magic-soaps/orders?intention=payment_success`,
          cancel_url: `https://${username}.myshopify.com/admin/apps/magic-soaps/orders?intention=payment_error`,
        },
        {
          idempotencyKey: `${username}#${timestamp}#${stripeAmount}`,
        },
        function (err, session) {
          if (err) {
            reject(err);
            return;
          }
          resolve(session);
        }
      );
    });

    return session;
  }

  async AddInvoiceItem(data) {
    const stripe = require("stripe")(this.key);
    const invoice = await new Promise((resolve, reject) => {
      stripe.invoiceItems.create(
        {
          customer: this.customer,
          ...data,
        },
        function (err, invoice) {
          if (err) {
            reject(err);
            return;
          }
          resolve(invoice);
        }
      );
    });

    return invoice;
  }

  async CreateInvoice(data) {
    const stripe = require("stripe")(this.key);
    const invoice = await new Promise((resolve, reject) => {
      stripe.invoices.create(
        {
          customer: this.customer,
          ...data,
        },
        function (err, invoice) {
          if (err) {
            reject(err);
            return;
          }
          resolve(invoice);
        }
      );
    });

    return invoice;
  }

  async CreatePaymentIntent(data) {
    const stripe = require("stripe")(this.key);
    const paymentIntent = await new Promise((resolve, reject) => {
      // Create new Promise, await will wait until it resolves
      stripe.paymentIntents.create(data, function (error, intent) {
        if (error) {
          reject(error);
          return;
        }
        resolve(intent);
      });
    });

    return paymentIntent;
  }

  async PayInvoice(id, data) {
    const stripe = require("stripe")(this.key);
    const invoice = await new Promise((resolve, reject) => {
      stripe.invoices.pay(id, { ...data }, function (err, invoice) {
        if (err) {
          reject(err);
          return;
        }
        resolve(invoice);
      });
    });

    return invoice;
  }
}

module.exports = Stripe;
