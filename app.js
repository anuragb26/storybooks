const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { mongoURI } = require("./config/keys");
app.use(bodyParser.urlencoded({ extended: false }));
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.log("err", err));
require("./config/passport")(passport);

app.use("/auth", auth);
app.get("/", (req, res) => {
  res.send("It works");
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
