import { Box } from '@mui/material'
import React from 'react'
import ListColumns from './ListColumn/ListColumns'

function BoardContent() {

    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.boardContentHeight,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            p: '10px 0'
        }}>
            {/* box cua cac column */}
            <ListColumns />
        </Box>
    )
}

export default BoardContent