const express = require('express')
const OrganizerController = require('../controllers/OrganizerController')
const errorHandler = require('../middlewares/errorHandler')
const routerOrganizer = express.Router()

routerOrganizer.get('/organizers', OrganizerController.getOrganizer)
routerOrganizer.post('/organizers', OrganizerController.postOrganizer)
routerOrganizer.put('/organizers/:id', OrganizerController.putOrganizer)
routerOrganizer.delete('/organizers/:id', OrganizerController.deleteOrganizer)

routerOrganizer.use(errorHandler)

module.exports = routerOrganizer