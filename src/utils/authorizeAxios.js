import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { logoutUserAPI } from '../redux/user/UserSlice'
import { refreshTokenAPI } from '../apis'
// Không import { store } from '/redux/store' theo cách thông thường
let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

//https://redux.js.org/faq/code-structure/how-can-i-use-the-redux-store-in-nested-files
// Khoi tao 1 doi tuong axios (authorizedKdisinstance) muc dich de custom và cau hinh chung dự án.
let authorizeAxiosInstance = axios.create()
// Thời gian cho toi da của 1 request: 10 phút
authorizeAxiosInstance.defaults.timeout = 10 * 60 * 1000//mily giay
//withCredentials: cho phep axios tu gui cookie trong moi request len be(phục vụ việc chúng ta sẽ lưu jwt tokens
// (refresh và access ) vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true
//can thiệp vào giữa những interceptor api
// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(true)
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
// Khởi tạo một promise cho việc gọi api refresh_token
// Mục đích của Promise này là khi nào gọi refresh_token xong xuất thì mới retry lại nhiều api bị lỗi trước đó.

// https://thedutchlab.com/an/insights/using-axios-interceptors-for-refreshing-your-api-tokens/
let refreshTokenPromise = null

//can thiep vào giữa nhung response nhận về
// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(false)

    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // mã lỗi ngoài 200 sẽ rơi vào đây

    // Kỹ thuật chặn spam click (xem kỹ mô tả ở file formatters chứa function)
    interceptorLoadingElements(false)
    // Quan trọng: Xử lý Refresh Token tự động

    // Trường hợp 1: Nếu nhận mã 401 từ BE, thì gọi api refresh_token luôn
    if (error.response?.status === 401) {
        console.log('goi log out')
        axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    // // Trường hợp 2: Nếu nhận mã 403 từ BE, thì sẽ gọi api refresh token lần mới
    // // Nếu accessToken
    // // Đầu tiên lưu được các request API đang bị lỗi thông qua error.config
    const originalRequests = error.config
    // console.log('originalRequests', originalRequests)
    if (error.response?.status === 410 && !originalRequests._retry) {
        // Gán thêm một giá trị retry luôn = true trong khoảng thời gian cho
        // đảm bảo việc refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm (như vậy điều kiện if ngay bên trên)
        originalRequests._retry = true
        // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đồng thời gán vào cho cái refreshTokenPromise
        if (!refreshTokenPromise) {
            refreshTokenPromise = refreshTokenAPI()
                .then(data => {
                    return data?.accessToken
                })
                .catch((_error) => {
                    //Neu nhan bat ki loi nao tu api refresh token thi cu logout luon
                    axiosReduxStore.dispatch(logoutUserAPI(false))
                    return Promise.reject(_error)
                })
                .finally(() => {
                    refreshTokenPromise = null
                })
        }
        // có thể return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây;
        // eslint-disable-next-line no-unused-vars
        return refreshTokenPromise.then(accessToken => {
            /*
            Bước 1: Bởi vì Trường hợp nếu dự án cần lưu accessToken vào localstorage
            học đầu đó thì sẽ viết thêm code xử lý ở đây.
            Hiện tại (từ phía BE) sau khi api refreshToken được gọi thành công.
            */
            /*
            Bước 2: Bước Quan trọng: Return lại axios instance của chúng ta kết hợp các
            originalRequests để lại nhưng api ban đầu bị lỗi
            */
            return authorizeAxiosInstance(originalRequests)
        })
    }
    // Xử lý tập trung phần hiện thị thông báo lỗi trả về từ API ở đây (viết code một lần: Clean Code)
    // console.log error ra sẽ thấy cấu trúc data dân tới message lỗi như dưới đây
    let ErrorMessage = error?.message
    if (error?.response?.data?.message) {
        ErrorMessage = error?.response?.data?.message
    }
    // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
    if (!error.response?.status !== 410) {
        toast.error(ErrorMessage)
    }
    return Promise.reject(error)
})
export default authorizeAxiosInstance