const axios = require("axios");
const { get } = require("lodash/get");

function createInstance(id, token) {
  const shopifyInstance = axios.create({
    baseURL: `https://chitchats.com/api/v1/clients/${id}`,
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });

  return shopifyInstance;
}

class ChitChats {
  constructor({ id, token }) {
    this.token = token;
    this.username = id;
    this.livemode = process.env.LIVEMODE === "TRUE";
    this.shopifyInstance = createInstance(id, token);
  }

  CreateInstance() {
    return this.shopifyInstance;
  }

  async GetBatches() {
    const batches = await this.shopifyInstance
      .get(`/batches?limit=5`)
      .then((res) => res.data)
      .catch((err) => console.error("shop err", err.message));

    return batches;
  }

  async CreateBatch() {
    const res = await this.shopifyInstance
      .post(`/batches?limit=5`)
      .then((res) => res.data)
      .catch((err) => console.error("shop err", err.message));

    return res;
  }

  async PrepareBatch() {
    const batches = await this.GetBatches();
    if (get(batches, [0])) return batches[0];

    await CreateBatch();
    const recent = await this.GetBatches();
    return recent[0];
  }

  async GetShipments(tracking) {
    // Get the amount of results
    const count = await this.shopifyInstance
      .post(`/shipments/count?status=ready`)
      .then((res) => res.data.count)
      .catch((err) => console.error("shop err", err.message));

    // Calculate the requires amount of iterations
    const pages = Math.ceil(count / 100);

    // Get each page in parallel
    const values = Array(pages).fill("");
    const responses = await Promise.all(
      values.map((_, index) => {
        return this.shopifyInstance
          .post(`/shipments?status=ready&page=${index + 1}`)
          .then((res) => res.data)
          .catch((err) => console.error("shop err", err.message));
      })
    );

    console.log({ responses });
    return responses.flat();
  }

  async AddShipmentToBatch(tracking) {
    // Disregard users without chitchats
    if (!this.token) return;

    const shipments = await GetShipments();
    const order = shipments.map((el) => el.carrier_tracking_code === tracking);
    const batch = await PrepareBatch();

    await this.shopifyInstance
      .post(`/shipments/add_to_batch`, {
        batch_id: get(batch, "id"),
        shipment_ids: [get(order, "id")],
      })
      .then((res) => console.log({ order, batch }))
      .catch((err) => console.error("Could not add to batch", err.message));
  }
}

module.exports = ChitChats;
