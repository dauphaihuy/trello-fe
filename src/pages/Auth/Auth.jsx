import { Box } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function Auth() {
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    const isRegister = location.pathname === '/register'
    console.log('location', location.pathname)
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