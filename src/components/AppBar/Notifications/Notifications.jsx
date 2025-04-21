import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvitationsAPI, selectCurrentNotifications, updateBoardInvitationAPI } from '../../../redux/notification/notificationsSlice'
import { Badge, Box, Button, Chip, Divider, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import moment from 'moment'
const BOARD_INVITATION_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
}
function Notifications() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClickNotificationIcon = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const nontifications = useSelector(selectCurrentNotifications)
    //fetch danh sách các lời mời notifications
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchInvitationsAPI())
    }, [dispatch])
    const updateBoardInvitation = (notificationId, status) => {
        dispatch(updateBoardInvitationAPI({ notificationId, status })).then((res) =>
            console.log(res)
        )
    }
    return (
        <Box>
            <Tooltip title="Notifications">
                <Badge
                    color="warning"
                    variant="dot"
                    sx={{ cursor: 'pointer' }}
                    id="basic-button-open-notification"
                    aria-controls={open ? 'basic-notification-drop-down' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickNotificationIcon}
                >
                    <NotificationsNoneIcon sx={{ color: 'yellow' }} />
                </Badge>
            </Tooltip>
            <Menu
                sx={{ mt: 2 }}
                id='basic-notification-drop-down'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-label': 'basic-button-open-notification' }}
            >
                {(!nontifications || nontifications.length === 0)
                    && <MenuItem sx={{ minWidth: 200 }}>no notification</MenuItem>
                }
                {nontifications?.map((notification, index) =>
                    <Box key={index}>
                        <MenuItem sx={{ minWidth: 200, maxWidth: 360, overflowY: 'auto' }}>
                            <Box sx={{
                                maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap',
                                display: 'flex', flexDirection: 'column', gap: 1
                            }}>
                                {/* //nội dung thông báo */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box><GroupAddIcon fontSize='small' /></Box>
                                    <Box><strong>{notification.inviter?.displayName} </strong>
                                        have invited you to join the board
                                        <strong>{notification.board?.title}</strong>
                                    </Box>
                                </Box>
                                {/*Khi status của thông báo này là pending sẽ hiện 2 button  */}
                                {notification?.boardInvitation.status === BOARD_INVITATION_STATUS.PENDING &&
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button
                                            className='interceptor-loading'
                                            type='submit'
                                            variant='contained'
                                            color='success'
                                            size='small'
                                            onClick={() => updateBoardInvitation(notification._id, BOARD_INVITATION_STATUS.ACCEPTED)}
                                        >Accept
                                        </Button>
                                        <Button
                                            className='interceptor-loading'
                                            type='submit'
                                            variant='contained'
                                            color='secondary'
                                            size='small'
                                            onClick={() => updateBoardInvitation(notification._id, BOARD_INVITATION_STATUS.REJECTED)}
                                        >Reject
                                        </Button>
                                    </Box>
                                }
                                {/* hiện thông báo đã được chấp nhận hay từ chối chưa */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                                    {notification?.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED &&
                                        <Chip icon={<DoneIcon />} label='Accepted' color='success' size='small'></Chip>
                                    }
                                    {notification?.boardInvitation.status === BOARD_INVITATION_STATUS.REJECTED &&
                                        <Chip icon={<NotInterestedIcon />} label='Rejected' size='small'></Chip>
                                    }
                                </Box>
                                {/* thời gian của thông báo */}
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant='span' sx={{ fontSize: '13px' }}>
                                        {moment(notification.createdAt).format('llll')}
                                    </Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                        {index !== (nontifications.length - 1) && <Divider />}
                    </Box>
                )
                }
            </Menu >
        </Box >
    )
}

export default Notifications