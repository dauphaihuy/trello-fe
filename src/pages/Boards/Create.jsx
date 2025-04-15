import {
    Box,
    Button,
    FormControlLabel,
    InputAdornment,
    Modal,
    Radio,
    RadioGroup,
    styled,
    TextField,
    Typography
} from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import CancelIcon from '@mui/icons-material/Cancel'
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validator'
import FieldErrorAlert from '../../components/Form/FieldErrorAlert'
import AbcIcon from '@mui/icons-material/Abc';
const SidebarItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
    '&.active': {
        color: theme.palette.mode === 'dark' ? '#90c9f9' : '#0066e4',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.grey[300]
    }
}))

// BOARD_TYPES tương ứng với bên model phía Back-end (nếu cần dùng nhiều nơi thì hãy đưa ra file constants, không nên để ở đây)
const BOARD_TYPES = {
    PUBLIC: 'public',
    PRIVATE: 'private'
}
/*
 * Bạn chắc cú component SidebarCreateBoardModal này chúng ta sẽ trả về một cái Sidebar để hiện thị
 * danh Board List cho phù hợp giao diện bên đó, đồng thời không cũng cần thêm cái Modal để
 * Ý riêng form create board nhé.
 *
 * Note: Modal là một low-component mà hầu hết dùng bên trong những thứ như Dialog, Drawer, Menu,
 * Popover. Ở đây chỉ nên tạo cái Sidebar cũng dành riêng thành phần để gắn Modal ở để linh hoạt
 * giao diện từ con số 0 cho phù hợp với nhu cầu nhé.
 */
function Create() {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpenModal = () => setIsOpen(true)
    const handleCloseModal = () => {
        setIsOpen(false)
        // Reset lại toàn bộ form khi đóng Modal
        reset()
    }
    const submitCreateNewBoard = (data) => {
        const { title, description, type } = data

        console.log('Board title: ', title)
        console.log('Board description: ', description)
        console.log('Board type: ', type)
    }
    return (
        <>
            <SidebarItem onClick={handleOpenModal}>
                <LibraryAddIcon fontSize='small' />
                Create new Board
            </SidebarItem>
            <Modal open={isOpen}
                // onClose={handleCloseModal} // chỉ sử dụng onClose trong trường hợp muốn đóng Modal bằng ESC hoặc click ra ngoài Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"

            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: '8px',
                        border: 'none',
                        outline: 0,
                        padding: '20px 30px',
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
                    }}>
                    <form onSubmit={handleSubmit(submitCreateNewBoard)}>
                        <Box sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer'
                        }}>
                            <CancelIcon
                                color='error'
                                sx={{ '&:hover': { color: 'error.light' } }}
                                onClick={handleCloseModal}
                            />
                        </Box>
                        <Box id='modal-modal-title' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LibraryAddIcon />
                            <Typography variant='h6' component={'h2'}>Create a new board</Typography>
                        </Box>
                        <Box id='modal-modal-description' sx={{ my: 2 }}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    type="text"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AbcIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register('title', {
                                        required: FIELD_REQUIRED_MESSAGE,
                                        minLength: { value: 3, message: 'Min Length is 3 characters' },
                                        maxLength: { value: 50, message: 'Max Length is 50 characters' },
                                    })}
                                    error={!!errors['title']}
                                />
                                <FieldErrorAlert errors={errors} fieldName={'title'} />
                            </Box>

                            <Box>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    type="text"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AbcIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register('description', {
                                        required: FIELD_REQUIRED_MESSAGE,
                                        minLength: { value: 3, message: 'Min Length is 3 characters' },
                                        maxLength: { value: 50, message: 'Max Length is 50 characters' },
                                    })}
                                    error={!!errors['description']}
                                />
                                <FieldErrorAlert errors={errors} fieldName={'description'} />
                            </Box>

                            {/* Lưu ý với RadioGroup của MUI thì không thể dùng register trực tiếp với TextField được mà phải sử dụng <Controller /> và props "control" của react-hook-form như cách làm dưới đây
                        // https://stackoverflow.com/a/73336183/8324172
                        // https://mui.com/material-ui/react-radio-button/ */}
                            <Controller
                                name="type"
                                defaultValue={BOARD_TYPES.PUBLIC}
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field}
                                        row
                                        onChange={(event, value) => field.onChange(value)}
                                        value={field.value}
                                    >
                                        <FormControlLabel
                                            value={BOARD_TYPES.PUBLIC}
                                            control={<Radio size="small" />}
                                            label="Public"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value={BOARD_TYPES.PRIVATE}
                                            control={<Radio size="small" />}
                                            label="Private"
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>
                                )}
                            />
                            <Box sx={{ alignSelf: 'flex-end' }}>
                                <Button
                                    className="interceptor-loading"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default Create