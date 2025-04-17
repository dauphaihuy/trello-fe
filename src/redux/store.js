import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/UserSlice'
import { combineReducers } from 'redux' // lưu ý chúng ta có sẵn redux trong node_modules bởi vì khi cài @reduxjs/toolkit là đã có luôn
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default là localstorage
import { activeCardReducer } from './activeCard/activeCardSlice'
// Cấu hình persist
const rootPersistConfig = {
    key: 'root', // key của cái persist do chúng ta chỉ định, cứ để là root
    storage: storage, // Biến storage ở trên - lưu vào localstorage
    whitelist: ['user'], // định nghĩa các slice được phép duy trì qua mọi lần f5 trình duyệt
    // blacklist: ['user'] // định nghĩa các slice KHÔNG được phép duy trì qua mọi lần f5 trình duyệt
}
const reducers = combineReducers({
    activeBoard: activeBoardReducer,
    user: userReducer,
    activeCard: activeCardReducer
})

const persistedReducers = persistReducer(rootPersistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducers,
    // Fix warning error when implement redux-persist
    // https://stackoverflow.com/a/633244831/8324172
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})