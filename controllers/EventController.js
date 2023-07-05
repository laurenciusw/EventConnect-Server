
const { Event, Benefit, sequelize, JobDesk, Organizer } = require('../models')

class EventController {
  static async getEvent(req, res, next) {
    try {
      const fetchEvent = await Event.findAll({
        include: [{ model: Organizer }, { model: Benefit }],
      })

      res.status(200).json(fetchEvent)
    } catch (error) {
      next(error)
    }
  }
  static async getEventById(req, res, next) {
    try {
      const { id } = req.params
      const fetchEvent = await Event.findByPk(id, {
        include: [{ model: Organizer }, { model: Benefit }, { model: JobDesk }],
      })

      if (!fetchEvent) throw { name: 'NotFound' }

      res.status(200).json(fetchEvent)
    } catch (error) {
      next(error)
    }
  }

  static async getEventByOrganizerId(req, res, next) {
    try {
      const { OrganizerId } = req.user
      // const OrganizerId = req.headers.organizerid

      const fetchEvent = await Event.findAll({
        where: {
          OrganizerId
        },
        include: [{ model: Organizer }, { model: Benefit }, { model: JobDesk }],
      })

      res.status(200).json(fetchEvent)

    } catch (error) {
      next(error)
    }
  }

  static async postEvent(req, res, next) {
    try {

      const { name, location, startDate, imageUrl, description, endDate, registrationDate, category, status, benefit, jobdesk } = req.body
      // bentuk benefit = [{"name": "blablabla"}, {"name": "blablabla"}]
      // bentuk jobdesk = [{"name": "blablabla"}, {"name": "blablabla"}]
      console.log({ name, location, startDate, imageUrl, description, endDate, registrationDate, category, status, benefit, jobdesk });
      const { OrganizerId } = req.user
      // const OrganizerId = req.headers.organizerid

      const result = await sequelize.transaction(async (t) => {

        const newEvent = await Event.create({ name, location, startDate, imageUrl, description, endDate, registrationDate, category, status, OrganizerId }, { transaction: t });

        const insertedBenefit = await benefit.map(el => {
          return {
            EventId: newEvent.id,
            name: el
          }
        })


        await Benefit.bulkCreate(insertedBenefit, { transaction: t });

        const insertedJobdesk = await jobdesk.map(el => {
          return {
            EventId: newEvent.id,
            name: el
          }
        })

        await JobDesk.bulkCreate(insertedJobdesk, { transaction: t });

        return newEvent;

      });

      res.status(201).json(result)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async putEvent(req, res, next) {
    try {
      const { id } = req.params
      const { name, location, startDate, imageUrl, description, endDate, registrationDate, category, status, Benefits, JobDesks } = req.body

      const findEvent = await Event.findByPk(id)
      if (!findEvent) {
        throw { name: 'NotFound' }
      }

      // let arr = []
      // Benefits.forEach((e, i) => {
      //   let promise = Benefit.update({ name: Benefits[i].name }, { where: { id: e.id } })
      //   arr.push(promise)
      // });
      // Promise.all(arr)
      //   .then(result => {
      //     res.status(200).json({ message: 'Success update data' })
      //   })
      //   .catch(err => {
      //     throw err
      //   })
      const updatedEvent = await Event.update({ name, location, startDate, imageUrl, description, endDate, registrationDate, category, status }, {
        where: {
          id
        }
      })
      // console.log(updatedEvent);

      res.status(200).json(updatedEvent)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      const { id } = req.params

      const findEvent = await Event.findByPk(id)
      if (!findEvent) {
        throw { name: 'NotFound' }
      }

      const deletedEvent = await Event.destroy({
        where: {
          id
        }
      })

      res.status(200).json(deletedEvent)
    } catch (error) {
      console.log(error, '??????????????');
      next(error)
    }
  }
}

module.exports = EventController