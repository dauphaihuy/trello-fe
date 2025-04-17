import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/UserSlice'
import { Avatar, Box, TextField, Tooltip, Typography } from '@mui/material'
import moment from 'moment/moment'

function CardActivitySection() {
    const currentUser = useSelector(selectCurrentUser)

    const handleAddCardComment = (event) => {
        // Bắt hành động được nhận phím Enter & không phải hành động Shift + Enter
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault() // Thêm dòng mới khi Enter không bị nhảy dòng
            if (event.target.value) { // Nếu không có giá trị thì return không làm gì cả
                const commentToAdd = {
                    userAvatar: currentUser?.avatar,
                    userDisplayName: currentUser?.displayName,
                    content: event.target.value.trim()
                }
                console.log(commentToAdd)
            }
        }
    }
    return (
        <Box sx={{ mt: 2 }}>
            {/* Thêm comment vào Card */}
            <Avatar
                sx={{ width: 36, height: 36, cursor: 'pointer' }}
                alt="trungquandev"
                src={currentUser?.avatar}
            />
            <TextField
                fullWidth
                placeholder="Write a comment..."
                type="text"
                variant="outlined"
                multiline
                onKeyDown={handleAddCardComment}
            />
            {/* Hiển thị danh sách các comments */}
            {[...Array(0)].length === 0 && (
                <Typography sx={{ pl: 4, fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>
                    No activity found!
                </Typography>
            )}
            {[...Array(3)].map((_, index) =>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', mb: 1.5 }} key={index}>
                    <Tooltip title="trungquandev" >
                        <Avatar
                            sx={{ width: 36, cursor: 'pointer' }}
                            alt="trungquandev"
                            src="https://picsum.photos/100"
                        />
                    </Tooltip>
                    <Box sx={{ width: 'inherit' }}>
                        <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                            Quan Do
                        </Typography>
                        <Typography variant="span" sx={{ fontSize: '12px' }}>
                            {moment().format('llll')}
                        </Typography>
                        <Box sx={{
                            display: 'block',
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
                            p: '8px 12px',
                            m: '4px',
                            border: '0.5px solid rgba(0, 0, 0, 0.2)',
                            borderRadius: '4px',
                            wordBreak: 'break-word',
                            boxShadow: '0 1px rgba(0, 0, 0, 0.2)'
                        }}>
                            This is a comment!
                        </Box>
                    </Box>
                </Box>
            )}
        </Box >
    )
}

export default CardActivitySection