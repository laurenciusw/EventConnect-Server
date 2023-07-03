
const {Organizer} = require('../models')

class OrganizerController {
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
      next(error)
    }
  }
}

module.exports = OrganizerController