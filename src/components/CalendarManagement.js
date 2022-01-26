import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import DatePicker from 'react-datepicker'
import { saveSchedule } from '../store/reducers/schedule'
import Loading from './Loading'
import es from "date-fns/locale/es"

export default function CalendarManagement(props) {
    const [screen, setScreen] = useState({})
    const [newSched, setNewSched] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const {
        setManageOpen,
        setToastNotif
    }
    = props

    const handleManage = async () => {
        if(newSched && newSched.from && newSched.to && newSched.from > newSched.to) {
            setToastNotif({type: 'error', message: 'Chequeá el orden de las fechas'})
        }
        if(!newSched || !newSched.from || !newSched.to){
            setToastNotif({type: 'error', message: 'Completá las fechas requeridas'})
        } else {
            setLoading(true)
            if(screen.ocupate) setNewSched({...newSched, ocupate: true})
            else if(screen.free) setNewSched({...newSched, free: true})
            const saved = await dispatch(saveSchedule({...newSched, isAdmin: true}))
            if(!saved) setToastNotif({type: 'error', message: `Algo salió mal. Intentá de nuevo, por favor`})
            setLoading(false)
            setToastNotif({type: 'info', message: `¡Cambios confirmados!`})
        }
        
    }

    return (
        <div className='schedule-container'>
                {loading ? <Loading/> :
                    <div className='schedule-admin'>
                        <div>
                            <h3>{screen.ocupate ? 'Ocupar Agenda' : screen.free ? 'Liberar Agenda' : 'Modificar Calendario'}</h3>
                        </div>
                        { !screen.ocupate && !screen.free ?
                            <div className='div-login-btns'>
                                <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                    setScreen({ocupate: true})
                                    }}>Deshabilitar Horarios</button>
                                <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                    setScreen({free: true})
                                    }}>Liberar Horarios</button>
                            </div>
                            :
                            screen.ocupate ?
                                <>
                                    <h4>Desde</h4>
                                    <div className='date-picker'>
                                        <DatePicker
                                            selected={newSched.from || ''}
                                            onChange={(date) => {
                                                console.log("Fecha:", date)
                                                setNewSched({ ...newSched, from: date })
                                            }}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            locale={es}
                                            timeIntervals={30}
                                            timeCaption="Hora"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            />
                                    </div>
                                    <h4>Hasta</h4>
                                    <div className='date-picker'>
                                        <DatePicker
                                            selected={newSched.to || ''}
                                            onChange={(date) => {
                                                console.log("Fecha:", date)
                                                setNewSched({ ...newSched, to: date })
                                            }}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            locale={es}
                                            timeIntervals={30}
                                            timeCaption="Hora"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            />
                                    </div>
                                    <div className='div-login-btns'>
                                        <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                            setManageOpen(false)
                                            }}>Cancelar</button>
                                        <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                            handleManage()
                                            }}>Confirmar</button>
                                    </div>
                                </>
                            :
                                <>
                                    <h4>Desde</h4>
                                    <div className='date-picker'>
                                        <DatePicker
                                            selected={newSched.from || ''}
                                            onChange={(date) => {
                                                console.log("Fecha:", date)
                                                setNewSched({ ...newSched, from: date })
                                            }}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            locale={es}
                                            timeIntervals={30}
                                            timeCaption="Hora"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            />
                                    </div>
                                    <h4>Hasta</h4>
                                    <div className='date-picker'>
                                        <DatePicker
                                            selected={newSched.to || ''}
                                            onChange={(date) => {
                                                console.log("Fecha:", date)
                                                setNewSched({ ...newSched, to: date })
                                            }}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            locale={es}
                                            timeIntervals={30}
                                            timeCaption="Hora"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            />
                                    </div>
                                    <div className='div-login-btns'>
                                        <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                            setManageOpen(false)
                                            }}>Cancelar</button>
                                        <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                            handleManage()
                                            }}>Confirmar</button>
                                    </div>
                                </>
                        }
                    </div>
                }
        </div>
    )
}
