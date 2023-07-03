const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { User, UserEvent, Event, JobDesk, ToDoList } = require("../models/");
const { signToken } = require("../helpers/jwt");
const jobdesk = require("../models/jobdesk");
const { where } = require("sequelize");

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
      const { email, password } = req.body;

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

      if (!event) throw { name: "NotFound" };
      const { status, JobDeskId, summary } = req.body;

      console.log(event.id);
      let newRegis = await UserEvent.create({
        status: "Pending",
        JobDeskId,
        summary,
        UserId: req.user.id,
        EventId: event.id,
      });
      res.status(201).json(newRegis);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //get all my job desk
  static async getMyList(req, res, next) {
    try {
      const lists = await UserEvent.findAll({
        include: [
          {
            model: User,
            where: { id: req.user.id },
          },
          {
            model: Event,
          },
          {
            model: JobDesk,
          },
        ],
      });
      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }

  //get all my todo
  static async getMyTodo(req, res, next) {
    try {
      const { id } = req.params;
      const list = await JobDesk.findByPk(id, {
        include: {
          model: ToDoList,
        },
      });
      if (!list) throw { name: "NotFound" };

      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
