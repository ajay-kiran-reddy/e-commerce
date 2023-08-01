const express = require("express");
const router = express.Router();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
  "sk_test_51MRT0wSBNqBjGAaRoYTxjCmgQ6OSSL5ykRqCC1OsHmWr1JJCiR9FPR0reMSHHaNCSj8r6LXpxg43nuLKvrJVO9AP00tomcoAcs"
);

const YOUR_DOMAIN = `https://av-ecommerce-client.onrender.com/checkout`;

router.post("/payment", async (req, res) => {
  console.log(YOUR_DOMAIN, "{DOMAIN}");
  console.log(req.body, "[REQUEST BODY]");
  // res.status(200).json({ message: "Hello" });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1NRFtwSBNqBjGAaRZfL94C9s",
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/canceled`,
  });
  res.status(200).json({ url: session.url });
});

module.exports = router;
