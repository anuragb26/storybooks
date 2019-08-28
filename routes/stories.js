const express = require("express");
const router = express.Router();
const Story = require("../models/Story");
const { ensureAuthenticated } = require("../helpers/auth");

router.get("/", (req, res) => {
  Story.find({ status: "public" })
    .populate("user", "image firstName lastName")
    .exec((err, data) => {
      res.render("stories/index", { stories: data });
    });
});

router.get("/show/:id", (req, res) => {
  Story.findOne({ _id: req.params.id })
    .populate("user")
    .exec((err, story) => {
      res.render("stories/show", { story });
    });
});
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Story.findOne({ _id: req.params.id }).then(story => {
    console.log("story in edit", story.title);
    res.render("stories/edit", { story });
  });
});

router.post("/", (req, res) => {
  const allowComments = req.body.allowComments ? true : false;
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments,
    user: req.user.id
  };
  new Story(newStory)
    .save()
    .then(story => res.redirect(`/stories/show/${story.id}`));
  // res.send("Sent");
});

router.put("/:id", (req, res) => {
  Story.findOne({ _id: req.params.id }).then(story => {
    const allowComments = req.body.allowComments ? true : false;
    story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;
    story.save().then(story => {
      res.redirect("/dashboard");
    });
  });
});

router.delete("/:id", (req, res) => {
  Story.remove({ _id: req.params.id }).then(() => {
    res.redirect("/dashboard");
  });
});
module.exports = router;
