import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '../../apis/mock-data'
import {
    addNewCardAPI,
    addNewColumnAPI,
    fetchBoardDetailsAPI,
    updateBoardDetailsAPI,
    moveCardToDiffColumnAPI,
    updateColumnDetailsAPI,
    deleteColumnAPI
} from '../../apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard, mapOrder } from '../../utils/formatters'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'

function Board() {
    const [board, setBoard] = useState(null)
    useEffect(() => {
        const boarId = '67ef3aa62ffd2d6cd9c6fca8'
        fetchBoardDetailsAPI(boarId).then(board => {
            board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })
            setBoard(board)
        })
    }, [])
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await addNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        const newBoard = { ...board }
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)

        setBoard(newBoard)
    }
    const createNewCard = async (newCardData) => {
        const createdCard = await addNewCardAPI({
            ...newCardData,
            boardId: board._id
        })
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
        console.log("🚀 ~ createNewCard ~ columnToUpdate:", columnToUpdate)
        if (columnToUpdate) {
            if (columnToUpdate.cards.some(c => c.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            } else {
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)//vid69
            }
        }
        setBoard(newBoard)
    }
    //keo column
    const moveColumn = (dndOrderedColumns) => {
        const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedIds
        updateBoardDetailsAPI(board._id, { columnOrderIds: newBoard.columnOrderIds })
    }
    const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(c => c._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        setBoard(newBoard)
        updateColumnDetailsAPI(columnId, {
            cardOrderIds: dndOrderedCardIds
        })
    }
    const moveCardToDiffColumn = (currentCardId, prevColumnId, nextColumnIds, dndOrderedColumns) => {
        const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id

        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedIds
        setBoard(newBoard)
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        console.log(prevCardOrderIds)
        if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []
        //call api
        moveCardToDiffColumnAPI(
            {
                currentCardId,
                prevColumnId,
                prevCardOrderIds,
                nextColumnIds,
                nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnIds)?.cardOrderIds,
            }
        )
    }
    if (!board) {
        return <Box sx={{
            display: 'flex',
            width: '100vh',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <CircularProgress />
        </Box>
    }
    const deleteColumnDetail = (columnId) => {
        console.log(columnId)
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
        setBoard(newBoard)
        deleteColumnAPI(columnId).then(res => {
            toast.success(res?.deleteResult)
        })
    }
    return (
        <Container disableGutters maxWidth={false} sx={{
            height: '100vh',
        }}>
            {/* appBar */}
            <AppBar />
            {/* boardBar */}
            <BoardBar board={board} />
            {/* board content */}
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                moveColumn={moveColumn}
                moveCardInSameColumn={moveCardInSameColumn}
                moveCardToDiffColumn={moveCardToDiffColumn}
                deleteColumnDetail={deleteColumnDetail}
                createNewCard={createNewCard} />
        </Container>
    )
}

export default Board