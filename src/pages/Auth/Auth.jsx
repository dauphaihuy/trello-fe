import { Box } from '@mui/material'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/UserSlice'

function Auth() {
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const isRegister = location.pathname === '/register'
    // console.log('location', location.pathname)
    const currentUser = useSelector(selectCurrentUser)
    if (currentUser) {
        return <Navigate to={'/'} replace={true} />
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: '',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.2)'
        }}>
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </Box>
    )
}

export default Auth