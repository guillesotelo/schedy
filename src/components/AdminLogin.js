import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInAdmin } from '../store/reducers/admin'
import Loading from './Loading'

export default function AdminLogin(props) {
    const { 
        setAdminOpen, 
        setIsAdmin, 
        setCalendarOpen,
        loading,
        setLoading,
        setToastNotif
    } = props
    const [data, setData] = useState({})
    const dispatch = useDispatch()

    const handleChange = (key, value) => {
        setData({...data, [key]: value })
    }

    const checkIfAdmin = async () => {
        try {
            setLoading(true)
            const isAdmin = await dispatch(logInAdmin(data))
            if(isAdmin) {
                setIsAdmin(true)
                setToastNotif({type: 'info', message: 'Qué bueno verte de nuevo!'})
                setTimeout(() => {
                    setToastNotif(null)
                }, 2500)
            }
            setLoading(false)
        } catch(err) { console.log(err)}
    }

    return (
        <div className='login-container'>
            {loading ? <Loading/> :
                <div className='login-box'>
                    <h4>Admin Login</h4>
                    <input
                        className='login-input'
                        placeholder='Ingrese usuario'
                        onChange={(e) => handleChange('username', e.target.value)}
                        type='name'
                    />
                    <input
                        className='login-input'
                        placeholder='Ingrese contraseña'
                        onChange={(e) => handleChange('password', e.target.value)}
                        type='password'
                    />
                    <div className='div-login-btns'>
                        <button className='enter-btn' onClick={() => {
                            setAdminOpen(false)
                            setCalendarOpen(true)
                            }}>Cancelar</button>
                        <button className='enter-btn' onClick={() => {
                            setAdminOpen(false)
                            checkIfAdmin()
                            }}>Entrar</button>
                    </div>
                </div>
            }
        </div>
    )
}
