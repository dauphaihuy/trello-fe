import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

function Loading({ caption }) {
    return (
        <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
        }}>
            <CircularProgress />
            <Typography>{caption}</Typography>
        </Box>
    )
}

export default Loading