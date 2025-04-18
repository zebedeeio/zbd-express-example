import express from "express";
import ZbdPayments from "@zbddev/payments-sdk";

const ZBD_API_KEY = 'b7YW3s2JzZKGcXjIf5Dqof8wjKT2RuWr8'; // TODO: Replace with your own API key
const client = new ZbdPayments({ apikey: ZBD_API_KEY });

// Create Express app
const app = express();

// Creating a Bitcoin Lightning payment request
app.get("/request", async (_req, res) => {
  try {
    const data = await client.lightningCharges.create({
      amount: "100000", // 100 satoshis (100,000 msats)
      description: "Express + ZBD!",
      callbackUrl: "https://your-app.com/callback",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Send a payment to a Bitcoin Lightning Address
app.get("/send", async (_req, res) => {
  try {
    const data = await client.lightningAddress.sendPayment({
      lnAddress: "andre@zbd.gg", // Who is the recipient?
      amount: "100000", // 100 satoshis (100,000 msats)
      comment: "Express + ZBD!",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3005, () => {
  console.log("Express server w/ ZBD listening on http://localhost:3005");
});
