import { Box } from '@mui/material'
import React from 'react'

function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: 'primary.dark',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            height: (theme) => theme.trello.boardContentHeight,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        }}>
            vo quoc huy
        </Box>
    )
}

export default BoardContent