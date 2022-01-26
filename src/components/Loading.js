import React, { useEffect, useState } from 'react'
import ClockLoader from 'react-spinners/ClockLoader'

export default function Loading() {
    const [dots, setDots] = useState('')

    useEffect(() => {
        setTimeout(() => setDots(dots+'.'), 1000)
    },[dots])

    return (
        <>
            <div className='loading-container'>
                <ClockLoader color='lightgray' size={60} />
                <h4 style={{ color: 'lightgray' }}>Cargando{dots}</h4>
            </div>
        </>
    )
}
