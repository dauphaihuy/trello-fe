import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../utils/constants'
import { generatePlaceholderCard, mapOrder } from '../../utils/formatters'
import { isEmpty } from 'lodash'
import authorizeAxiosInstance from '../../utils/authorizeAxios'

const initialState = {
    currrentActiveBoard: null
}
export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
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
        },
        updateCardInBoard: (state, action) => {
            //https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
            const inComingCard = action.payload
            //tìm từ board>column>card
            const column = state.currrentActiveBoard.columns.find(i => i._id === inComingCard.columnId)
            if (column) {
                const card = column.cards.find(i => i._id === inComingCard._id)
                if (card) {
                    // card.title = inComingCard.title
                    Object.keys(inComingCard).forEach(key => {
                        // * Giải thích đoạn dưới, các bạn mới lần đầu sẽ bị lú :D
                        // * Đơn giản là dùng Object.keys để lấy toàn bộ các properties (keys) của incomingCard và một Array rồi forEach nó ra.
                        // * Sau đó tùy vào trường hợp cần thì kiểm tra thêm còn không thì cập nhật ngược lại giá trị card luôn như bên dưới.
                        card[key] = inComingCard[key]
                    })
                }
            }
        }
    },
    //extra reducer
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            //
            let board = action.payload
            //thành viên trong board sẽ gộp 2 array owners và members
            board.FE_allUsers = board.owners.concat(board.members)
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
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions
//selector
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currrentActiveBoard
}
export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer