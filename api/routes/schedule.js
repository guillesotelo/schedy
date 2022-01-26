const express = require('express')
const router = express.Router()
const transporter = require('../mailer')
const { Schedules } = require('../db/models')
const moment = require('moment')

router.get('/', async (req, res, next) => {
    try {
        const schedules = await Schedules.find()
        if(!schedules) return res.status(404).send('No schedules found.')
        res.status(200).json(schedules)
    } catch(err) { console.log(err) }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, email, schedule, isAdmin, from, to, ocupate, free} = req.body
        console.log("BODY",req.body)
        console.log("new Date(from)", new Date(from))//this log is a bugfixer

        if(isAdmin){
            if(from && to) {
                let _from = new Date(from)
                _from = new Date(_from.getTime())
                let _to = new Date(to)
                _to = new Date(_to.getTime())

                let schedArr = []

                while(_from < _to){
                    schedArr.push(new Date(_from))
                    _from.setMinutes(_from.getMinutes() + 30)
                }
                schedArr.push(new Date(_from))
                if(schedArr.length){
                    let response = []
                    for(let i=0 ; i<schedArr.length ; i++){
                        const modified = ocupate ? await Schedules.create({ name: 'admin', schedule: schedArr[i]})
                        : free ? await Schedules.find({ schedule: schedArr[i] }).remove().exec() : {}
                        response.push(modified)
                    }
                    res.status(200).json({response})
                }
            }
        } else {
            if(!name || !schedule) res.status(400).send('Invalid inputs')

            let scheduled = await Schedules.findOne({ schedule }).exec()
            if(scheduled) return res.status(409).send('Conflict: schedule already exists')

            // const date = 'DD/MM/YYYY'
            const newSchedule = await Schedules.create({ name, email, schedule })

            //Schedule mailing
            if(email){
                await transporter.sendMail({
                    from: `"Gerardo Losasso" <${process.env.EMAIL}>`,
                    to: email,
                    subject: 'Corte de pelo agendado!',
                    html: 
                        `<h3> Hola, ${name.split(' ')[0]}! <br/> 
                        Tu cita en la peluquería de Gerardo Losasso fué agendada exitosamente para el día:</h3>
                        <h2>${moment(schedule).locale("es").format('LLL')} Hs</h2> <br/>
                        <h3>Si necesitás cancelarla, hacé click <a href="schedyapp.herokuapp.com/api/schedule/cancel&id=${newSchedule.id}&isMailing=1">acá</a>.</h3><br/>
                        <img width="200" height="auto" src="https://i.ibb.co/dMY6Xcs/Captura-de-Pantalla-2021-12-19-a-la-s-15-41-10.png" alt="Gerardo Losasso"/>`
                }).catch(() => res.status(400).json({ message: 'Something went wrong!' }))
            }

            //Mails for Gerardo
            await transporter.sendMail({
                from: `"Gerardo Losasso" <${process.env.EMAIL}>`,
                to: process.env.ADMIN_EMAIL,
                subject: 'Nuevo corte de pelo agendado!',
                html: 
                    `<h3> Hola, Gerardo! <br/> 
                    Tenés una nueva cita con ${name}, para el día:</h3>
                    <h2>${moment(schedule).locale("es").format('LLL')} Hs</h2> <br/>
                    <img width="200" height="auto" src="https://i.ibb.co/dMY6Xcs/Captura-de-Pantalla-2021-12-19-a-la-s-15-41-10.png" alt="Gerardo Losasso"/>`
            }).catch(() => res.status(400).json({ message: 'Something went wrong!' }))

            res.status(200).json({newSchedule})
        }
    } catch(err) { console.log(err) }
})


//Cancel Schedule
router.post('/cancel', async (req, res, next) => {
    try {
        const { id, isMailing } = req.params

        const schedule = await Schedules.find({ id }).remove().exec()
        if(!schedule) return res.status(404).send('Schedule not found.')

        //Schedule mailing
        if(isMailing){
            transporter.sendMail({
                from: `"Gerardo Losasso" <${process.env.EMAIL}>`,
                to: schedule.email,
                subject: 'Corte de pelo cancelado!',
                html: 
                    `<h3> Hola! <br/> 
                    Tu cita en la peluquería de Gerardo Losasso fué cancelada exitosamente.</h3> <br/>
                    <img width="200" height="auto" src="https://i.ibb.co/dMY6Xcs/Captura-de-Pantalla-2021-12-19-a-la-s-15-41-10.png" alt="Gerardo Losasso"/>`
                }).catch(() => res.status(400).json({ message: 'Something went wrong!' }))
        }
    
        res.status(200).json({})

    } catch(err) { console.log(err) }
})

module.exports = router