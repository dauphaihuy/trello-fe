import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '../../apis/mock-data'
import { addNewCardAPI, addNewColumnAPI, fetchBoardDetailsAPI } from '../../apis'
function Board() {
    const [board, setBoard] = useState(null)
    useEffect(() => {
        const boarId = '67ef3aa62ffd2d6cd9c6fca8'
        fetchBoardDetailsAPI(boarId).then(data => {
            setBoard(data)
        })
    }, [])
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await addNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })
        console.log(createdColumn)
    }
    const createNewCard = async (newCardData) => {
        const createdCard = await addNewCardAPI({
            ...newCardData,
            boardId: board._id
        })
        console.log(createdCard)
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
            <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
        </Container>
    )
}

export default Board