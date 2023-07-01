const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User, UserEvent, Event } = require("../models/");
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
        profilePicture,
      } = req.body;

      const user = await User.create({
        username,
        password,
        email,
        gender,
        birthDate,
        province,
        city,
        phoneNumber,
        profilePicture,
      });
      res.status(201).json({
        message: `user with email ${email} succesfully created`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // login;
  static async login(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      if (!email) throw { name: "EmailPasswordEmpty" };

      if (!password) throw { name: "EmailPasswordEmpty" };

      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: "EmailPasswordInvalid" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "EmailPasswordInvalid" };

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
      next(error);
    }
  }

  // regis event
  static async regisEvent(req, res, next) {
    try {
      const event = await Event.findByPk(req.params.id);
      // if ga ketemu
      const { status, jobDesk, summary } = req.body;
      console.log(req.user.id);

      let newRegis = await UserEvent.create({
        status,
        jobDesk,
        summary,
        EventId: event.id,
        UserId: req.user.id,
      });
      res.status(201).json(newRegis);
    } catch (error) {
      console.log(error);
    }
  }

  //get all my event
  static async getMyList(req, res, next) {
    try {
      const events = await UserEvent.findAll({
        where: { UserId: req.user.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Event,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      });
      res.status(201).json(events);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
