const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const EventController = require('../controllers/EventController')
const routerEvent = express.Router()

routerEvent.get('/events', EventController.getEvent)
routerEvent.get('/events/:id', EventController.getEventById)
routerEvent.get('/eventsByOrganizer', EventController.getEventByOrganizerId)
routerEvent.post('/events', EventController.postEvent)
routerEvent.put('/events/:id', EventController.putEvent)
routerEvent.delete('/events/:id', EventController.deleteEvent)

module.exports = routerEvent