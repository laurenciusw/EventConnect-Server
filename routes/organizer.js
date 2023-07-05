const express = require("express");
const OrganizerController = require("../controllers/OrganizerController");
const errorHandler = require("../middlewares/errorHandler");
const EventController = require("../controllers/EventController");
const authenticationOrganizer = require("../middlewares/authOrganizer");
const routerOrganizer = express.Router();

routerOrganizer.get("/organizers", OrganizerController.getOrganizer);
routerOrganizer.get("/events", EventController.getEvent);
routerOrganizer.get("/events/:id", EventController.getEventById);
routerOrganizer.post("/organizers", OrganizerController.postOrganizer);
routerOrganizer.post("/loginorganizer", OrganizerController.loginOrganizer);
routerOrganizer.get("/userevent/:id", OrganizerController.getAllUser);
routerOrganizer.patch("/userevent/:id", OrganizerController.updateUserStatus);

// routerOrganizer.use(authenticationOrganizer)

routerOrganizer.post(
  "/todolists",
  authenticationOrganizer,
  OrganizerController.postTodoList
);
routerOrganizer.put(
  "/organizers/:id",
  authenticationOrganizer,
  OrganizerController.putOrganizer
);
routerOrganizer.delete(
  "/organizers/:id",
  authenticationOrganizer,
  OrganizerController.deleteOrganizer
);
routerOrganizer.get(
  "/eventsByOrganizer",
  authenticationOrganizer,
  EventController.getEventByOrganizerId
);
routerOrganizer.post(
  "/events",
  authenticationOrganizer,
  EventController.postEvent
);
routerOrganizer.put(
  "/events/:id",
  authenticationOrganizer,
  EventController.putEvent
);
routerOrganizer.delete(
  "/events/:id",
  authenticationOrganizer,
  EventController.deleteEvent
);

routerOrganizer.get(
  "/userevent/user/:id",
  OrganizerController.getUserDetail
);


routerOrganizer.use(errorHandler);

module.exports = routerOrganizer;
