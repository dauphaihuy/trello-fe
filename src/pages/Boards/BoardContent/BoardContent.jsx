import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ListColumns from './ListColumn/ListColumns'
import { mapOrder } from '../../../utils/formatters'
import {
    DndContext,
    PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors


} from '@dnd-kit/core'
import {
    arrayMove,
} from '@dnd-kit/sortable';
function BoardContent({ board }) {
    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: { distance: 10 }
    // })
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 }
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 150, tolerance: 5 }
    })
    const sensor = useSensors(mouseSensor, touchSensor)
    const [orderedColumns, setorderedColumns] = useState([])
    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setorderedColumns(orderedColumns)
    }, [])

    const handleDragEnd = (event) => {
        const { active, over } = event
        console.log(event)
        if (!over) return
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id
            setorderedColumns(dndOrderedColumns)
        }
    }
    return (
        <DndContext sensors={sensor} onDragEnd={handleDragEnd}>
            <Box sx={{
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                p: '10px 0'
            }}>
                {/* box cua cac column */}
                <ListColumns columns={orderedColumns} />
            </Box>
        </DndContext>

    )
}

export default BoardContent