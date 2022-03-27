const { Router } = require("express");
const Language = require("../models/language");

const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add language",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  const { title, price, img } = req.body;
  const language = new Language(title, price, img);

  await language.save();

  res.redirect("/languages");
});

module.exports = router;
