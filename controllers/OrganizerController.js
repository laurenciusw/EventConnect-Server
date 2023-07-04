const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Organizer, TodoList, UserEvent, User } = require("../models");

class OrganizerController {
  static async postTodoList(req, res, next) {
    try {
      const { name, EventId, JobDeskId } = req.body;

      const mapped = await name.map(el => {
        return {
          EventId,
          name: el,
          JobDeskId
        }
      })

      const newTodoList = await TodoList.bulkCreate(mapped)

      res.status(201).json(newTodoList);
    } catch (error) {
      next(error);
    }
  }

  static async loginOrganizer(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmailPasswordEmpty" };
      }

      const fetchOrganizer = await Organizer.findOne({
        where: {
          email,
        },
      });
      if (!fetchOrganizer) {
        throw { name: "EmailPasswordInvalid" };
      }

      const checkPassword = comparePassword(password, fetchOrganizer.password);
      if (!checkPassword) {
        throw { name: "EmailPasswordInvalid" };
      }

      const access_token = signToken({
        id: fetchOrganizer.id,
      });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getOrganizer(req, res, next) {
    try {
      const fetchOrganizer = await Organizer.findAll();

      res.status(200).json(fetchOrganizer);
    } catch (error) {
      next(error);
    }
  }

  static async postOrganizer(req, res, next) {
    try {
      const {
        organizerName,
        type,
        dateFound,
        personName,
        contactPerson,
        contactOrganizer,
        email,
        password,
      } = req.body;

      const fetchOrganizer = await Organizer.findOne({
        where: {
          email,
        },
      });
      if (fetchOrganizer) {
        throw { name: "EmailPasswordInvalid" };
      }

      const newOrganizer = await Organizer.create({
        organizerName,
        type,
        dateFound,
        personName,
        contactPerson,
        contactOrganizer,
        email,
        password,
      });

      res.status(201).json(newOrganizer);
    } catch (error) {
      next(error);
    }
  }

  static async putOrganizer(req, res, next) {
    try {
      const { id } = req.params;
      const {
        organizerName,
        type,
        dateFound,
        personName,
        contactPerson,
        contactOrganizer,
        email,
        password,
      } = req.body;

      const findOrganizer = await Organizer.findByPk(id);
      if (!findOrganizer) {
        throw { name: "NotFound" };
      }

      const updatedOrganizer = await Organizer.update(
        {
          organizerName,
          type,
          dateFound,
          personName,
          contactPerson,
          contactOrganizer,
          email,
          password,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json(updatedOrganizer);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrganizer(req, res, next) {
    try {
      const { id } = req.params;

      const findOrganizer = await Organizer.findByPk(id);
      if (!findOrganizer) {
        throw { name: "NotFound" };
      }

      const deletedOrganizer = await Organizer.destroy({
        where: {
          id,
        },
      });

      res.status(200).json(deletedOrganizer);
    } catch (error) {
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const { id } = req.params;

      const users = await UserEvent.findAll({
        where: {
          EventId: id,
        },
        include: [User],
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      let newStatus = {
        status: req.body.status,
      };
      let user = await UserEvent.findByPk(id);
      if (!user) throw { name: "NotFound" };

      await UserEvent.update(newStatus, { where: { id } });
      res.status(200).json({
        message: `Ok`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrganizerController;
