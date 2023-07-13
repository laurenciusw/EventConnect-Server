const routerEvent = require('./event')
// const routerOrganizer = require('./organizer')

const router = require('express').Router()

router
  .use('/', require('./organizer'))
  .use('/api', require('./user'))

// router.use(routerOrganizer)
// router.use(routerEvent)

module.exports = router