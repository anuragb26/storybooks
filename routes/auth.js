const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/"
  }),
  (req, res) => {
    console.log("in here");
    res.redirect("/dashboard");
  }
);
router.get("/verify", (req, res) => {
  console.log("req", req.body);
  if (req.user) {
    console.log("user", req.user);
  } else {
    console.log("Not Auth");
  }
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
