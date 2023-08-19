import express from "express";
import { zbd } from "@zbd/node";

const ZBD_API_KEY = 'b7YW3s2JzZKGcXjIf5Dqof8wjKT2RuWr8';
const ZBD = new zbd(ZBD_API_KEY);

// Create Express app
const app = express();

// Creating a Bitcoin Lightning payment request
app.get("/request", async (req, res) => {
  try {
    // @ts-ignore
    const data = await ZBD.createCharge({
      amount: "100000", // 100 satoshis (100,000 msats)
      description: "Express + ZBD!",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Send a payment to a Bitcoin Lightning Address
app.get("/send", async (req, res) => {
  try {
    const data = await ZBD.sendLightningAddressPayment({
      lnAddress: "andre@zbd.gg", // Who is the recipient?
      amount: "100000", // 100 satoshis (100,000 msats)
      comment: "Express + ZBD!",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Express server w/ ZBD listening on http://localhost:3000");
});
