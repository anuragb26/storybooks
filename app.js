const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;
require("./config/passport")(passport);

app.use("/auth", auth);
app.get("/", (req, res) => {
  res.send("It works");
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
