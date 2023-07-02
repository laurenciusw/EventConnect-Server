const { verifyToken } = require("../helpers/jwt");
const { User, Article, Category, Customer } = require("../models/");

async function authentiaction(req, res, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "invalidToken" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    let userId = req.user.id;
    let role = req.user.role;
    let article = await Article.findByPk(req.params.id);

    if (!article) {
      throw { name: "NotFound" };
    }
    if (role == "staff") {
      if (userId !== article.authorId) {
        throw { name: "Forbidden" };
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  authentiaction,
  authorization,
};
