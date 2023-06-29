const router = require('express').Router()

router
  // .use('/', require('./organizer'))
  .use('/api', require('./user'))

module.exports = router