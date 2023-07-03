const express = require('express')
const OrganizerController = require('../controllers/OrganizerController')
const errorHandler = require('../middlewares/errorHandler')
const EventController = require('../controllers/EventController')
const authenticationOrganizer = require('../middlewares/authOrganizer')
const routerOrganizer = express.Router()

routerOrganizer.get('/organizers', OrganizerController.getOrganizer)
routerOrganizer.get('/events', EventController.getEvent)
routerOrganizer.get('/events/:id', EventController.getEventById)
routerOrganizer.post('/organizers', OrganizerController.postOrganizer)
routerOrganizer.post('/loginorganizer', OrganizerController.loginOrganizer)

routerOrganizer.use(authenticationOrganizer)

routerOrganizer.put('/organizers/:id', OrganizerController.putOrganizer)
routerOrganizer.delete('/organizers/:id', OrganizerController.deleteOrganizer)
routerOrganizer.get('/eventsByOrganizer', EventController.getEventByOrganizerId)
routerOrganizer.post('/events', EventController.postEvent)
routerOrganizer.put('/events/:id', EventController.putEvent)
routerOrganizer.delete('/events/:id', EventController.deleteEvent)

routerOrganizer.use(errorHandler)

module.exports = routerOrganizer