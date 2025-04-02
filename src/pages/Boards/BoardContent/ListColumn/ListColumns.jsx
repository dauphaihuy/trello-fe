import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart'
function ListColumns() {
    return (
        <Box sx={{
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar-track': {
                m: 2
            }

        }}>
            {/*box column */}
            <Column />
            <Column />
            <Box sx={{
                minWidth: '150px',
                maxWidth: 200,
                mx: 2,
                borderRadius: '6px',
                height: 'fit-content',
                bgcolor: '#ffffff3d'
            }}>
                <Button startIcon={<AddchartIcon />}
                    sx={{ color: 'white', justifyContent: 'flex-start', pl: 2.5 }}
                >Add new Column</Button>
            </Box>
        </Box>
    )
}

export default ListColumns