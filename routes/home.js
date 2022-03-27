const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  // res.status(200); // 200 is default value, we can skip it
  // res.sendFile(path.join(__dirname, "views", "index.html")); // we dont need this line cuz we use handlebars
  res.render("index", {
    title: "Main page",
    isHome: true,
  }); // in app.set we choose the folder, cuz we need add only file name
});

module.exports = router;
