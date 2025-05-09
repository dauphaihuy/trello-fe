import { Box, Button, Popover, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from '../../../utils/validator'
import { inviteUserToBoardAPI } from '../../../apis/index'
import { socketIoInstance } from '../../../socketClient'
function InviteBoardUser({ boardId }) {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
    const isOpenPopover = Boolean(anchorPopoverElement)
    const popoverId = isOpenPopover ? 'invite-board-user-popover' : undefined
    const handleTogglePopover = (event) => {
        if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
        else setAnchorPopoverElement(null)
    }
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const submitInviteUserToBoard = (data) => {
        const { inviteeEmail } = data
        inviteUserToBoardAPI({ inviteeEmail, boardId }).then(invitation => {
            // Clear the input using react-hook-form's setValue
            setValue('inviteeEmail', null)
            setAnchorPopoverElement(null)
            // Khi một người dùng vào board xong thì cũng sẽ gửi/nhận sự kiện socket lên server
            // (thời gian real-time) > FE_USER_INVITED_TO_BOARD
            socketIoInstance.emit('FE_USER_INVITED_TO_BOARD', invitation)
        })
    }
    return (
        <Box>
            <Tooltip title="Invite user to this board!">
                <Button
                    aria-describedby={popoverId}
                    onClick={handleTogglePopover}
                    variant="outlined"
                    startIcon={<PersonAddIcon />}
                    sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' } }}
                >
                    Invite
                </Button>
            </Tooltip>
            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                onClose={handleTogglePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <form onSubmit={handleSubmit(submitInviteUserToBoard)} style={{ width: '320px' }}>
                    <Box sx={{
                        p: '15px 20px 20px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                            Invite User To This Board
                        </Typography>
                        <Box>
                            <TextField
                                autoFocus
                                fullWidth
                                label="Enter email to invite..."
                                type="text"
                                variant="outlined"
                                {...register('inviteeEmail', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }
                                })}
                                error={!!errors['inviteeEmail']}
                            />
                            <FieldErrorAlert errors={errors} fieldName="inviteeEmail" />

                        </Box>
                        <Box sx={{ alignSelf: 'flex-end' }}>
                            <Button
                                className="interceptor-loading"
                                type="submit"
                                variant="contained"
                                color="info"
                            >
                                Invite
                            </Button>
                        </Box>
                    </Box>

                </form>
            </Popover>
        </Box>
    )
}

export default InviteBoardUser