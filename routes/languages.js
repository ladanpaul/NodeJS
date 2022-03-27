const { Router } = require("express");
const Language = require("../models/language");

const router = Router();

router.get("/", async (req, res) => {
  const languages = await Language.getAll();
  res.render("languages", {
    title: "Languages",
    isLanguages: true,
    languages,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query?.allow) {
    res.redirect("/");
  }

  const language = await Language.getById(req.params.id);

  res.render("language-edit", {
    title: `Edit language ${language.title}`,
    language,
  });
});

router.post("/edit", async (req, res) => {
  await Language.update(req.body);
  res.redirect("/languages");
});

router.get("/:id", async (req, res) => {
  const language = await Language.getById(req.params.id);
  res.render("language", {
    layout: "empty",
    title: `Language ${language.title}`,
    language,
  });
});

module.exports = router;
