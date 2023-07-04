
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {Organizer, TodoList} = require('../models')

class OrganizerController {
  static async postTodoList(req, res, next) {
    try {
      const {name, EventId, JobDeskId} = req.body

      const newTodoList = await TodoList.create({name, EventId, JobDeskId})

      res.status(201).json(newTodoList)
    } catch (error) {
      next(error)
    }
  }

  static async loginOrganizer(req, res, next) {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        throw {name: 'EmailPasswordEmpty'}
      }

      const fetchOrganizer = await Organizer.findOne({
        where: {
          email
        }
      })
      if (!fetchOrganizer) {
        throw {name: 'EmailPasswordInvalid'}
      }

      const checkPassword = comparePassword(password, fetchOrganizer.password)
      if (!checkPassword) {
        throw {name: 'EmailPasswordInvalid'}
      }

      const access_token = signToken({
        id: fetchOrganizer.id
      })

      res.status(200).json({access_token})
    } catch (error) {
      next(error)
    }
  }

  static async getOrganizer(req, res, next) {
    try {
      const fetchOrganizer = await Organizer.findAll()

      res.status(200).json(fetchOrganizer)
    } catch (error) {
      next(error)
    }
  }

  static async postOrganizer(req, res, next) {
    try {
      const {organizerName, type, dateFound, personName, contactPerson, contactOrganizer, email, password} = req.body

      const fetchOrganizer = await Organizer.findOne({
        where: {
          email
        }
      })
      if (fetchOrganizer) {
        throw {name: 'EmailPasswordInvalid'}
      }
      
      const newOrganizer = await Organizer.create({organizerName, type, dateFound, personName, contactPerson, contactOrganizer, email, password})
      
      res.status(201).json(newOrganizer)

    } catch (error) {
      next(error)
    }
  }

  static async putOrganizer(req, res, next) {
    try {
      const {id} = req.params
      const {organizerName, type, dateFound, personName, contactPerson, contactOrganizer, email, password} = req.body
      
      const findOrganizer = await Organizer.findByPk(id)
      if (!findOrganizer) {
        throw {name: 'NotFound'}
      }

      const updatedOrganizer = await Organizer.update({organizerName, type, dateFound, personName, contactPerson, contactOrganizer, email, password}, {
        where: {
          id
        }
      })
      
      res.status(200).json(updatedOrganizer)
      
    } catch (error) {
      next(error)
    }
  }

  static async deleteOrganizer(req, res, next) {
    try {
      const {id} = req.params

      const findOrganizer = await Organizer.findByPk(id)
      if (!findOrganizer) {
        throw {name: 'NotFound'}
      }

      const deletedOrganizer = await Organizer.destroy({
        where: {
          id
        }
      })
      
      res.status(200).json(deletedOrganizer)
    } catch (error) {
      console.log(error, '????????????????????');
      next(error)
    }
  }
}

module.exports = OrganizerController