const { Router } = require("express");
const Language = require("../models/language");
const Cart = require("../models/cart");

const router = Router();

router.post("/add", async (req, res) => {
  const language = await Language.getById(req.body.id);
  await Cart.add(language);
  res.redirect("/cart");
});

router.get("/", async (req, res) => {
  const cart = await Cart.fetch();
  res.render("cart", {
    title: "Cart",
    isCart: true,
    languages: cart.languages,
    price: cart.price,
  });
});

module.exports = router;
