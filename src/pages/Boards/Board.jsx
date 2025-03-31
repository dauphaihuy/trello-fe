import { Container } from '@mui/material'
import React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{
            height: '100vh',
        }}>
            {/* appBar */}
            <AppBar />
            {/* boardBar */}
            <BoardBar />
            {/* board content */}
            <BoardContent />
        </Container>
    )
}

export default Board