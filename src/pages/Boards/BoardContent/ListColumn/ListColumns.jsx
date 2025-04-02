import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import AddchartIcon from '@mui/icons-material/Addchart'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
    return (
        <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
                {columns?.map((column, i) => <Column key={i} column={column} />)}

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
        </SortableContext>

    )
}

export default ListColumns