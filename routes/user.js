const UserController = require("../controllers/UserController");
const { authentiaction } = require("../middlewares/auth");

const router = require("express").Router();

router
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .post("/eventregister/:id", authentiaction, UserController.regisEvent)
  .get("/mylist", authentiaction, UserController.getMyList)
  .get("/mytodo/:id", authentiaction, UserController.getMyTodo)
  .get("/users", authentiaction, UserController.getProfile)
  .put("/users", authentiaction, UserController.updateAccount)
  .put("/profile", authentiaction, UserController.updateProfile)
  .post("/verify", authentiaction, UserController.verifyAccount)
  .post("/todo", authentiaction, UserController.claimTodo)
  .patch("/todo/:id", authentiaction, UserController.updateStatusTodo)
  .patch("/users/:id", authentiaction, UserController.updateIsClaim);

module.exports = router;
