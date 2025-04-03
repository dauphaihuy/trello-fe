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
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects


} from '@dnd-kit/core'
import {
    arrayMove,
} from '@dnd-kit/sortable'
import Column from './ListColumn/Column/Column'
import Cards from './ListColumn/Column/ListCard/Card/Cards'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}
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

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
    }
    //cùng 1 thời điểm chỉ kéo card hoặc column
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setorderedColumns(orderedColumns)
    }, [])
    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) return
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id
            setorderedColumns(dndOrderedColumns)
        }
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }
    const handleDragStart = (event) => {
        console.log(event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ?
            ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }
    return (
        <DndContext sensors={sensor} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Box sx={{
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                p: '10px 0'
            }}>
                {/* box cua cac column */}
                <DragOverlay dropAnimation={dropAnimation}>
                    {(!activeDragItemType) && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Cards card={activeDragItemData} />}
                </DragOverlay>
                <ListColumns columns={orderedColumns} />
            </Box>
        </DndContext>

    )
}

export default BoardContent