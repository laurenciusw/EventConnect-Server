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

      if (!event) throw { name: "NotFound" };
      const { status, JobDeskId, summary } = req.body;
      console.log(req.user.id);

      let newRegis = await UserEvent.create({
        status: "Pending",
        JobDeskId,
        summary,
        UserId: req.user.id,
        EventId: event.id,
      });
      res.status(201).json(newRegis);
    } catch (error) {
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

  //get profile detail
  static async getProfile(req, res, next) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  //change account detail
  static async updateAccount(req, res, next) {
    try {
      let newData = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password),
      };
      const user = await User.findOne({ where: { id: req.user.id } });
      const id = user.id;
      await User.update(newData, { where: { id } });
      res.status(200).json({ message: `succes updated` });
    } catch (error) {
      console.log(error);
    }
  }

  //change account profile
  static async updateProfile(req, res, next) {
    try {
      let newData = {
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        province: req.body.province,
        city: req.body.city,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
      };
      const user = await User.findOne({ where: { id: req.user.id } });
      const id = user.id;
      await User.update(newData, { where: { id } });
      res.status(200).json({ message: `succes updated` });
    } catch (error) {
      console.log(error);
    }
  }

  //verif
  static async verifyAccount(req, res, next) {
    try {
      const input = req.body.password;
      const user = await User.findOne({ where: { id: req.user.id } });

      const isValidPassword = comparePassword(input, user.password);
      if (!isValidPassword) throw { name: "EmailPasswordInvalid" };
      res.status(200).json({ message: `OK` });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
