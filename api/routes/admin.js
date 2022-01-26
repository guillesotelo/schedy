const express = require('express')
const router = express.Router()
const { Admin } = require('../db/models')

//Admin Login
router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if(!username || !password) res.status(400).send('Invalid inputs')

        const admin = await Admin.findOne({ username }).exec()
        if(!admin) return res.status(401).send('Invalid credentials')

        const compareRes = await admin.comparePassword(password)
        if(!compareRes) return res.status(401).send('Invalid credentials')

        res.status(200).json({ username: admin.username, password: null  })

    } catch(err) { console.log(err) }
})

//Create Admin user (one use only)
router.get('/create', async (req, res, next) => {
    try {
        const { username, password } = req.query

        const admin = await Admin.create({ username, password })
        if(!admin) return res.status(400).send('Bad request')

        res.status(201).send(`Admin ${username} created successfully`)

    } catch(err) { console.log(err) }
})

//Logout
router.get("/logout", (req, res, next) => {
    req.user = null;
    res.status(200).json({});
  })

module.exports = router