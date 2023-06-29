const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models/");
const { signToken } = require("../helpers/jwt");

class UserController {
  //register user
  static async register(req, res, next) {
    try {
      const {
        username,
        password,
        email,
        gender,
        birthDate,
        province,
        city,
        phoneNumber,
        jobDesk,
        isPremium,
      } = req.body;

      // if (!email) throw { name: "EmailRequired" };

      // if (!password) throw { name: "PasswordRequired" };

      const user = await User.create({
        username,
        password,
        email,
        gender,
        birthDate,
        province,
        city,
        phoneNumber,
        jobDesk,
        isPremium,
      });
      res.status(201).json({
        message: `user with email ${email} succesfully created`,
      });
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }

  login;
  static async login(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      // if (!email) throw { name: "EmailRequired" };

      // if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });

      // if (!user) throw { name: "InvalidCredentials" };

      const isValidPassword = comparePassword(password, user.password);
      // if (!isValidPassword) throw { name: "InvalidCredentials" };

      let payload = {
        id: user.id,
        email: user.email,
      };

      let access_token = signToken(payload);
      let userRole = user.role;

      res.status(200).json({
        access_token,
        email,
        userRole,
      });
    } catch (error) {
      console.log(error);
      // next(error);
    }
  }
}

module.exports = UserController;
