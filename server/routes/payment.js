const express = require("express");
const router = express.Router();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
  "sk_test_51MRT0wSBNqBjGAaRoYTxjCmgQ6OSSL5ykRqCC1OsHmWr1JJCiR9FPR0reMSHHaNCSj8r6LXpxg43nuLKvrJVO9AP00tomcoAcs"
);

const YOUR_DOMAIN = `${process.env.UI_ENDPOINT}/checkout`;
console.log("Entering payment api");
router.post("/", async (req, res) => {
  console.log(YOUR_DOMAIN, "{DOMAIN}");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NRFtwSBNqBjGAaRZfL94C9s",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/canceled`,
  });
  res.redirect(303, session.url);
});

module.exports = router;
