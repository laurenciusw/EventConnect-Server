const UserController = require("../controllers/UserController");

const router = require("express").Router();

router
  .post("/register", UserController.register)
  .post("/login", UserController.login);

module.exports = router;
