import React from 'react'

export default function ExitModal(props) {
    const { setExitModal, setToastNotif } = props

    const handleExit = () => {
        setExitModal(false)
        localStorage.setItem('user', '')
        setToastNotif({type: 'info', message: '¡Hasta Pronto!'})
        setTimeout(() => {
            window.location.reload();
        }, 1500)
    }

    return (
        <div className='schedule-container'>
                    <div className='schedule'>
                        <div>
                            <h3>¿Cerrar Sesión?</h3>
                        </div>
                        <div className='div-login-btns'>
                            <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => {
                                setExitModal(false)
                                }}>Cancelar</button>
                            <button style={{ marginTop: 15 }} className='sched-btn' onClick={() => handleExit()}>Confirmar</button>
                        </div>
                    </div>
        </div>
    )
}
