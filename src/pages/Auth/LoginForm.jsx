import React from 'react'
import { Alert, Avatar, Box, Button, Card, CardActions, TextField, Typography, Zoom } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    EMAIL_MESSAGE,
    EMAIL_RULE,
    FIELD_REQUIRED_MESSAGE,
    PASSWORD_MESSAGE, PASSWORD_RULE
} from '../../utils/validator'
import FieldErrorAlert from '../../components/Form/FieldErrorAlert'
function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm()
    const submitLogin = (data) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(submitLogin)}>
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
                    <Box sx={{
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '0 1em'
                    }}>
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_MESSAGE
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
                                        message: PASSWORD_MESSAGE
                                    }

                                })}
                                error={!!errors['password']}
                                fullWidth label='Enter Password'
                                type='password'
                                variant='outlined' />
                            <FieldErrorAlert errors={errors} fieldName={'password'} />
                        </Box>
                        <CardActions
                            sx={{ padding: '0 1em 1em 1em', marginTop: '1em' }}
                        >
                            <Button type='submit'
                                variant='outlined'
                                color='primary.main'
                                size='large'
                                fullWidth>
                                Login
                            </Button>
                        </CardActions>
                        <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                            <Typography>I don't have an account</Typography>
                            <Link to={'/register'} style={{ textDecoration: 'none' }}>
                                <Typography sx={{
                                    color: 'primary.main',
                                    '&:hover': { color: '#ffbb39' }
                                }}>Register!</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Card>
            </Zoom>
        </form>
    )
}

export default LoginForm