// Index Route

const { Router } = require("express");
const router = Router();

router.get("/", function (req, res, next) {
  res.status(200).render("index");
  res.end();
});

module.exports = router;
