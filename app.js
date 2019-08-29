const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const index = require("./routes/index");
const auth = require("./routes/auth");
const stories = require("./routes/stories");
const passport = require("passport");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT || 5000;
const { mongoURI } = require("./config/keys");
const {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon
} = require("./helpers/hbs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log("err", err));
require("./config/passport")(passport);
app.engine(
  "handlebars",
  exphbs({
    helpers: { truncate, stripTags, formatDate, select, editIcon },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/stories", stories);
app.use("/auth", auth);
app.use("/", index);
app.get("/", (req, res) => {
  res.send("It works");
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
