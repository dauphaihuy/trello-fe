import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentActiveCard: null
}
export const activeCardSlice = createSlice({
    name: 'activeCard',
    initialState,
    //xử lý dữ liệu đồng bộ
    reducers: {
        clearCurrentActiveCard: (state) => {
            state.currentActiveCard = null
        },
        updateCurrentActiveCard: (state, action) => {
            const fullCard = action.payload
            state.currentActiveCard = fullCard
        }
    },
    //extra reducer
    extraReducers: (builder) => {
    }
})
// Action creators are generated for each case reducer function
export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions
//selector
export const selectCurrentActiveCard = (state) => {
    return state.activeCard.currentActiveCard
}
export const activeCardReducer = activeCardSlice.reducer