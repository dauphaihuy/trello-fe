import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {
    updateBoardDetailsAPI,
    moveCardToDiffColumnAPI,
    updateColumnDetailsAPI
} from '../../apis'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchBoardDetailsAPI,
    selectCurrentActiveBoard,
    updateCurrentActiveBoard
} from '../../redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import ActiveCard from '../../components/Modal/ActiveCard'
function Board() {

    const dispatch = useDispatch()
    const board = useSelector(selectCurrentActiveBoard)
    const { boardId } = useParams()
    useEffect(() => {
        dispatch(fetchBoardDetailsAPI(boardId))
    }, [dispatch, boardId])

    //keo column
    const moveColumn = (dndOrderedColumns) => {
        const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id
        const newBoard = cloneDeep(board)
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedIds
        updateBoardDetailsAPI(board._id, { columnOrderIds: newBoard.columnOrderIds })
    }
    const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(c => c._id === columnId)
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        dispatch(updateCurrentActiveBoard(newBoard))
        updateColumnDetailsAPI(columnId, {
            cardOrderIds: dndOrderedCardIds
        })
    }
    const moveCardToDiffColumn = (currentCardId, prevColumnId, nextColumnIds, dndOrderedColumns) => {
        const dndOrderedIds = dndOrderedColumns.map(c => c._id)//lay arr id

        const newBoard = cloneDeep(board)
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedIds
        dispatch(updateCurrentActiveBoard(newBoard))
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        if (prevCardOrderIds[0].includes('-placeholder-card')) prevCardOrderIds = []
        //call api
        moveCardToDiffColumnAPI(
            {
                currentCardId,
                prevColumnId,
                prevCardOrderIds,
                nextColumnIds,
                nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnIds)?.cardOrderIds
            }
        )
    }
    if (!board) {
        return <Loading caption={'Loading board...'} />
    }
    return (
        <Container disableGutters maxWidth={false} sx={{
            height: '100vh'
        }}>
            <ActiveCard />
            {/* <ActiveCard /> */}
            {/* appBar */}
            <AppBar />
            {/* boardBar */}
            <BoardBar board={board} />
            {/* board content */}
            <BoardContent
                board={board}
                moveCardInSameColumn={moveCardInSameColumn}
                moveCardToDiffColumn={moveCardToDiffColumn}
                moveColumn={moveColumn}
            />
        </Container>
    )
}

export default Board