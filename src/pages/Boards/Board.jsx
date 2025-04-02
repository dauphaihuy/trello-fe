import { Container } from '@mui/material'
import React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '../../apis/mock-data'
function Board() {

    return (
        <Container disableGutters maxWidth={false} sx={{
            height: '100vh',
        }}>
            {/* appBar */}
            <AppBar />
            {/* boardBar */}
            <BoardBar board={mockData?.board} />
            {/* board content */}
            <BoardContent board={mockData?.board} />
        </Container>
    )
}

export default Board