//user: schedy -- password: schedy3365
import React, { useState, useEffect } from 'react'
import Schedule from './Schedule'
import AdminLogin from './AdminLogin'
import ToastNotification from './ToastNotification'
import Calendar from './Calendar'
import ExitModal from './ExitModal'
import CalendarManagement from './CalendarManagement'

function Home() {
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(true)
    const [adminOpen, setAdminOpen] = useState(false)
    const [toastNotif, setToastNotif] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [schedule, setSchedule] = useState(new Date())
    const [weekNumber, setWeekNumber] = useState(0)
    const [exitModal, setExitModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [manageOpen, setManageOpen] = useState(false)

    useEffect(() => {
        let user = localStorage.getItem('user')
        if(user) user = JSON.parse(user)
        if(user && user.username) setIsAdmin(true)
    }, [])

    useEffect(() => {
    }, [weekNumber])


    return (
        <div className="App">
            <div className='div-title'>
                <h1 className='title-logo'>Gerardo Losasso</h1>
                <h3 className='subtitle'>Peluquería y Barbería</h3>
                <h4 className='sub-subtitle'>~ Desde 1999 ~</h4>
            </div>
            <div>
                {adminOpen ? 
                    <AdminLogin 
                    setAdminOpen={setAdminOpen} 
                    setIsAdmin={setIsAdmin} 
                    setCalendarOpen={setCalendarOpen}
                    loading={loading}
                    setLoading={setLoading}
                    setToastNotif={setToastNotif}
                    />
                    :
                    isAdmin ? 
                    <h4 className='admin-btn' onClick={() => setExitModal(true)}>Modo Admin</h4>
                    :
                        <button className='admin-btn' onClick={()=> {
                            setAdminOpen(true)
                            setScheduleOpen(false)
                        }}>Admin</button>
                }
            </div>

            {toastNotif && <ToastNotification toastNotif={toastNotif} setToastNotif={setToastNotif}/>}

            <div className="arrows">
                <button onClick={() => { 
                    setWeekNumber(weekNumber - 1) 
                    setScheduleOpen(false)
                    }} className="arrow-left">{`<< Anterior`}</button>

            {scheduleOpen ? 
                <Schedule 
                isAdmin={isAdmin}
                setToastNotif={setToastNotif} 
                setScheduleOpen={setScheduleOpen} 
                setCalendarOpen={setCalendarOpen}
                schedule={schedule} 
                setLoading={setLoading}
                />
                :
                exitModal ? 
                <ExitModal setExitModal={setExitModal} setToastNotif={setToastNotif}/>
                :
                manageOpen ? 
                <CalendarManagement setManageOpen={setManageOpen} setToastNotif={setToastNotif}/>
                :
                isAdmin ? 
                <div className='div-btns'>
                    <button className='sched-btn' onClick={() => {
                        setManageOpen(true)
                        }}>Modificar Calendario</button>
                </div>
                : ''
            }
                <button onClick={() => {
                    setWeekNumber(weekNumber + 1)
                    setScheduleOpen(false)
                }} className="arrow-right">{`Siguiente >>`}</button>
            </div>

            {calendarOpen && 
                <Calendar 
                schedule={schedule} 
                setSchedule={setSchedule}
                setScheduleOpen={setScheduleOpen}
                weekNumber={weekNumber}
                isAdmin={isAdmin}
                />
            }
            <div className='div-footer'>
                <a href='https://linkedin.com/in/guillermosotelo' target="_blank" className='footer'>Desarrollado por Guillermo Sotelo © 2022</a>
            </div>
        </div>
    );
}

export default Home;