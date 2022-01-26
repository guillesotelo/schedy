import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { saveSchedule } from '../store/reducers/schedule'
import "react-datepicker/dist/react-datepicker.css"
import Loading from './Loading'

export default function Schedule(props) {
    const { schedule } = props
    const dispatch = useDispatch()
    const { setToastNotif, setScheduleOpen, setCalendarOpen } = props
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)

    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }

    const handleSchedule = async () => {
        if(!userData.name || !userData.name.includes(' ')) setToastNotif({type: 'error', message: 'Ingresá tu nombre completo'})
        else if(schedule){
            setToastNotif(null)
            setLoading(true)
            const saved = await dispatch(saveSchedule({...userData, schedule}))
            if(!saved) setToastNotif({type: 'error', message: `Algo salió mal. Intentá de nuevo, por favor`})
                setToastNotif({type: 'info', message: `¡Cita confirmada! ${userData.email ? 'Se envió un mail con la info' : ''}`})
                setScheduleOpen(false)
        } else {
            setToastNotif({type: 'error', message: 'Datos de fecha/hora incorrectos'})
        }
        console.log("Agendado:", schedule)
        setLoading(false)
    }
    
    return (
        <div className='schedule-container'>
                {loading ? <Loading/> :
                    <div className='schedule'>
                        <div>
                            <h3>{schedule ? 'Confirmá tu agenda:' : ''}</h3>
                        </div>
                        <div className='date-scheduled'>
                            {schedule && schedule.toLocaleString('es-AR', options) + ' Hs'}
                        </div>
                        <input
                            className='login-input'
                            placeholder='Tu nombre completo'
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            type='name'
                        />
                        <input
                            className='login-input'
                            placeholder='Tu Email (opcional)'
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            type='email'
                        />
                        <div className='div-login-btns'>
                            <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                setScheduleOpen(false)
                                setCalendarOpen(true)
                                }}>Cancelar</button>
                            <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => handleSchedule()}>Confirmar</button>
                        </div>
                    </div>
                }
        </div>
    )
}