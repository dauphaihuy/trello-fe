import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '../../utils/authorizeAxios'
import { API_ROOT } from '../../utils/constants'

const initialState = {
    currentNotifications: null
}
export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
        // Vue.js: axios sẽ trả về qua property của nó là data
        return response.data
    }
)
export const updateBoardInvitationAPI = createAsyncThunk(
    'notifications/updateBoardInvitationAPI',
    async ({ notificationId, status }) => {
        const response = await authorizeAxiosInstance.put(`${API_ROOT}/invitations/board/${notificationId}`, {
            status
        })
        return response.data
    }
)
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    // Reducers: Xử lý dữ liệu và cập nhật trạng thái
    reducers: {
        clearCurrentNotifications: (state) => {
            state.currentNotifications = null
        },
        updateCurrentNotifications: (state, action) => {
            state.currentNotifications = action.payload
        },
        addNotification: (state, action) => {
            const incomingInvitation = action.payload
            // unshift để thêm phần tử vào đầu mảng, ngược lại với push
            state.currentNotifications.unshift(incomingInvitation)
        }
    },
    // ExtraReducers: Xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            const incomingInvitations = action.payload
            // Đoạn này sẽ kiểm tra nếu incomingInvitations nhận được, đổ vào state hiện tại nếu nó là mảng
            state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        })

        builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
            const incomingInvitation = action.payload
            const getInvitation = state.currentNotifications.find(invitation => invitation._id === incomingInvitation._id)
            getInvitation.boardInvitation = incomingInvitation.boardInvitation
        })
    }
})
// Actions are generated for each case reducer function
const {
    clearCurrentNotifications,
    updateCurrentNotifications,
    addNotification
} = notificationsSlice.actions

// Selectors: Làm danh cho các components bên chung ta gọi bằng hook useSelector
export const selectCurrentNotifications = (state) => {
    return state.notifications.currentNotifications
}

// Cái file này là notificationsSlice nhưng chung ta sẽ export nó để thành reducer, nuôi
export const notificationsReducer = notificationsSlice.reducer