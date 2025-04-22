import { Avatar, Badge, Box, Popover, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '../../redux/activeBoard/activeBoardSlice'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CARD_MEMBER_ACTIONS } from '../../utils/constants';
function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }) {
    const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
    const isOpenPopover = Boolean(anchorPopoverElement)
    const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined

    const handleTogglePopover = (event) => {
        if (!anchorPopoverElement) {
            setAnchorPopoverElement(event.currentTarget)
        } else {
            setAnchorPopoverElement(null)
        }
    }
    const handleUpdateCardMembers = (user) => {
        const incomingMemberInfo = {
            userId: user._id,
            action: cardMemberIds.includes(user._id) ? CARD_MEMBER_ACTIONS.REMOVE : CARD_MEMBER_ACTIONS.ADD
        }
        console.log(incomingMemberInfo)
        onUpdateCardMembers(incomingMemberInfo)
    }
    // đoạn này lấy activeBoard từ redux ra để mục đích lấy duoc toàn bộ thông tin qua FE_AllUser
    const board = useSelector(selectCurrentActiveBoard)
    console.log(board)
    const FE_CardMembers = board?.FE_allUsers.filter(user => cardMemberIds.includes(user._id))
    return (
        <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {FE_CardMembers.map((user, index) =>
                <Tooltip title={user?.displayName} key={index}>
                    <Avatar
                        style={{ width: 34, height: 34, cursor: 'pointer' }}
                        alt={user?.displayName}
                        src={user?.avatar}
                    />
                </Tooltip>
            )}
            <Tooltip title='Add new Member'>
                <Box
                    aria-describedby={popoverId}
                    onClick={handleTogglePopover}
                    sx={{
                        width: 36,
                        height: 36,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '50%',
                        color: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d'),
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f35342' : theme.palette.grey[200]),
                        '&:hover': {
                            color: (theme) => (theme.palette.mode === 'dark' ? '#000000' : '#0066e4'),
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'),
                        },
                    }}
                >
                    <AddIcon fontSize='sall' />
                </Box>
            </Tooltip>
            {/* khi click vào dấu + thì popover hiện tất cả user để thêm vào card */}
            <Popover
                id={popoverId}
                open={isOpenPopover}
                anchorEl={anchorPopoverElement}
                onClose={handleTogglePopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Box
                    sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}
                >
                    {
                        board?.FE_allUsers.map((user, index) =>
                            <Tooltip title={user?.displayName} key={index}>
                                <Badge
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    overlap="rectangular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        cardMemberIds.includes(user._id) ?
                                            <CheckCircleOutlineIcon fontSize="small" sx={{ color: '#72ae60' }} />
                                            : null
                                    }
                                    onClick={() => handleUpdateCardMembers(user)}
                                >
                                    <Avatar
                                        style={{ width: 34, height: 34, cursor: 'pointer' }}
                                        alt={user?.displayName}
                                        src={user?.avatar}
                                    />
                                </Badge>
                            </Tooltip>
                        )
                    }
                </Box>
            </Popover>
        </Box>
    )
}

export default CardUserGroup