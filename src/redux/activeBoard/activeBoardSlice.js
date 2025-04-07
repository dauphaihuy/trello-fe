import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../utils/constants'
import axios from 'axios'
import { generatePlaceholderCard, mapOrder } from '../../utils/formatters'
import { isEmpty } from 'lodash'

const initialState = {
    currrentActiveBoard: null
}
export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
)
export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    //xử lý dữ liệu đồng bộ
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            const board = action.payload
            state.currrentActiveBoard = board
        }
    },
    //extra reducer
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            //
            let board = action.payload
            board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })
            state.currrentActiveBoard = board
        })
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = activeBoardSlice.actions
//selector
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currrentActiveBoard
}
export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer