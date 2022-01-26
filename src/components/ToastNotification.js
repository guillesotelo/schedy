import React from 'react'

export default function ToastNotification(props) {
    const { toastNotif, setToastNotif } = props
    const { message } = toastNotif
    return (
        <div className='toast-container'>
            <div style={{ backgroundColor: toastNotif.type === 'error' ? 'rgb(255, 149, 149)' : 'rgb(180, 255, 177)' }} className='toast'>
                <h4>{message || ''}</h4>
                <button className='x-btn' onClick={() => setToastNotif(null)}> X</button>
            </div>
        </div>
    )
}