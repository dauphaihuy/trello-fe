import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import { useForm } from 'react-hook-form'
import LogoutIcon from '@mui/icons-material/Logout'
import PasswordIcon from '@mui/icons-material/Password'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '../../utils/validator'
import FieldErrorAlert from '../../components/Form/FieldErrorAlert'
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logoutUserAPI, updateUserAPI } from '../../redux/user/UserSlice'
function SecurityTab() {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const confirmChangePassword = useConfirm()
    const submitChangePassword = async (data) => {
        const { confirmed } = await confirmChangePassword({
            title: < Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LogoutIcon sx={{ color: 'warning.dark' }} />
                Change Password
            </Box >,
            description: 'need to login after change password',
            confirmationText: 'Confirm',
            cancellationText: 'Cancel'
        })
        if (confirmed) {
            const { current_password, new_password } = data
            toast.promise(
                dispatch(updateUserAPI({ current_password, new_password })),
                { pending: 'updating' }
            ).then(res => {
                if (!res.error) {
                    toast.success('User updated successfully')
                    dispatch(logoutUserAPI(false))
                }
            })
        }

    }

    return (
        <Box sx={{
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3
        }}>
            <Box>
                <Typography variant='h5'>Security Dashboard</Typography>
            </Box>
            <form onSubmit={handleSubmit(submitChangePassword)}>
                <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            {...register('current_password', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: {
                                    value: PASSWORD_RULE,
                                    message: PASSWORD_RULE_MESSAGE
                                }
                            })}

                            error={!!errors['current_password']}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'current_password'} />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}

                            {...register('new_password', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: {
                                    value: PASSWORD_RULE,
                                    message: PASSWORD_RULE_MESSAGE
                                }
                            })}
                            error={!!errors['new_password']}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="New Password Confirm"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}

                            {...register('new_password_confirmation', {
                                required: FIELD_REQUIRED_MESSAGE,
                                pattern: {
                                    value: PASSWORD_RULE,
                                    message: PASSWORD_RULE_MESSAGE
                                }
                            })}
                            error={!!errors['new_password_confirmation']}
                        />
                    </Box>
                    <Box>
                        <Button
                            className="interceptor-loading"
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default SecurityTab