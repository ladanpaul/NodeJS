const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const languagesRoutes = require("./routes/languages");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main", // cuz in layout folder we have main.hbs ( layout folder is reserved folder, we cant change it )
  extname: "hbs", // default is handlebars
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs"); // second params should be the same like previous engine name('hbs')
app.set("views", "views"); // views is default ( second param )

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/languages", languagesRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
