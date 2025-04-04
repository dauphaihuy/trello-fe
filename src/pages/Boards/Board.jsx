import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '../../apis/mock-data'
import { addNewCardAPI, addNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '../../apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '../../utils/formatters'
function Board() {
    const [board, setBoard] = useState(null)
    useEffect(() => {
        const boarId = '67ef3aa62ffd2d6cd9c6fca8'
        fetchBoardDetailsAPI(boarId).then(board => {
            console.log(board.columns.cards)
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
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
        if (columnToUpdate) {
            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)//vid69
        }
        setBoard(newBoard)
    }
    //keo column
    const moveColumn = async (dndOrderedColumns) => {
        const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id

        const newBoard = { ...board }
        newBoard.columns = dndOrderedIds
        newBoard.columnOrderIds = dndOrderedIds
        updateBoardDetailsAPI(board._id, { columnOrderIds: newBoard.columnOrderIds })
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
                createNewCard={createNewCard} />
        </Container>
    )
}

export default Board