// Null Route

const { Router } = require("express");
const router = Router();

router.get("/", function (req, res, next) {
  res.status(404).render("error");
  res.end();
});

module.exports = router;
