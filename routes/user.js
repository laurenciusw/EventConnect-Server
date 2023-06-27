const UserController = require("../controllers/UserController")

const router = require('express').Router()

router
  .post('/register', UserController.resgister)
  .post('/login', UserController.login)

module.exports = router