const express = require('express')
const router = express.Router()

const adminRoutes = require('./admin')
const scheduleRoutes = require('./schedule')

router.use('/schedule', scheduleRoutes)
router.use('/admin', adminRoutes)

module.exports = router