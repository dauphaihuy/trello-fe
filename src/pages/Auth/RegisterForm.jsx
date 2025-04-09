import { Alert, Avatar, Box, Button, Card, CardActions, TextField, Typography, Zoom } from '@mui/material'
import React from 'react'
import LockIcon from '@mui/icons-material/Lock'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    EMAIL_RULE_MESSAGE,
    EMAIL_RULE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_RULE_MESSAGE,
    PASSWORD_RULE
} from '../../utils/validator'
import FieldErrorAlert from '../../components/Form/FieldErrorAlert'
import { registerUserAPI } from '../../apis'
import { toast } from 'react-toastify'
function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()
    const navigate = useNavigate()
    const submitRegister = (data) => {
        const { email, password } = data
        toast.promise(registerUserAPI({ email, password }),
            { pending: 'Registration is in progress...' })
            .then(user => {
                navigate(`/login?registeredEmail=${user.email}`)
            })

    }
    return (
        <form onSubmit={handleSubmit(submitRegister)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <Card sx={{ minWidth: 380, maxWidth: 380, marginTop: '6rem' }}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[50]
                        }}>
                        Login Form
                    </Box>
                    {/* <Alert severity='success' sx={{
                        'MuiAleart-message': { overflow: 'hidden' }
                    }}>
                        Your email has been verified
                    </Alert>
                    <Alert severity='success' sx={{
                        'MuiAleart-message': { overflow: 'hidden' }
                    }}>
                        An email has been sent to your email
                    </Alert> */}
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }

                                })}
                                error={!!errors['email']}
                                autoFocus
                                fullWidth label='Enter Email'
                                type='text'
                                variant='outlined' />
                            <FieldErrorAlert errors={errors} fieldName={'email'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE
                                    }

                                })}
                                error={!!errors['password']}
                                fullWidth label='Enter Password'
                                type='password'
                                variant='outlined' />
                            <FieldErrorAlert errors={errors} fieldName={'password'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                {...register('password_confirm', {
                                    validate: (value) => {
                                        if (value === watch('password')) return true
                                        return 'Password Confirm does not match'
                                    }

                                })}
                                error={!!errors['password_confirm']}
                                fullWidth label='Enter Password confirm'
                                type='password'
                                variant='outlined' />
                            <FieldErrorAlert errors={errors} fieldName={'password_confirm'} />
                        </Box>
                        <CardActions
                            sx={{ padding: '0 1em 1em 1em', marginTop: '1em' }}
                        >
                            <Button
                                className='interceptor-loading'
                                type='submit'
                                variant='outlined'
                                color='primary.main'
                                size='large'
                                fullWidth>
                                Register
                            </Button>
                        </CardActions>
                        <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                            <Typography>Already have an account</Typography>
                            <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                <Typography sx={{
                                    color: 'primary.main',
                                    '&:hover': { color: '#ffbb39' }
                                }}>Log in!</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Card>
            </Zoom>
        </form>
    )
}

export default RegisterForm