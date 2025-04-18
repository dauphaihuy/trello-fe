import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentActiveCard: null,
    isShowModalActiveCard: false
}
export const activeCardSlice = createSlice({
    name: 'activeCard',
    initialState,
    //xử lý dữ liệu đồng bộ
    reducers: {
        clearAndHideCurrentActiveCard: (state) => {
            state.currentActiveCard = null, state.isShowModalActiveCard = false
        },
        updateCurrentActiveCard: (state, action) => {
            const fullCard = action.payload
            state.currentActiveCard = fullCard
        },
        showModalActiveCard: (state) => {
            state.isShowModalActiveCard = true
        },
    },
    //extra reducer
    extraReducers: (builder) => {
    }
})
// Action creators are generated for each case reducer function
export const {
    updateCurrentActiveCard,
    clearAndHideCurrentActiveCard,
    showModalActiveCard } = activeCardSlice.actions
//selector
export const selectCurrentActiveCard = (state) => {
    return state.activeCard.currentActiveCard
}
export const selectshowModalActiveCard = (state) => {
    return state.activeCard.isShowModalActiveCard
}
export const activeCardReducer = activeCardSlice.reducer