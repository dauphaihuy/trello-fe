import { Avatar, Box, Button, InputAdornment, styled, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '../../redux/user/UserSlice'
import { useForm } from 'react-hook-form'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '../../utils/validator'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FieldErrorAlert from '../../components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import VisuallyHiddenInput from '../../components/Form/VisuallyHiddenInput'
// Đây là custom để cái input file ở đây: https://mui.com/material-ui/react-button/#file-upload
// Ngoài ra note rằng thư viện này từ docs của MUI, không recommend nếu cần dùng: https://github.com/vital-software/mui-file-input

function AccountTab() {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    // Thông tin của user để init vào form (key tương ứng với register phía dưới Field)
    const initialGeneralForm = {
        displayName: currentUser?.displayName
    }
    // Sử dụng defaultValues để set giá trị mặc định cho các field trong form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialGeneralForm
    })

    const SubmitChangeGeneralInformation = (data) => {
        const { displayName } = data
        // Nếu không có sự thay đổi gì về displayName thì không làm gì cả
        if (displayName === currentUser.displayName) return
        // Gọi API...

    }
    const uploadAvatar = (e) => {
        const error = singleFileValidator(e.target?.files[0])
        if (error) {
            toast.error(error)
            return
        }

        // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
        let reqData = new FormData()
        reqData.append('avatar', e.target?.files[0]) // Cách để lấy được dữ liệu từ FormData
        // for (const value of reqData.values()) {
        //     console.log('reqData value:', value)
        // }
        toast.promise(
            dispatch(updateUserAPI(reqData)),
            { pending: 'updating' }
        ).then(res => {
            if (!res.error) {
                toast.success('User updated successfully')
            }
            e.target.value = ''
        })
    }
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Box sx={{
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                marginBottom: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexDirection: 'column'
                }}>
                    <Avatar
                        sx={{ width: 84, height: 84, mb: 1 }}
                        src={currentUser?.avatar}
                    />
                    <Tooltip title="Upload a new image to update your avatar immediately.">
                        <Button
                            component='label'
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            size="small"
                        >
                            Upload
                            <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
                        </Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Typography variant='h6'>{currentUser?.displayName}</Typography>
                    <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
                </Box>
            </Box>
            <form onSubmit={handleSubmit(SubmitChangeGeneralInformation)}>
                <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <TextField
                            disabled
                            defaultValue={currentUser?.email}
                            fullWidth
                            label="Your Email"
                            type="text"
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            disabled
                            defaultValue={currentUser?.username}
                            fullWidth
                            label="Your Username"
                            type="text"
                            variant="filled"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBoxIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box>
                        <TextField
                            fullWidth
                            label="Your Display Name"
                            type="text"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AssignmentIndIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            {...register('displayName', { required: FIELD_REQUIRED_MESSAGE })}
                            error={!!errors['displayName']}
                        />
                        <FieldErrorAlert errors={errors} fieldName={'displayName'} />
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

export default AccountTab