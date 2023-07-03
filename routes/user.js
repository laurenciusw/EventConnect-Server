const UserController = require("../controllers/UserController");
const { authentiaction } = require("../middlewares/auth");

const router = require("express").Router();

router
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .post("/eventregister/:id", authentiaction, UserController.regisEvent)
  .get("/mylist", authentiaction, UserController.getMyList)
  .get("/mytodo/:id", authentiaction, UserController.getMyTodo);

module.exports = router;
