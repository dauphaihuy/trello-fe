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
import { cloneDeep } from 'lodash'

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
    const handleDragStart = (event) => {
        // console.log(event)
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ?
            ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }
    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }
    const handleDragOver = (event) => {
        console.log(event)
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        const { active, over } = event
        if (!active || !over) return
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over
        console.log(overCardId)
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        // console.log(activeColumn)
        // console.log(overColumn)
        if (activeColumn._id !== overCardId._id) {
            setorderedColumns(prevColumn => {
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
                // console.log(overCardIndex)
                let newCardIndex
                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height

                const modifier = isBelowOverItem ? 1 : 0
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
                // console.log('newCardIndex', newCardIndex)
                // console.log('isBelowOverItem', isBelowOverItem)
                // console.log('modifier', modifier)
                const nextColumns = cloneDeep(prevColumn)
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
                console.log('overColumn', overColumn)
                console.log('nextColumns', nextColumns)
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
                // console.log(nextActiveColumn)
                // console.log('next over column', nextOverColumn)
                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    //cap nhat lai cardorderids
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
                }
                if (nextOverColumn) {
                    //ktra card dang keo co ton tai o overcolumn chu neu co thi xoa truoc
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    //them card vao over column vi tri moi
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    //cap nhat lai cardorderids
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }
                return nextColumns
            })
        }
    }
    const handleDragEnd = (event) => {

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

        }
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
    return (
        <DndContext sensors={sensor} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
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